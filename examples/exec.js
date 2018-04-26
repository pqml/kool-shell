const sh = require('..')

sh.silentExec('git', ['config', 'user.name'])
  .then(res => sh.log('Return value: ', res))

