exports = module.exports = {};

exports.parse = function(args, defaults) {
  var options = {}
  if (typeof defaults === "object" && !(defaults instanceof Array)) {
    options = defaults
  }
  // args is an Array of arguments like --hello=world
  for (var i in args) {
    var arg = args[i];
    if (arg.substr(0,2) === "--") {
      // remove --
      arg = arg.substr(2)
      if (arg.indexOf("=") !== -1){
        // split into further Array elements by
        // char =
        arg = arg.split("=");
        // set key to val of first elem in array and remove it from array
        var key = arg.shift();
        // join array to one string, remove = if exists
        var value = arg.join("=");

        if(/^[0-9]+$/.test(value)) {
          value = parseInt(value, 10);
        }
        options[key] = value;
      }
    }
  }
  return options
}
