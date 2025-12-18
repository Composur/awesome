const http = require('http')
const fs = require('fs')
const path = require('path')
const { IncomingForm } = require('formidable')
const { pipeline } = require('stream/promises')
const { URL } = require('url')

const PORT = 3000
const UPLOAD_ROOT = path.join(__dirname, 'uploads')

fs.mkdirSync(UPLOAD_ROOT, { recursive: true })

/** 合并锁（防止并发 complete） */
const mergingSessions = new Set()

function send(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const server = http.createServer(async (req, res) => {
  cors(res)

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }
  const parsedUrl = new URL(req.url, 'http://localhost')


  /* ================= 上传 chunk ================= */
  if (parsedUrl.pathname === '/upload/chunk' && req.method === 'POST') {
    const form = new IncomingForm({
      multiples: false,
      maxFileSize: 20 * 1024 * 1024,
    })

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err)
        return send(res, 500, { error: err.message })
      }

      const sessionId = fields.sessionId?.[0]
      const chunkIndex = fields.chunkIndex?.[0]
      const file = files.chunk?.[0]

      if (!sessionId || chunkIndex === undefined || !file) {
        return send(res, 400, { error: 'sessionId, chunkIndex, chunk required' })
      }

      const sessionDir = path.join(UPLOAD_ROOT, sessionId)
      fs.mkdirSync(sessionDir, { recursive: true })

      const filename = `chunk-${String(chunkIndex).padStart(6, '0')}`
      const targetPath = path.join(sessionDir, filename)

      // 幂等：已存在直接成功
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(file.filepath)
        return send(res, 200, { success: true, duplicated: true })
      }

      fs.renameSync(file.filepath, targetPath)

      send(res, 200, {
        success: true,
        sessionId,
        chunkIndex,
      })
    })
    return
  }

  /* ================= 完成并合并 ================= */
  if (parsedUrl.pathname === '/upload/complete' && req.method === 'POST') {
    let body = ''
    req.on('data', c => (body += c))
    req.on('end', async () => {
      try {
        const { sessionId } = JSON.parse(body)
        if (!sessionId) {
          return send(res, 400, { error: 'sessionId required' })
        }

        const sessionDir = path.join(UPLOAD_ROOT, sessionId)
        const outputFile = path.join(sessionDir, 'merged.webm')

        if (!fs.existsSync(sessionDir)) {
          return send(res, 404, { error: 'session not found' })
        }

        // 幂等：已合并
        if (fs.existsSync(outputFile)) {
          return send(res, 200, {
            success: true,
            alreadyMerged: true,
            file: 'merged.webm',
          })
        }

        // 并发锁
        if (mergingSessions.has(sessionId)) {
          return send(res, 409, { error: 'merging in progress' })
        }

        mergingSessions.add(sessionId)

        const chunkFiles = fs
          .readdirSync(sessionDir)
          .filter(f => f.startsWith('chunk-'))
          .sort()

        if (chunkFiles.length === 0) {
          mergingSessions.delete(sessionId)
          return send(res, 400, { error: 'no chunks found' })
        }

        const writeStream = fs.createWriteStream(outputFile)

        for (const file of chunkFiles) {
          const filePath = path.join(sessionDir, file)
          await pipeline(
            fs.createReadStream(filePath),
            writeStream,
            { end: false }
          )
        }

        writeStream.end()
        await new Promise(r => writeStream.on('finish', r))

        // 合并完成后清理 chunk
        for (const file of chunkFiles) {
          fs.unlinkSync(path.join(sessionDir, file))
        }

        mergingSessions.delete(sessionId)

        const { size } = fs.statSync(outputFile)

        send(res, 200, {
          success: true,
          sessionId,
          file: 'merged.webm',
          size,
          chunkCount: chunkFiles.length,
        })
      } catch (err) {
        console.error(err)
        send(res, 500, { error: err.message })
      }
    })
    return
  }

  res.writeHead(404)
  res.end('Not Found')
})

server.listen(PORT, () => {
  console.log(`✅ Upload server running at http://localhost:${PORT}`)
  console.log(`📁 Upload root: ${UPLOAD_ROOT}`)
})
