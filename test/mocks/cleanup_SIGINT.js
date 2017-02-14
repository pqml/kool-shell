'use strict'

const koolshell = require('../..')
const cleanup = require('../../plugins/cleanup')

const sh = koolshell()
sh.use(cleanup)

sh.on('cleanup', () => {
  process.send({ t: { pass: 'cleanup is called on SIGINT signal' } })
})

setInterval(() => {}, 1000) // simple keep-alive
process.send({ ready: true })
