const cp = require('child_process')

function forkTimeout (t, filepath, opts) {
  opts = opts || {}
  const timeout = opts.timeout || 500
  const message = opts.message || 'process has timeout'
  const child = cp.fork(filepath)

  const timer = setTimeout(() => {
    if (opts.onTimeout) opts.onTimeout()
    t.fail(message)
    child.kill()
  }, timeout)

  child.clearTimeout = function () {
    clearTimeout(timer)
  }

  return child
}

module.exports = forkTimeout
