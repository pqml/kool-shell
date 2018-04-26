const levels = ['debug', 'info', 'warn', 'error']

function logPlugin (sh) {
  const opts = {
    level: 'info',
    quiet: false,
    color: false,
    globalPrefix: '',
    debugPrefix: sh.colors.gray('Debug: '),
    infoPrefix: '',
    warnPrefix: sh.colors.yellow('⚠️  Warning: '),
    errorPrefix: sh.colors.red('💥  Error: '),
    successPrefix: sh.colors.green('✔︎  Success: ')
  }

  if (opts.level === 'success') opts.level = 'error'
  opts.level = levels.indexOf(opts.level) !== -1
    ? levels.indexOf(opts.level)
    : 1

  const api = {
    setLogOptions,
    debug,
    info,
    log: info,
    warn,
    error,
    success,
    step
  }

  return api

  function setLogOptions (newOpts = {}) {
    Object.assign(opts, newOpts)
  }

  function debug () {
    if (opts.level > 0) return api
    return write(opts.debugPrefix, [].slice.call(arguments), 'gray')
  }

  function info () {
    if (opts.level > 1) return api
    return write(opts.infoPrefix, [].slice.call(arguments))
  }

  function warn () {
    if (opts.level > 2) return api
    return write(opts.warnPrefix, [].slice.call(arguments), 'yellow')
  }

  function error () {
    if (opts.level > 3) return api
    return write(opts.errorPrefix, [].slice.call(arguments), 'red')
  }

  function success () {
    if (opts.level > 3) return api
    return write(opts.successPrefix, [].slice.call(arguments), 'green')
  }

  function step (current, total, message) {
    current = current | 0
    total = total | 0
    message = message.toString()
    console.log(sh.colors.gray('[' + current + '/' + total + '] ') + message)
  }

  function write (prefix, args, color) {
    if (opts.quiet) return api
    process.stdout.write(opts.globalPrefix)
    process.stdout.write(prefix)
    if (opts.color && color) process.stdout.write(sh.colors.openTag[color])
    console.log.apply(undefined, args)
    if (opts.color && color) process.stdout.write(sh.colors.closeTag[color])
    return api
  }
}

module.exports = logPlugin
