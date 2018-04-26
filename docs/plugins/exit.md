# Exit plugin

### Features
  * Alias of the `process.exit(code)` function

### Example
```javascript
const sh = require('kool-shell')

// Exit the app with an error code
sh.exit(1)
```

### Usage

#### sh.exit([code])
Terminate the process with `code`.

* `code` _(Integer, default 0)_: The exit code.

<br>

[More infos about process.exit()](https://nodejs.org/api/process.html#process_process_exit_code)