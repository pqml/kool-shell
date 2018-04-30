# Cleanup plugin

### Features
  * The cleanup plugin is an event emitted when the process is exiting
  * Execute functions just before the process exits
  * :warning: Functions can't be asynchronous

### Example
```javascript
const sh = require('kool-shell')

function cleanupAction(code) {
  if (code === 0) console.log('App is exiting without an error, cool!')
}

// Add a new function to call when exiting
sh.on('cleanup', cleanupAction)

// Remove cleanupAction from the functions to call when exiting
sh.removeListener('cleanup', cleanupAction)
```

### Usage

#### sh.caughtExits([log])
This tells kool-shell to handle `SIGINT` and `uncaughtException` events.
* `log` _(String, default true)_: Automatically log errors. If set to false, the errors will not be displayed.

#### sh.on('cleanup', cleanupAction)
Kool-shell emits `cleanup` when your script exits and will immediately call cleanupAction

<br>
[More infos about event emitters in Nodejs](https://nodejs.org/api/events.html)