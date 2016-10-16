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

function testSpreading () {
  console.log('\nTest spread messages')
  sh.error('message1', 'message2', 'message3')
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

function testStep () {
  console.log('\nTest step() function')
  sh.step(1, 3, 'Step one').step(2, 3, 'Step two...', 'multiple args').step(3, 3, 'Ok !')
}

function testExit () {
  console.log('\nTest exit(0)')
  sh.exit(0)
}

testQuestion()
  .then(() => testFullError())
  .then(() => testSpreading())
  .then(() => testSilentExec())
  .then(() => testExec())
  .then(() => testStep())
  .then(() => testExit())
  .catch(err => console.log(err))
