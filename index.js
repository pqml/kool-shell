const colors = require('./colors')
const createQuestion = require('./question')
const spawn = require('child_process').spawn

const KoolShell = {

  colors,

  question (query, cb) {
    return createQuestion(query, cb, false)
  },

  secretQuestion (query, cb) {
    return createQuestion(query, cb, true)
  },

  exec (cmd, args = [], options = {}) {
    return new Promise((resolve, reject) => {
      const child = spawn(cmd, args, Object.assign({stdio: 'inherit'}, options))
      child.on('error', reject)
      child.on('close', (code) => {
        return (code === 0) ? resolve() : reject(code)
      })
    })
  },

  silentExec (cmd, args = [], options = {}) {
    let stdout = ''
    let stderr = ''
    return new Promise((resolve, reject) => {
      const child = spawn(cmd, args, Object.assign({}, options))
      child.stdout.on('data', (data) => { stdout += data.toString() })
      child.stderr.on('data', (data) => { stderr += data.toString() })
      child.on('error', () => reject(stderr))
      child.on('close', code => (code === 0) ? resolve(stdout.trim()) : reject(stderr))
    })
  },

  step (step, total, ...msg) {
    process.stdout.write(
      colors.open.gray +
      `[${step | 0}/${total | 0}] ` +
      colors.close.gray)
    console.log(...msg)
    return this
  },

  log (...msg) {
    console.log(...msg)
    return this
  },

  error (...msg) {
    process.stdout.write(colors.open.red)
    console.log(...msg)
    process.stdout.write(colors.close.red)
    return this
  },

  warning (...msg) {
    process.stdout.write(colors.open.yellow)
    console.log(...msg)
    process.stdout.write(colors.close.yellow)
    return this
  },

  success (...msg) {
    process.stdout.write(colors.open.green)
    console.log(...msg)
    process.stdout.write(colors.close.green)
    return this
  },

  info (...msg) {
    process.stdout.write(colors.open.gray)
    console.log(...msg)
    process.stdout.write(colors.close.gray)
    return this
  },

  exit (code = 0) {
    process.exit(code)
  }

}

module.exports = KoolShell
