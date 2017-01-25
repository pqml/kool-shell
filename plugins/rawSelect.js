'use strict'

const cursor = require('../utils/cursor')
const colors = require('../utils/colors')
const readline = require('readline')

function rawSelectPlugin (sh) {
  const api = {
    rawSelect
  }

  return api

  function rawSelect (label, list, opts) {
    return new Promise((resolve, reject) => {
      let answer

      label = label.toString()

      list = list || {}
      if (Array.isArray(list)) {
        let newList = {}
        list.forEach(el => { newList[el] = el })
        list = newList
      }

      opts = opts || {}
      opts = Object.assign({}, {
        instructions: (
          colors.gray(
            'Enter numbers from answers you want, separated by a space \n'
          )
        ),
        separator: ' '
      }, opts)

      process.stdout.write(label + '\n\n')
      prepareList()
      process.stdout.write('\n')

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      process.stdin.setRawMode(true)
      process.stdin.on('data', onStdin)

      rl.question(opts.instructions, (answer) => {
        const selection = getSelection(answer)
        if (opts.hidden) process.stdin.removeListener('data', onStdin)
        rl.close()
        if (typeof opts.onAnswer === 'function') {
          Promise.resolve()
            .then(() => opts.onAnswer(selection))
            .then(res => resolve(res))
            .catch(err => reject(err))
        } else {
          return resolve(selection)
        }
      })

      updateList('')

      function prepareList () {
        Object.keys(list).forEach(() => {
          process.stdout.write('\n')
        })
      }

      function getIds (answer) {
        return answer
          .split(opts.separator)
          .filter(v => v > 0)
          .map(v => v.trim() | 0)
      }

      function updateList (answer) {
        let ids = getIds(answer)
        let i = 0
        let max = (
          Object.keys(list).length + opts.instructions.split('\n').length
        )
        cursor.save()
        cursor.prevLine(max)
        for (let option in list) {
          cursor.clearLine()
          process.stdout.write(
            ~ids.indexOf(++i)
            ? colors.blue('✔︎  ' + i + ' ‣ ' + list[option])
            : colors.white('   ' + i + ' ‣ ' + list[option])
          )
          cursor.nextLine(1)
        }
        // cursor.nextLine(2)
        cursor.restore()
      }

      function getSelection (answer) {
        let ids = getIds(answer)
        let selection = []
        let i = 0
        for (let option in list) {
          if (~ids.indexOf(++i)) {
            selection.push(option)
          }
        }
        return selection
      }

      function onStdin (chunk) {
        const char = chunk.toString('utf8')
        if (char === '\n' || char === '\r' || char === '\u0004') {
          process.stdin.pause()
        } else {
          answer = rl.line
          updateList(answer)
        }
      }
    })
  }
}

module.exports = rawSelectPlugin
