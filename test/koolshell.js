'use strict'

const test = require('tape')
const sh = require('..')

test(
  'koolshell should break when calling use() with a bad 1st argument',
  t => {
    t.plan(2)
    t.throws(() => { sh.use() }, 'throws when plugin is undefined')
    t.throws(() => { sh.use(42) }, 'throws when plugin is not a function')
  }
)

test(
  'koolshell.use() should add plugins to its api',
  t => {
    t.plan(3)
    const fakePlug = () => ({ fakePlug () {} })
    t.equal(sh.fakePlug, undefined, 'sh.fakePlug() doesn\'t exist')
    t.doesNotThrow(() => { sh.use(fakePlug) }, 'use() doesn’t throw an error')
    t.notEqual(sh.fakePlug, undefined, 'sh.fakePlug() is now set')
  }
)
