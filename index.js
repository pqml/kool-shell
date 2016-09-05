const colors = require('term-color');
const spawn = require('child_process').spawn;
const readline = require('readline');

const KoolShell = {
  colors,

  question(query, cb) {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(query, (answer) => {
        rl.close();
        //process.stdin.destroy();
        if (cb(answer) === false) reject();
        else resolve();
      });
    });
  },

  exec(cmd, args, options) {
    return new Promise((resolve, reject) => {
      const child = spawn(cmd, args, Object.assign({stdio: 'inherit'}, options));
      child.on('error', reject);
      child.on('close', code => (code === 0) ? resolve() : reject(new Error(code)));
    });
  },

  error(msg, exit = false) {
    console.log(colors.red(msg));
    if (exit) this.exit(1);
    return this;
  },

  warning(msg) {
    console.log(colors.yellow(msg));
    return this;
  },

  success(msg, exit = false) {
    console.log(colors.green(msg));
    if (exit) this.exit(1);
    return this;
  },

  info(msg) {
    console.log(colors.gray(msg));
    return this;
  },

  exit(code = 0) {
    process.exit(code);
  }

}

module.exports = KoolShell;