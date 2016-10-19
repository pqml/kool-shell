const readline = require('readline')

function question(query, cb, hidden = false) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    function hidePassword (char) {
      char = char + ''
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          process.stdin.pause()
          break
        default:
          process.stdout.write('\033[2K\033[200D' + query + Array(rl.line.length + 1).join('*'))
          break
      }
    }

    if (hidden) {
      process.stdin.setRawMode(true)
      process.stdin.on('data', hidePassword)
    }

    rl.question(query, (answer) => {
      if (hidden) process.stdin.removeListener('data', hidePassword)
      rl.close()
      if (cb(answer) === false) reject(answer)
      else resolve(answer)
    })
  })
}

module.exports = question