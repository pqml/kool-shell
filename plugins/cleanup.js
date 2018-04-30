let error = null
let handled = false
let log = true

function caughtExits (nlog = true) {
  if (handled) return
  process.on('SIGINT', res => exitHandler({ res, exit: 0 }))
  process.on('uncaughtException', res => exitHandler({ res, exit: 1 }))
  handled = true
  log = nlog
}

function exitHandler ({ res, exit }) {
  if (exit === 1) {
    error = res
    if (log) console.log(error)
  }
  if (exit !== undefined) process.exit(exit)
}

function cleanupPlugin (sh) {
  const api = { caughtExits }

  if (typeof sh.emit === 'function') {
    process.on('exit', code => { sh.emit('cleanup', { code, error }) })
  }

  return api
}

module.exports = cleanupPlugin
