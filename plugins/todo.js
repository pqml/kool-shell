'use strict'

const Emitter = require('events')

function todoPlugin (sh) {
  const api = {
    todo
  }

  return api

  function todo () {
    let undoneTasks = []
    let doneTasks = []

    const api = new Emitter()
    api.task = task
    api.totalCount = totalCount
    api.doneCount = doneCount
    api.undoneCount = undoneCount
    api.nextTask = nextTask
    api.progress = progress

    return api

    function progress () {
      return doneTasks.length / totalCount()
    }

    function totalCount () {
      return undoneTasks.length + doneTasks.length
    }

    function doneCount () {
      return doneTasks.length
    }

    function undoneCount () {
      return undoneTasks.length
    }

    function nextTask () {
      return (undoneTasks[0]) ? undoneTasks[0] : null
    }

    function task (_value, opts) {
      opts = opts || {}
      let started = false

      const thisTask = {
        value: value,
        start: start,
        done: done
      }

      undoneTasks.push(thisTask)
      api.emit('task-added', api, thisTask)
      api.emit('progress', api, progress())

      return thisTask

      function value () {
        return _value
      }

      function start () {
        if (started) return
        started = true
        api.emit('task-started', api, thisTask)
        api.emit('progress', api, progress())
        if (typeof opts.onStarted === 'function') opts.onStarted(thisTask)
      }

      function done () {
        const id = undoneTasks.indexOf(thisTask)
        if (!~id) return false

        undoneTasks.splice(id, 1)

        if (!~doneTasks.indexOf(thisTask)) {
          doneTasks.push(thisTask)
        }

        if (typeof opts.onDone === 'function') opts.onDone(thisTask)
        api.emit('task-done', api, thisTask)
        api.emit('progress', api, progress())
        if (undoneTasks.length === 0) api.emit('complete', api)

        return true
      }
    }
  }
}

module.exports = todoPlugin
