const http = require('http')
const fs = require('fs')
const path = require('path')
const { IncomingForm } = require('formidable')
const { pipeline } = require('stream/promises')

const PORT = 3000
const UPLOAD_ROOT = path.join(__dirname, 'uploads')

fs.mkdirSync(UPLOAD_ROOT, { recursive: true })

const mergingSessions = new Set()
const sessions = new Map()


// 全局上传锁 - 简单粗暴但有效
let uploadLock = Promise.resolve()

function send(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const server = http.createServer(async (req, res) => {
  cors(res)

  console.log(`\n${req.method} ${req.url}`)

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }

  const url = req.url || ''

  /* ================= 上传 chunk ================= */
  if (url === '/upload/chunk' && req.method === 'POST') {
    // ⭐ 关键: 立即获取锁,在解析前就阻塞
    const currentLock = uploadLock
    let releaseLock
    uploadLock = new Promise(resolve => {
      releaseLock = resolve
    })

    try {
      // 等待前一个上传完成
      await currentLock

      // 现在开始解析
      const form = new IncomingForm({
        multiples: false,
        maxFileSize: 20 * 1024 * 1024,
      })

      const result = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('❌ Parse error:', err)
            reject(err)
            return
          }

          const sessionId = fields.sessionId?.[0]
          const chunkIndex = fields.chunkIndex?.[0]
          const file = files.chunk?.[0]

          if (!sessionId || chunkIndex === undefined || !file) {
            reject(new Error('Missing fields'))
            return
          }

          const sessionDir = path.join(UPLOAD_ROOT, sessionId)
          fs.mkdirSync(sessionDir, { recursive: true })

          const filename = `chunk-${String(chunkIndex).padStart(6, '0')}`
          const targetPath = path.join(sessionDir, filename)

          if (fs.existsSync(targetPath)) {
            fs.unlinkSync(file.filepath)
            console.log(`✓ Chunk ${chunkIndex} (dup)`)
            resolve({ success: true, duplicated: true })
            return
          }

          fs.renameSync(file.filepath, targetPath)
          console.log(`✓ Chunk ${chunkIndex}: ${(file.size / 1024).toFixed(2)} KB`)

          sessions.set(sessionId, {
            lastChunkAt: Date.now(),
            status: 'recording',
          })

          resolve({
            success: true,
            sessionId,
            chunkIndex,
            size: file.size,
          })
        })
      })

      send(res, 200, result)
    } catch (err) {
      send(res, 500, { error: err.message })
    } finally {
      // 释放锁
      releaseLock()
    }

    return
  }

  /* ================= 完成并合并 ================= */
  if (url === '/upload/complete' && req.method === 'POST') {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      try {
        // mergeSession(JSON.parse(body).sessionId)
        const { sessionId } = JSON.parse(body)
        console.log(`\n📦 Complete: ${sessionId}`)

        if (!sessionId) {
          return send(res, 400, { error: 'sessionId required' })
        }

        // ⭐ 等待所有 chunk 上传完成
        console.log(`⏳ 等待上传队列...`)
        await uploadLock
        console.log(`✓ 上传队列已清空`)

        if (mergingSessions.has(sessionId)) {
          return send(res, 409, { error: 'merge in progress' })
        }

        const sessionDir = path.join(UPLOAD_ROOT, sessionId)

        if (!fs.existsSync(sessionDir)) {
          console.log(`❌ 目录不存在`)
          return send(res, 404, { error: 'session not found' })
        }

        const outputFile = path.join(sessionDir, 'merged.webm')

        if (fs.existsSync(outputFile)) {
          const stats = fs.statSync(outputFile)
          return send(res, 200, {
            success: true,
            alreadyMerged: true,
            file: 'merged.webm',
            size: stats.size,
          })
        }

        mergingSessions.add(sessionId)

        try {
          const files = fs.readdirSync(sessionDir)
            .filter(f => f.startsWith('chunk-'))
            .sort()

          console.log(`🔄 合并 ${files.length} 个切片`)

          if (files.length === 0) {
            throw new Error('No chunks')
          }

          const writeStream = fs.createWriteStream(outputFile)

          for (const file of files) {
            const chunkPath = path.join(sessionDir, file)
            const readStream = fs.createReadStream(chunkPath)
            await pipeline(readStream, writeStream, { end: false })
          }

          writeStream.end()

          await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve)
            writeStream.on('error', reject)
          })

          const stats = fs.statSync(outputFile)
          console.log(`✅ ${(stats.size / 1024 / 1024).toFixed(2)} MB\n`)

          send(res, 200, {
            success: true,
            file: 'merged.webm',
            chunkCount: files.length,
            size: stats.size,
          })
        } finally {
          mergingSessions.delete(sessionId)
        }
      } catch (err) {
        console.error('❌', err.message)
        send(res, 500, { error: err.message })
      }
    })
    return
  }

  /* ================= 下载 ================= */
  if (url.startsWith('/download/') && req.method === 'GET') {
    const sessionId = url.split('/').pop()
    const filePath = path.join(UPLOAD_ROOT, sessionId, 'merged.webm')

    if (!fs.existsSync(filePath)) {
      res.writeHead(404)
      return res.end('File not found')
    }

    const stats = fs.statSync(filePath)
    res.writeHead(200, {
      'Content-Type': 'audio/webm',
      'Content-Length': stats.size,
      'Content-Disposition': `attachment; filename="recording-${sessionId}.webm"`,
    })

    const readStream = fs.createReadStream(filePath)
    readStream.pipe(res)
    return
  }
  /* ================= 活动的录制会话列表 ================= */
  if (url === '/recording/active' && req.method === 'GET') {
    const result = []

    for (const [sessionId, meta] of sessions.entries()) {
      result.push({
        sessionId,
        status: meta.status,
        lastActive: meta.lastChunkAt,
      })
    }

    return send(res, 200, result)
  }


  res.writeHead(404)
  res.end('Not Found')
})
async function mergeSession(sessionId) {
  if (mergingSessions.has(sessionId)) return
  mergingSessions.add(sessionId)

  try {
    const sessionDir = path.join(UPLOAD_ROOT, sessionId)
    const outputFile = path.join(sessionDir, 'merged.webm')

    if (!fs.existsSync(sessionDir)) return
    if (fs.existsSync(outputFile)) return

    const files = fs.readdirSync(sessionDir)
      .filter(f => f.startsWith('chunk-'))
      .sort()

    if (files.length === 0) return

    const writeStream = fs.createWriteStream(outputFile)

    for (const file of files) {
      const readStream = fs.createReadStream(path.join(sessionDir, file))
      await pipeline(readStream, writeStream, { end: false })
    }

    writeStream.end()
    await new Promise(r => writeStream.on('finish', r))

    const meta = sessions.get(sessionId)
    if (meta) meta.status = 'merged'

    console.log(`🧩 Auto merged: ${sessionId}`)
  } finally {
    mergingSessions.delete(sessionId)
  }
}

const INACTIVE_TIMEOUT = 30 * 1000 // 30 秒
const SCAN_INTERVAL = 5 * 1000

setInterval(async () => {
  const now = Date.now()

  for (const [sessionId, meta] of sessions.entries()) {
    if (
      meta.status === 'recording' &&
      now - meta.lastChunkAt > INACTIVE_TIMEOUT
    ) {
      console.log(`⏱ Session inactive, auto merging: ${sessionId}`)
      await uploadLock      // 等待所有上传完成
      await mergeSession(sessionId)
    }
  }
}, SCAN_INTERVAL)


server.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`)
  console.log(`✅ Server: http://localhost:${PORT}`)
  console.log(`📁 Uploads: ${UPLOAD_ROOT}`)
  console.log(`${'='.repeat(50)}\n`)
})

process.on('SIGINT', () => {
  console.log('\n👋 Bye')
  server.close(() => process.exit(0))
})