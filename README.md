# jsbintool
JSBinTool - JavaScript Binary Toolkit

# Uses
This is useful for hiding your code and making it nearly unreadable. However, people can still decode it using the JSBinTool library, so use the JSBinTool packager. The contents of the packager are obfuscated to hide the base code.

To run the packager, clone this repo and run this: (Note: the javascript-obfuscator module will need to be installed. To install: "npm install javascript-obfuscator")
```
node jsbintool-packager <file>.bin
```
It should generate a file named jsbintool-packager-script.js. You can use it in a script like this:
```html
<script src="jsbintool-packager-script.js"></script>
```
It will run the same code as the original compiled JavaScript code. It does not use the decompiled code from your compiled BIN file, instead using Uint8Arrays and buffers.

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
Or you could package it using the JSBinTool packager ([more info](https://github.com/Unzor/jsbintool#uses)):
```html
<html>
<body>
  <script src="jsbintool-packager-script.js"></script>
</body>
</html>
```
