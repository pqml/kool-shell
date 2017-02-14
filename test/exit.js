'use strict'

const path = require('path')
const test = require('tape')
const fork = require('./utils/forkTimeout')

test(
  'exit plugin should exit the process with a specific code when called',
  t => {
    t.plan(1)
    const child = fork(t, path.join(__dirname, 'mocks/exit_code93.js'))

    child.on('close', (code) => {
      t.equal(code, 93, 'the code is 93')
      child.clearTimeout()
      child.kill()
    })
  }
)
