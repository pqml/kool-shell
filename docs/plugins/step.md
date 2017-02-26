# Step plugin

### Features
  * Display step-by-step message


### Example
```javascript
const koolShell = require('kool-shell')
const koolStep = require('kool-shell/plugins/step')

const sh = koolShell().use(koolStep)

// display "[1/4] First action"
sh.step(1, 4, 'First action')

// display "[2/4] First action"
sh.step(2, 4, 'Second action')
```

### Usage

#### sh.step(currentStep, total, message)
Log `[ currentStep / total ] message`.