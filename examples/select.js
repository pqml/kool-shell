const sh = require('..')

function choose () {
  return sh.select('Choose:', ['A', 'B', 'C'], {
    onSubmit: (res) => res.length > 0 ? res : choose()
  })
}

choose()
  .then(res => sh.log('Return value: ', res))

