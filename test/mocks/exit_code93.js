const koolshell = require('../..')
const exit = require('../../plugins/exit')

const sh = koolshell()
sh.use(exit)
sh.exit(93)
