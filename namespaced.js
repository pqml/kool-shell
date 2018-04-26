const Emitter = require('events')

const instances = {}

function createInstance (namespace) {
  const pluginCache = []
  const sh = new Emitter()

  sh.use = (plugin, pluginOpts) => {
    if (typeof plugin !== 'function') {
      throw new Error('first argument of use() needs to be a function')
    }

    if (~pluginCache.indexOf(plugin)) return
    pluginCache.push(plugin)
    pluginOpts = Object.assign({}, pluginOpts || {})
    Object.assign(sh, plugin(sh, pluginOpts))
    return sh
  }

  // Pre-install some plugins
  sh.use(require('./plugins/colors'))
    .use(require('./plugins/log'))
    .use(require('./plugins/select'))
    .use(require('./plugins/spinner'))
    .use(require('./plugins/cleanup'))
    .use(require('./plugins/exec'))
    .use(require('./plugins/exit'))
    .use(require('./plugins/input'))
    .use(require('./plugins/progressbar'))

  instances[namespace] = sh
  return sh
}

function getInstance (namespace) {
  return instances[namespace] ? instances[namespace] : createInstance(namespace)
}

module.exports = getInstance
