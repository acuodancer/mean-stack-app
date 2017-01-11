var express = require('express');
var app = express();
var path = require('path');

var routes = require('./api/routes');

app.set('port', 2901);

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});
// check if route matches static path name first
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

// put in call back because asyncrhonous
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
