const cursor = require('../utils/cursor')

function allocateLines () {
  process.stdout.write('\n')
}

function spinnerPlugin (sh) {
  const defaults = {
    delay: 100,
    title: '%s',
    frames: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛']
  }

  const api = {
    spinner: spinner
  }

  return api

  function spinner (opts) {
    opts = Object.assign({}, defaults, opts || {})

    let timer
    let ticks = 0
    let text = parseText('')

    const api = {
      resume: resume,
      log: log,
      pause: pause
    }

    return api

    function resume () {
      allocateLines()
      timer = setInterval(tick, opts.delay)
    }

    function log (message) {
      text = parseText(message)
    }

    function pause (clear) {
      if (clear && timer) {
        cursor.prevLine()
        cursor.clearLine()
      }
      clearInterval(timer)
    }

    function tick () {
      let out = `${animate(++ticks)}  ${text}`

      cursor.prevLine()
      cursor.clearLine()
      process.stdout.write(out)
      cursor.nextLine()
    }

    function animate (tick) {
      return opts.frames[tick % opts.frames.length]
    }

    function parseText (str) {
      return ~opts.title.indexOf('%s')
        ? opts.title.replace('%s', str)
        : `${opts.text} : ${str}`
    }
  }
}

module.exports = spinnerPlugin
