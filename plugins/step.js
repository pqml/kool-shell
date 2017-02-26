'use strict'

const colors = require('../utils/colors')

function stepPlugin (sh) {
  const api = {
    step: step
  }

  return api

  function step (current, total, message) {
    current = current | 0
    total = total | 0
    message = message.toString()
    process.stdout.write(colors.gray('[' + current + '/' + total + '] '))
    process.stdout.write(message + '\n')
  }
}

module.exports = stepPlugin
