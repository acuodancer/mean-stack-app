/* OUTDATED
require('./api/data/dbconnection.js').open(); // start and save connection process
*/
require('./api/data/db.js');

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');

app.set('port', 2901);

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});
// middleware for static path: matching url and dir name
app.use(express.static(path.join(__dirname, 'public')));
// middleware for posted URL-enconded data
app.use(bodyParser.urlencoded({ extended : false}));
// middleware for routing
app.use('/api', routes);
// put in call back because asyncrhonous
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
