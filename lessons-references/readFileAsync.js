var fs = require('fs'); // default file system class

var onFileLoad = function(err, file) {
  console.log("Got the file");
};
console.log("Going to get a file");
var file = fs.readFile('readFileSync.js', onFileLoad); // unit test now possible due to named call back
console.log("App continues...");
