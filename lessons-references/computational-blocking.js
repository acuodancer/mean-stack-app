var child_process = require('child_process');
console.log(1);
// supply command i.e. node
var newProcess = child_process.spawn('node', ['_fibonacci.js'], {
  stdio : "inherit"
});
console.log(2);
