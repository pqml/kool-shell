'use strict'

const os = require('os')
const path = require('path')
const test = require('tape')

const fork = require('./utils/forkTimeout')
const json2t = require('./utils/json2t')
const isWin = (os.platform() === 'win32')

test(
  'cleanup plugin should be called when process exits',
  t => {
    t.plan(isWin ? 2 : 3)

    const child1 = fork(t, path.join(__dirname, 'mocks/cleanup_exception.js'))
    child1.on('message', (m) => {
      if (m.t) json2t(t, m.t)
      if (m.t.pass) {
        child1.clearTimeout()
        child1.kill()
      }
    })

    const child3 = fork(t, path.join(__dirname, 'mocks/cleanup_exit.js'))
    child3.on('message', (m) => {
      if (m.t) {
        json2t(t, m.t)
        if (m.t.pass) {
          child3.clearTimeout()
          child3.kill()
        }
      }
    })

    if (!isWin) {
      const child2 = fork(t, path.join(__dirname, 'mocks/cleanup_SIGINT.js'))
      child2.on('message', (m) => {
        if (m.ready) child2.kill('SIGINT')
        if (m.t) {
          json2t(t, m.t)
          if (m.t.pass) {
            child2.clearTimeout()
            child2.kill()
          }
        }
      })
    }
  }
)
