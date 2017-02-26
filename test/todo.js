'use strict'

const test = require('tape')
const koolshell = require('..')
const todoPlugin = require('../plugins/todo')

test(
  'todo plugin should emit task-added and progress events when a task is added',
  t => {
    t.plan(2)
    const sh = koolshell().use(todoPlugin)
    const todo = sh.todo()
    todo.on('task-added', todo => {
      t.pass('task-added has been emitted')
    })
    todo.on('progress', todo => {
      t.pass('progress has been emitted')
    })
    todo.task('Make music')
  }
)

test(
  'todo plugin should emit task-done and progress events when a task is done',
  t => {
    t.plan(2)
    const sh = koolshell().use(todoPlugin)
    const todo = sh.todo()
    const makemusic = todo.task('Make music')
    todo.on('task-done', todo => {
      t.pass('task-done has been emitted')
    })
    todo.on('progress', todo => {
      t.pass('progress has been emitted')
    })
    makemusic.done()
  }
)

test(
  'todo plugin should emit complete when all tasks are done',
  t => {
    t.plan(1)
    const sh = koolshell().use(todoPlugin)
    const todo = sh.todo()
    const tasks = [
      todo.task('One'),
      todo.task('Two'),
      todo.task('Three')
    ]
    todo.on('complete', todo => {
      t.pass('complete has been emitted')
    })
    tasks.forEach(el => el.done())
  }
)

test(
  'todo plugin should update stats correctly when tasks are done or added',
  t => {
    t.plan(16)
    const sh = koolshell().use(todoPlugin)
    const todo = sh.todo()
    todo.once('task-added', (todo, progress) => {
      t.comment('New task added')
      t.equal(todo.progress(), (0 / 1), 'todo.progress() return 0')
      t.equal(todo.undoneCount(), 1, 'todo.undoneCount() return 1')
      t.equal(todo.doneCount(), 0, 'todo.doneCount() return 0')
      t.equal(todo.totalCount(), 1, 'todo.totalCount() return 1')
    })
    const makemusic = todo.task('Make music')
    todo.once('task-added', (todo, progress) => {
      t.comment('New task added')
      t.equal(todo.progress(), (0 / 2), 'todo.progress() return 0')
      t.equal(todo.undoneCount(), 2, 'todo.undoneCount() return 2')
      t.equal(todo.doneCount(), 0, 'todo.doneCount() return 0')
      t.equal(todo.totalCount(), 2, 'todo.totalCount() return 2')
    })
    todo.task('Wash dishes')
    todo.once('progress', (todo, progress) => {
      t.comment('First task done')
      t.equal(todo.progress(), (1 / 2), 'todo.progress() return 1/2')
      t.equal(todo.undoneCount(), 1, 'todo.undoneCount() return 1')
      t.equal(todo.doneCount(), 1, 'todo.doneCount() return 1')
      t.equal(todo.totalCount(), 2, 'todo.totalCount() return 2')
    })
    makemusic.done()
    todo.once('progress', (todo, progress) => {
      t.comment('New task added')
      t.equal(todo.progress(), (1 / 3), 'todo.progress() return 1/3')
      t.equal(todo.undoneCount(), 2, 'todo.undoneCount() return 2')
      t.equal(todo.doneCount(), 1, 'todo.doneCount() return 1')
      t.equal(todo.totalCount(), 3, 'todo.totalCount() return 3')
    })
    todo.task('Code more')
  }
)
