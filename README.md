# kool-shell
#### :microphone::tv::notes: A minimal module to deal with shell
[![Build Status](https://ci.appveyor.com/api/projects/status/blsw86geesww5453?svg=true)](https://ci.appveyor.com/project/pqml/kool-shell)
[![Build Status](https://secure.travis-ci.org/pqml/kool-shell.svg)](https://travis-ci.org/pqml/kool-shell)

<br>

![Spinner](https://cloud.githubusercontent.com/assets/2837959/24589402/ecdd7626-17d9-11e7-92f3-4b993be13f78.gif)


<br>

## Features

* 1 dependency (support-color)
* Native promises from Nodejs
* Shell commands with silent & inherited stdio
* Ansi Colors + Auto-detects color support
* Log methods with 4 log levels
* User input with hidden input option
* List input with multiple or single choice
* Awesome emoji-based spinner
* Progressbar
* Create and add your own kool-shell plugins easily
* Cool emojis!

<br>

## Requirements
* Node > 8
* npm > 5
* ANSI/VT100 compatible terminal

<br>

## Installation

```sh
npm install --save kool-shell
```

<br>

## Usage
#### Create a new kool-shell instance
```js
const sh = require('kool-shell')
sh.warn(sh.colors.gray('Display a gray warning'))

// You can also use object destructuring
const { warn, colors } = require('kool-shell')
warn(colors.gray('Display a gray warning'))
```

#### Namespacing
It can be useful to not share kool-shell configuration and state when dealing with
multiple modules. You can specify a namespace using the `kool-shell/namespaced` module.

```js
const sh1 = require('kool-shell/namespaced')('MyModule')
sh1.setLogOptions(globalPrefix: '[MyModule] ')
sh1.log('Customized log for the MyModule namespace')

const sh2 = require('kool-shell')
sh2.log('This log will not have the [MyModule] prefix')
```


#### Kool-shell features

All features are basically native plugins, always available in kool-shell. <br>
See the Plugins section below to learn how to create & add your own plugins.

* [Log](docs/plugins/log.md) - _Log functions_
* [Colors](docs/plugins/colors.md) - _Add colors to your log messages_
* [Progressbar](docs/plugins/progressbar.md) - _Display a progressbar_
* [Spinner](docs/plugins/spinner.md) - _Display a spinner_
* [Exec](docs/plugins/exec.md) - _Execute a promised shell command_
* [Input](docs/plugins/input.md) - _User prompt with hidden input option_
* [Select](docs/plugins/select.md) - _Select/Radio input_
* [Cleanup](docs/plugins/cleanup.md) - _Do some actions before exiting your app_
* [Exit](docs/plugins/exit.md) - _Simple alias of `process.exit(code)`_

<br>

## Plugins

#### Add a plugin

Add a plugin with `sh.use(plugin, [options])`.
You can specify options for your plugin.

```js
const koolPlugin = require('kool-shell-plugin')
sh.use(koolPlugin, { colors: false })
```

#### Create a plugin

###### Plugin template
```javascript
module.exports = myPlugin (sh, opts = {}) {
  return {
    sayHello () {
      // kool-shell native features are always available from the sh object.
      // for instance, you can easily use colors using sh.colors method
      opts.gray
        ? console.log('hello.')
        : console.log(sh.colors.gray('hello'))
    }
  }
}

```

Two arguments will be passed when your plugin is used through `sh.use()`:
* `sh` is the kool-shell instance used
* `opts` is the options object passed trough `sh.use(plugin, options)`

<br>

__Your plugin need to be a function that return an object.__ When your plugin is used, the returned object will be merged into the api object of the kool-shell instance.

> :warning:  Method/Property will be overiden if a new one has the same name. Namespace your plugin api if you use common method names

<br>

## To do
- Test all native features

<br>

## License
MIT.
