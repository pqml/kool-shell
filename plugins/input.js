'use strict'

const readline = require('readline')

function inputPlugin (sh) {
  const api = {
    input
  }

  return api

  function input (label, opts) {
    return new Promise((resolve, reject) => {
      label = label.toString() + ' '
      opts = opts || {}

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      function hideInput (char) {
        char = char + ''
        switch (char) {
          case '\n':
          case '\r':
          case '\u0004':
            process.stdin.pause()
            break
          default:
            process.stdout.write('\u001b[2K\u001b[200D' + label + Array(rl.line.length + 1).join('*'))
            break
        }
      }

      if (opts.hidden) {
        process.stdin.setRawMode(true)
        process.stdin.on('data', hideInput)
      }

      rl.question(label, (answer) => {
        if (opts.hidden) process.stdin.removeListener('data', hideInput)
        rl.close()
        if (typeof opts.onAnswer === 'function') {
          Promise.resolve()
            .then(() => opts.onAnswer(answer))
            .then(res => resolve(res))
            .catch(err => reject(err))
        } else {
          return resolve(answer)
        }
      })
    })
  }
}

module.exports = inputPlugin