export function createRecorderUploader(options) {
  const {
    chunkSize = 2 * 1024 * 1024,
    maxRetry = 3,
    maxQueueSize = 10,
    upload,
    backoff = defaultBackoff,
    hooks = {},
  } = options

  if (typeof upload !== 'function') {
    throw new Error('upload(blob) is required')
  }

  /** ---------- 内部状态 ---------- */
  let bufferBlobs = []
  let bufferSize = 0
  let uploadQueue = []
  let uploading = false

  let state = 'idle' // idle | uploading | stopped | error | aborted
  let fatalError = null

  const callHook = (name, payload) => {
    try {
      hooks[name]?.(payload)
    } catch (_) { }
  }

  const ensureUsable = () => {
    if (state === 'error') throw fatalError
    if (state === 'aborted') throw new Error('recorder aborted')
    if (state === 'stopped') throw new Error('recorder already stopped')
  }

  /** ---------- 数据入口 ---------- */
  function push(blob) {
    ensureUsable()
    if (!blob || blob.size === 0) return

    bufferBlobs.push(blob)
    bufferSize += blob.size

    if (bufferSize >= chunkSize) {
      flushBuffer()
    }
  }

  /** ---------- buffer → queue ---------- */
  function flushBuffer(force = false) {
    if (bufferSize === 0 && !force) return
    if (uploadQueue.length >= maxQueueSize) {
      fail(new Error('upload queue overflow'))
      return
    }

    const merged =
      bufferSize > 0
        ? new Blob(bufferBlobs, { type: bufferBlobs[0]?.type })
        : null

    bufferBlobs = []
    bufferSize = 0

    if (merged) {
      uploadQueue.push({
        blob: merged,
        retry: 0,
      })
      callHook('onChunk', merged)
    }

    processQueue()
  }

  /** ---------- 核心上传循环 ---------- */
  async function processQueue() {
    if (uploading || fatalError) return
    uploading = true
    state = 'uploading'

    try {
      while (uploadQueue.length > 0) {
        const task = uploadQueue[0]
        try {
          await upload(task.blob)
          uploadQueue.shift()
          callHook('onUploadSuccess', task.blob)
        } catch (err) {
          task.retry++
          callHook('onUploadRetry', {
            error: err,
            retry: task.retry,
          })

          if (task.retry > maxRetry) {
            throw err
          }
          await backoff(task.retry)
        }
      }

      if (state === 'uploading') {
        state = 'idle'
      }
    } catch (err) {
      fail(err)
      throw err
    } finally {
      uploading = false
    }
  }

  /** ---------- flush / abort ---------- */
  async function flush() {
    ensureUsable()
    state = 'stopped'
    flushBuffer(true)
    await processQueue()
  }

  function abort(reason = 'aborted by user') {
    if (state === 'aborted') return
    state = 'aborted'
    bufferBlobs = []
    bufferSize = 0
    uploadQueue = []
    fatalError = new Error(reason)
    callHook('onAbort', reason)
  }

  function fail(err) {
    if (fatalError) return
    fatalError = err
    state = 'error'
    callHook('onError', err)
  }

  /** ---------- 状态读取 ---------- */
  function getState() {
    return state
  }

  return {
    push,
    flush,
    abort,
    getState,
  }
}

/** ---------- 默认退避 ---------- */
function defaultBackoff(retry) {
  const delay = Math.min(2 ** retry * 1000, 30000)
  return new Promise((r) => setTimeout(r, delay))
}
