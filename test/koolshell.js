'use strict'

const test = require('tape')
const koolshell = require('../src/koolshell')
const exit = require('../src/plugins/exit')

test('koolshell', t => {
  t.test('should break when calling use() with a bad 1st argument', t => {
    t.plan(2)
    const sh = koolshell()
    t.throws(() => { sh.use() }, 'throws when plugin is undefined')
    t.throws(() => { sh.use(42) }, 'throws when plugin is not a function')
  })

  t.test('should add plugins to its api', t => {
    t.plan(3)
    const sh = koolshell()
    t.equal(sh.exit, undefined, 'sh.exit() doesn\'t exist')
    t.doesNotThrow(() => { sh.use(exit) }, 'use() doesn’t throw an error')
    t.notEqual(sh.exit, undefined, 'sh.exit() is now set')
  })
})
