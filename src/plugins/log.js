'use strict'

const colors = require('../utils/colors')
const levels = ['debug', 'info', 'warn', 'error']

function logPlugin (sh, opts) {
  opts = Object.assign({}, {
    level: 'info',
    color: true,
    debugPrefix: colors.gray('Debug: '),
    infoPrefix: '',
    warnPrefix: colors.yellow('⚠️  Warning: '),
    errorPrefix: colors.red('💥  Error: '),
    successPrefix: colors.green('✔︎  Success: ')
  }, opts || {})

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
    if (opts.level < 1) {
      return write(opts.debugPrefix, arguments, 'gray')
    }
  }

  function info () {
    if (opts.level < 2) {
      return write(opts.infoPrefix, arguments)
    }
  }

  function warn () {
    if (opts.level < 3) {
      return write(opts.warnPrefix, arguments, 'yellow')
    }
  }

  function error () {
    if (opts.level < 4) {
      return write(opts.errorPrefix, arguments, 'red')
    }
  }

  function success () {
    if (opts.level < 4) {
      return write(opts.successPrefix, arguments, 'green')
    }
  }

  function write (prefix, args, color) {
    process.stdout.write(prefix)
    if (opts.color && color) process.stdout.write(colors.openTag[color])
    console.log.apply(undefined, [].slice.call(args))
    if (opts.color && color) process.stdout.write(colors.closeTag[color])
    return api
  }
}

module.exports = logPlugin
