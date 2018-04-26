const sh = require('../..')

sh.on('cleanup', () => {
  process.send({ t: { pass: 'cleanup is called on Uncaught Exception' } })
})

setInterval(() => {}, 1000) // simple keep-alive
throw new Error('Uncaught')
