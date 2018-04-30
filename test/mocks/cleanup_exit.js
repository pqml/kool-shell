const sh = require('../..')
sh.caughtExits(false)

sh.on('cleanup', () => {
  process.send({ t: { pass: 'cleanup is called when process exits' } })
})
