# jsbintool
JSBinTool - JavaScript Binary Toolkit

# Usage
You can either compile a file:
```
jsbintool index.js --compile main.bin
```
Or run one:
```
jsbintool main.bin
```
Or transpile through either one using the JavaSciript API:
```javascript
var jsbintool = require("jsbintool");
var fs = require("fs");

// Encode string to binary file
fs.writeFileSync("test.bin", jsbintool.stringToBinary("console.log(\"Hello World!\")"))

// Evaluate binary file
eval(jsbintool.binaryFileToString("test.bin"));

// Encode file to binary file
fs.writeFileSync("test.bin", jsbintool.fileToBinary("main.js"))

// Evaluate binary file
eval(jsbintool.binaryFileToString("test.bin"));

// Evaluate raw binary using fs
eval(jsbintool.binaryToString(fs.readFileSync("test.bin")));
```
