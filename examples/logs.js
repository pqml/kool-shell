const sh = require('..')

sh.step(1, 3, 'Display error message')
sh.error('Error!')

sh.step(2, 3, 'Display warning message')
sh.warn('Warning!')

sh.step(3, 3, 'Display success message')
sh.success('Done!')
