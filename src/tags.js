exports = module.exports = {};

exports.parse = function(args, defaults, replacements) {
    var options = {};
    if (typeof defaults === "object" && !(defaults instanceof Array)) {
        options = defaults;
    }

    for (var i in args) {
        var arg = args[i];
        if (arg.substr(0, 2) === "--") {
            // remove --
            arg = arg.substr(2);
            if (arg.indexOf("=") !== -1) {
                // split into further Array elements by
                // char =
                arg = arg.split("=");
                // set key to val of first elem in array and remove it from array
                var key = arg.shift();
                // join array to one string, remove = if exists
                var value = arg.join("=");

                if (/^[0-9]+$/.test(value)) {
                    value = parseInt(value, 10);
                }
                options[key] = value;
            } else {
                options[arg] = true;
            }
        } else if (arg.charAt(0) === "-" && arg.charAt(1) !== "-") {

            if (typeof replacements === "object" && !(replacements instanceof Array)) {
                // args is an Array of options like '-vhjg=bla' or '-h'
                arg = arg.substr(1);
                if (arg.indexOf("=") !== -1) {
                    arg = arg.split("=");
                    var keys = arg.shift();
                    var value = arg.join("=");

                    arg = keys.split("");
                    var key = arg.pop();
                    if (replacements.hasOwnProperty(key)) {
                        key = replacements[key];
                    }

                    if (/^[0-9]+$/.test(value)) {
                        value = parseInt(value, 10);
                    }
                    options[key] = value;
                } else {
                    arg = arg.split("");
                }

                arg.forEach(function(key) {
                    if (replacements.hasOwnProperty(key)) {
                        key = replacements[key];
                    }
                    options[key] = true;
                });
            }
        }
    }
    return options;
};
