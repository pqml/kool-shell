<h1 align="center">kool-shell</h1>
<h3 align="center">:headphones: A minimal module to deal with shell :microphone:</h3>

<div align="center">
  <!-- License -->
  <a href="https://raw.githubusercontent.com/pqml/kool-shell/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" />
  </a>
  <!-- Standard -->
  <a href="http://standardjs.com/">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard" />
  </a>
</div>

<br><br>

## Features

- Minimal dependencies
- Native promises from Nodejs
- Shell commands with silent & inherited stdio
- Ansi Colors + Auto-detects color support
- Chainable methods
- Displays colorful errors (message & stack trace)
- Ask questions

<br>

## Installation

```sh
npm install pqml/kool-shell -S
```


<br>

## Example
```javascript
const path = require('path')
const sh = require('kool-shell')

// Execute npm init in the directory ./myproject
// Once npm init is done, display a success message and exit node
sh.exec('npm', ['init'], { cwd: path.join(__dirname, 'myproject') })
  .then(() => { sh.success('npm init done !').exit(0) })

```

<br>

## Usage

#### `sh.exec (command, [...arguments], {...options})`

Exec a _command_ through a shell instance. The parent `stdio` is inherited, meaning that all logs, error and user inputs will be displayed in the controlling terminal.

* _command_: the command to execute with `child_process.spawn()` (ex: `npm`)
* _arguments_: arguments of the function, in an array (ex: `['i', '-S', 'xtend']`)
* _options_: `child_process.spawn()` options (ex: `{cwd: './coolproject/'}`)

_→  Return a promise that will be resolved or rejected depending on the output of the command._

<br>

#### `sh.silentExec (command, [...arguments], {...options})`

Basically the same as `sh.exec` without the parent `stdio` inheritance.
<br>
Instead, ouput are passed in the catch / resolve method of the returned promise
<br><br>
_→  Return a promise that will be resolved or rejected depending on the output of the command._

<br>

#### `sh.question (question, testAnswer)`

Ask question to the user
<br>
* _question_: question as a string
* _testAnswer_: function called after user has answered. You can test the user answer pass as 1st parameter, and return true or false to resolve or reject the promise

Example:
```js
  sh.question('Do you want some cheese ? (yes) ', checkYes)
    .catch(() => { sh.error ('No cheese for you')})
    .then(() => { sh.success ('Some cheese : 🧀🧀🧀')})

  function checkYes (answer) {
    return answer.match(/^y(es)?$/i)
  }
```

_→  Return a promise that will be resolved or rejected depending on the return value of the testAnswer function._

<br>

#### `sh.error (...msg)`

Console.log messages / errors in red
<br>
_→  Return the kool-shell object, you can chain another method._

<br>

#### `sh.warning (...msg)`

Console.log messages / errors in yellow
<br>
_→  Return the kool-shell object, you can chain another method._

<br>

#### `sh.success (...msg)`

Console.log messages / errors in green
<br>
_→  Return the kool-shell object, you can chain another method._

<br>

#### `sh.info (...msg)`

Console.log messages / errors in gray
<br>
_→  Return the kool-shell object, you can chain another method._

<br>

#### `sh.exit (code = 0)`

Exit the node process with code _code_ (default: 0)

<br>

## License
MIT.
