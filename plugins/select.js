'use strict'

const cleanup = require('./cleanup')
const colors = require('../utils/colors')
const cursor = require('../utils/cursor')

function selectPlugin (sh) {
  sh.use(cleanup)

  const api = {
    select
  }

  return api

  function select (label, list, opts) {
    return new Promise((resolve, reject) => {
      label = label.toString()
      list = list || []
      opts = opts || {}
      opts = Object.assign({}, {
        instructions: (
          colors.gray(
            '(Press space to select, enter to valid.) \n'
          )
        )
      }, opts)
      let currentEl = 1

      process.stdin.setRawMode(true)
      process.stdin.resume()
      process.stdin.on('data', onInput)

      process.stdout.write(label + '\n' + opts.instructions + '\n')
      allocateLines(list)
      renderList(list, currentEl)

      function onInput (chunk) {
        const char = chunk.toString('utf8')
        switch (char) {
          case '\u0003': // Ctrl + C
            process.emit('SIGINT')
            break
          case '\u001a': // Ctrl + Z
            process.exit('SIGTSTP')
            break
          case '\n':
          case '\r':
          case '\u0004': // Enter
            process.stdin.pause()
            process.stdout.write('\n')
            resolve(list)
            break
          case '\u001b[A': // Up
            currentEl = currentEl > 1 ? currentEl - 1 : 1
            renderList(list, currentEl)
            break
          case '\u001b[B': // Down
            currentEl = currentEl < list.length ? currentEl + 1 : list.length
            renderList(list, currentEl)
            break
          case ' ': // Space
            let el = list[currentEl - 1]
            if (typeof el === 'string') {
              list[currentEl - 1] = { value: el, selected: true }
            } else {
              el.selected = !el.selected
            }
            renderList(list, currentEl)
            break
          default:
            break
        }
      }
      // todo
    })
  }

  function allocateLines (list) {
    let out = ''
    for (let i = 0; i < list.length; i++) out += '\n'
    process.stdout.write(out)
  }

  function renderList (list, currentEl) {
    cursor.prevLine(list.length)
    for (let i = 0; i < list.length; i++) {
      cursor.clearLine()
      const el = list[i]
      const id = i + 1
      const val = typeof el === 'string' ? el : el.value || ''
      const selected = !!el.selected
      const current = currentEl === id
      const out = formatElement(id, val, selected, current)
      process.stdout.write(out)
      cursor.nextLine()
    }
  }

  function formatElement (id, value, selected, current) {
    let out = ''
    out += selected ? colors.openTag.blue : colors.openTag.gray
    out += selected ? '✔︎  ' : '   '
    out += id + '. '
    out += value
    out += current ? colors.gray('  ←') : ''
    out += selected ? colors.closeTag.blue : colors.closeTag.gray
    return out
  }
}

module.exports = selectPlugin
