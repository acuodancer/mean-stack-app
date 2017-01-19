var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;

// this is asyncrhonous
var open = function() {
  MongoClient.connect(dburl, function(err, db) {
    if (err) {
      console.log("DB connection failed");
      return;
    } else {
      _connection = db;
      console.log("DB connection open", db);
    }
  });
};

var get = function() {
  return _connection;
};

module.exports = {
  open : open,
  get : get
};
