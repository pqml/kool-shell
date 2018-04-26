const { colors, warn, setLogOptions } = require('..')
const { red, blue } = colors

setLogOptions({ globalPrefix: red('[KOOL] ') })
warn(blue('blue warning'))