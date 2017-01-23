'use strict'

const Emitter = require('events')

function koolShell (opts) {
  opts = Object.assign({}, opts || {})

  let pluginCache = []

  let api = new Emitter()
  api.use = use

  return api

  function use (plugin, pluginOpts) {
    if (typeof plugin !== 'function') {
      throw new Error('first argument of use() needs to be a function')
    }

    if (~pluginCache.indexOf(plugin)) return
    pluginCache.push(plugin)
    pluginOpts = Object.assign({}, opts, pluginOpts || {})
    Object.assign(api, plugin(api, pluginOpts))
    return api
  }
}

module.exports = koolShell
