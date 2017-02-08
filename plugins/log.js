'use strict'

const colors = require('../utils/colors')
const levels = ['debug', 'info', 'warn', 'error']

function logPlugin (sh, opts) {
  opts = Object.assign({}, {
    level: 'info',
    quiet: false,
    color: true,
    debugPrefix: colors.gray('Debug: '),
    infoPrefix: '',
    warnPrefix: colors.yellow('⚠️  Warning: '),
    errorPrefix: colors.red('💥  Error: '),
    successPrefix: colors.green('✔︎  Success: ')
  }, opts || {})

  if (opts.level === 'success') opts.level = 'error'
  opts.level = levels.indexOf(opts.level) !== -1
    ? levels.indexOf(opts.level)
    : 1

  const api = {
    colors,
    debug,
    info,
    log: info,
    warn,
    error,
    success
  }

  return api

  function debug () {
    if (opts.level > 0) return api
    return write(opts.debugPrefix, arguments, 'gray')
  }

  function info () {
    if (opts.level > 1) return api
    return write(opts.infoPrefix, arguments)
  }

  function warn () {
    if (opts.level > 2) return api
    return write(opts.warnPrefix, arguments, 'yellow')
  }

  function error () {
    if (opts.level > 3) return api
    return write(opts.errorPrefix, arguments, 'red')
  }

  function success () {
    if (opts.level > 3) return api
    return write(opts.successPrefix, arguments, 'green')
  }

  function write (prefix, args, color) {
    if (opts.quiet) return api
    process.stdout.write(prefix)
    if (opts.color && color) process.stdout.write(colors.openTag[color])
    console.log.apply(undefined, [].slice.call(args))
    if (opts.color && color) process.stdout.write(colors.closeTag[color])
    return api
  }
}

module.exports = logPlugin
