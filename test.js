const sh = require('.')

function testQuestion () {
  console.log('\nTest question()')
  return sh.question('Do you want to test kool-shell ? (yes) ',
    (answer) => { console.log('Answer: ' + answer) })
}

function testFullError () {
  console.log('\nTest full error log')
  try {
    throw new Error('Check for full Error log')
  } catch (e) {
    sh.error(e).warning(e).info(e).success(e)
  }
}

function testSilentExec () {
  console.log('\nTest silentExec()')
  return new Promise((resolve, reject) => {
    sh.silentExec('echo', ['Silent Execution'])
      .then((msg) => {
        console.log('Echo returned: ' + msg)
        resolve()
      })
  })
}

function testExec () {
  console.log('\nTest exec()')
  return new Promise((resolve, reject) => {
    return sh.exec('npm', ['init'])
      .then((msg) => {
        sh.success('exec() closed.')
        resolve()
      })
  })
}

function testExit () {
  console.log('\nTest exit(0)')
  sh.exit(0)
}

testQuestion()
  .then(() => testFullError())
  .then(() => testSilentExec())
  .then(() => testExec())
  .then(() => testExit())
  .catch(err => console.log(err))
