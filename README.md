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

===

### Features

- Minimal dependencies
- Native promises from Nodejs
- Shell commands with silent & inherited stdio
- Ansi Colors + Auto-detects color support
- Chainable methods
- Displays colorful errors (message & stack trace)
- Ask questions

### Installation

```sh
npm install pqml/kool-shell -S
```

### Usage

```javascript
const sh = require('kool-shell')

// display an error and exit with a failure code
sh.error('Something bad happens').exit(1)
```

### Methods

TODO


### License
MIT.