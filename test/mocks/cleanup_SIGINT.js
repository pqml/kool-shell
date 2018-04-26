const sh = require('../..')

sh.on('cleanup', () => {
  process.send({ t: { pass: 'cleanup is called on SIGINT signal' } })
})

setInterval(() => {}, 1000) // simple keep-alive
process.send({ ready: true })
