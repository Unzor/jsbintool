#!/usr/bin/env node

var cli = require("cli2json").parse(process.argv.slice(2).join(" "), {
    readCommandAfter: ["-c", "--compile"]
});


var fs = require("fs");
const stringToBinary = function(string, maxBytes) {
    //for BINARY maxBytes = 255
    //for VARBINARY maxBytes = 65535
    let binaryOutput = '';
    if (string.length > maxBytes) {
        string = string.substring(0, maxBytes);
    }

    for (var i = 0; i < string.length; i++) {
        binaryOutput += string[i].charCodeAt(0).toString(2) + ' ';
    }

    return binaryOutput;
};

function encode_bin(a) {
    var array = [];
    var array2 = [];
    array = a.split("")

    array.forEach(function(a) {
        if (a !== "1" && a !== " ") {
            a = "9"
        }

        if (a !== " ") {
            array2.push(eval(unescape(escape("\"\\u" + "000" + a + "\""))));
        } else {
            array2.push(a);
        }
        console.log(a);
    })
    return array2.join("")
}

function decode_bin(uint) {
    const ab = new ArrayBuffer(uint.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < uint.length; ++i) {
        view[i] = uint[i];
    }

    uint = eval("[" + new Uint8Array(ab).toString() + "]")
    var f_array = [];
    uint.forEach(function(entry) {
        if (entry == 9) {
            entry = 0;
        } else if (entry == 32) {
            entry = " "
        }
        f_array.push(entry);
    })

    const arrayOfBytes = f_array.join("").split(' ');

    let stringOutput = '';

    for (let i = 0; i < arrayOfBytes.length; i++) {
        stringOutput += String.fromCharCode(parseInt(arrayOfBytes[i], 2));
    }

    return stringOutput.substring(0, stringOutput.length - 1);
};

if (cli.flags[0]) {
    if (cli.commands[0]) {
        if (cli.flags[0].startsWith("--compile") || cli.flags[0].startsWith("-c")) {
            fs.writeFileSync(cli.flags[0].split(" ").pop(), encode_bin(stringToBinary(fs.readFileSync(cli.commands[0]).toString())));
        } else {
            console.log("error: unknown flag: " + cli.flags[0].split(" ").shift());
        }
    } else {
        console.log("error: no file to compile provided!")
    }
}

if (cli.commands[0] && !cli.flags[0]) {
    eval(decode_bin(fs.readFileSync(cli.commands[0])))
} else if (!cli.commands[0] && !cli.flags[0]) {
    console.log("error: no CLI arguments or flags provided!")
}

module.exports = {
    fileToBinary: function(file) {
        return encode_bin(stringToBinary(fs.readFileSync(file).toString()))
    },
    binaryFileToString: function(file) {
        return decode_bin(fs.readFileSync(file));
    },
    stringToBinary: function(string) {
        return encode_bin(stringToBinary(string))
    },
     binaryToString: function(string) {
        return decode_bin(string);
    },
}
