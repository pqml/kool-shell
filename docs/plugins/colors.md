# Colors plugin

### Features
  * Add colors to your log messages

### Example
```javascript
const sh = require('kool-shell')

sh.log(sh.colors.gray('This is a gray message'))
```

### Usage

#### `sh.colors[color](message)`
Prepend and append _color_ open/close tags to your _message_ and return the string. <br>
Available colors are: <br>
```
black, red, green, yellow, blue, magenta, cyan, white, gray
bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
```

#### `sh.colors.openTag[color]`
Return the escape sequence for the _color_ open tag. <br>

#### `sh.colors.closeTag[color]`
Return the escape sequence for the _color_ close tag. <br>
