'use strict'

function json2t (t, obj) {
  for (let k in obj) {
    let args = Array.isArray(obj[k]) ? obj[k] : [obj[k]]
    t[k].apply(null, args)
  }
}

module.exports = json2t
