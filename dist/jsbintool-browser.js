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
    const view = new Uint8Array(uint);
    for (let i = 0; i < uint.length; ++i) {
        view[i] = uint[i];
    }

    uint = eval("[" + new Uint8Array(uint).toString() + "]")
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

var jsbintool = {
    fileToBinary: async function(file) {
        var h = await fetch(file)
        return encode_bin(stringToBinary(await h.text()))
    },
    binaryFileToString: async function(file) {
        var h = await fetch(file)
        return decode_bin(await h.arrayBuffer());
    },
    stringToBinary: function(string) {
        return encode_bin(stringToBinary(string))
    },
    binaryToString: function(string) {
        return decode_bin(string);
    },
    runBinaryFromFile: async function(file) {
        var h = await fetch(file)
        eval(decode_bin(await h.arrayBuffer()));
    }, 
     runBinaryFromVariable: async function(file) {
        eval(decode_bin(file));
    }
};
