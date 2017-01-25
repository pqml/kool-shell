'use strict'

const spawn = require('child_process').spawn

function execPlugin (sh) {
  const api = {
    exec
  }

  return api

  function exec (cmd, args, opts) {
    return new Promise((resolve, reject) => {
      args = args || []
      opts = opts || {}

      let out = {}

      const child = spawn(cmd, args, Object.assign(
        {
          stdio: [
            !opts.silent ? process.stdin : 'ignore',
            opts.inherit ? 1 : 'pipe',
            opts.inherit ? 2 : 'pipe'
          ]
        },
        opts
      ))

      if (!opts.inherit) {
        out.stdout = ''
        out.stderr = ''

        child.stdout.on('data', (data) => {
          out.stdout += data.toString()
        })
        child.stderr.on('data', (data) => {
          out.stderr += data.toString()
        })

        if (!opts.silent) {
          child.stderr.pipe(process.stderr)
          child.stdout.pipe(process.stdout)
          createEvents()
        }
      }

      child.on('error', (code, signal) => {
        reject(Object.assign({ code, signal }, out))
      })

      child.on('close', (code, signal) => {
        if (!opts.silent && !opts.inherit) {
          removeEvents()
        }
        if (
        signal === 'SIGINT' ||
        signal === 'SIGTERM' ||
        signal === 'SIGHUP' ||
        code !== 0
        ) {
          return reject(Object.assign({ code, signal }, out))
        }
        return resolve(Object.assign({ code, signal }, out))
      })

      function createEvents () {
        process.once('uncaughtException', killChild)
        process.once('SIGINT', killChild)
      }

      function removeEvents () {
        process.removeListener('uncaughtException', killChild)
        process.removeListener('SIGINT', killChild)
      }

      function killChild () { child.kill('SIGINT') }
    })
  }
}

module.exports = execPlugin
