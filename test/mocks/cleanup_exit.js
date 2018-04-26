const sh = require('../..')

sh.on('cleanup', () => {
  process.send({ t: { pass: 'cleanup is called when process exits' } })
})
