var fs = require('fs'); // default file system class
console.log("Going to get a file");
var file = fs.readFileSync('readFileSync.js'); // real database will cause delay
console.log("Got the file");
console.log("App continues...");
