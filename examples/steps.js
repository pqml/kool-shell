'use strict'

const koolShell = require('..')
const koolStep = require('../plugins/step')
const koolTodo = require('../plugins/todo')

const sh = koolShell()
  .use(koolStep)
  .use(koolTodo)

const todo = sh.todo()

todo.on('task-started', (todo, task) => {
  sh.step(todo.doneCount() + 1, todo.totalCount(), task.value())
  setTimeout(task.done, 1000)
})

todo.on('task-done', (todo, task) => {
  if (todo.nextTask()) todo.nextTask().start()
})

todo.on('complete', () => {
  console.log('All tasks have been done!')
})

todo.task('make music', {
  onStarted () { console.log('playing fiddle...') }
})
todo.task('learn javascript', {
  onStarted () { console.log('coding some cool stuff...') }
})
todo.task('dance', {
  onStarted () { console.log('doing a robot dance...') }
})
todo.task('wash dishes', {
  onStarted () { console.log('washing forks and spoons...') }
})

todo.nextTask().start()
