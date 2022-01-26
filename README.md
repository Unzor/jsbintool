# jsbintool
JSBinTool - JavaScript Binary Toolkit

# What is this useful for?
This is useful for hiding your code and making it nearly unreadable. However, people can still decode it using the JSBinTool library, so use the JSBinTool packager (coming soon.)
# Usage
First install it:
```
npm install -g jsbintool
```
Now you can either compile a file:
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
You can also use it in the browser:
```html
<html>
<body>
  <script src="jsbintool-browser.min.js"></script>
  <script>
    jsbintool.runFile("script.bin");
  </script>
</body>
</html>
```
