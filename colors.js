const supportsColor = require('supports-color')

const colorCodes = {
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49]
}

let colors = {
  open: {},
  close: {}
}

for (let color in colorCodes) {
  colors.open[color] = (supportsColor) ? '\u001b[' + colorCodes[color][0] + 'm' : ''
  colors.close[color] = (supportsColor) ? '\u001b[' + colorCodes[color][1] + 'm' : ''
  colors[color] = function (s) {
    return colors.open[color] + s + colors.close[color]
  }
}

module.exports = colors
