# Todo plugin

<br>

>:warning: __The todo plugin does nothing in the terminal itself, but it pairs nicely with the step plugin or the progressbar plugin.__ 

<br>

### Features
  * Manage task/steps easily
  * `complete`, `task-added`, `task-done`, `progress` events


### Example
```javascript
const koolShell = require('kool-shell')
const koolTodo = require('kool-shell/plugins/todo')

const sh = koolShell().use(koolTodo)

const todo = sh.todo()
const makeDinner = todo.task('Make dinner')
const washDishes = todo.task('Wash dishes')

todo.on('complete', todo => {
  console.log('All ' + todo.totalCount() + ' tasks have been done!')
})

console.log(todo.progress()) // return 0

makeDinner.done()

console.log(todo.progress()) // return 0.5

washDishes.done()
// complete event is emitted
```

### Usage

#### `const todo = sh.todo()`
Return a new todolist instance

* `todo.doneCount()`
    - Return the amount of done tasks

* `todo.undoneCount()`
    - Return the amount of undone tasks

* `todo.totalCount()`
    - Return the amount of done and undone tasks

* `todo.progress()`
    - Return the progress ratio (`doneCount() / totalCount()``)

* `todo.nextTask()`
    - Return the next undone task on the todo list – the first in the undone array.

* `todo.on('progress', function(todo, progress){ ... })`
    - progress is called when the todolist change (task added or done)
    - The progress is passed to the callback as 2nd argument.

* `todo.on('task-added', function(todo, task){ ... })`
    - task-added is called when a new task is added to the todolist.
    - The added task is passed to the callback as 2nd argument

* `todo.on('task-started', function(todo, task){ ... })`
    - task-started is called when `task.start()` is called.
    - The started task is passed to the callback as 2nd argument

* `todo.on('task-done', function(todo, task){ ... })`
    - task-done is called when a task is done.
    - The done task is passed to the callback as 2nd argument

* `todo.on('complete', function(todo){ ... })`
    - complete is called when all current task in the todolist have been done.

<br>

#### `const task = todo.task(value, [options])`
Add a new task to the `todo` instance. Return a task object.

* `label`
    - The value of your task. Once the task is created you can always access it via `task.value()`

* `options.onStarted` _(Function)_
    - options.onStarted will be called when the task is marked as started
    - The started task object is passed as first argument

* `options.onDone` _(Function)_
    - options.onDone will be called when the task is done
    - The done task object is passed as first argument

* `task.start()`
    - Mark this task as started.
    - The todo instance will emit `task-started`

* `task.done()`
    - Mark this task as done.
    - The todo instance will emit `task-done`

* `task.value()`
    - Return the value of the task. Can be whatever type you want.