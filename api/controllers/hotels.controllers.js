var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.hotelsGetAll = function(req, res) {
  // default values for offset & count
  var offset = 0;
  var count = 5;
  //otherwise get from query
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  // verification
  if (offset < 0) {
    offset = 0;
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  // verification
  if (count < 0) {
    count = 5;
  };

  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
      console.log("Found hotels: ", hotels.length);
      res
        .status(200)
        .json(hotels);
    });
};

module.exports.hotelsGetOne = function(req, res) {
  // get info from requset
  var hotelId = req.params.hotelId;
  console.log("GET htelId ", hotelId);

  Hotel
    .findById(hotelId)
    .exec(function(err, doc) {
      res
        .status(200)
        .json(doc);
    })
};

module.exports.hotelsAddOne = function(req, res) {
  var db = dbconn.get();
  var collection = db.collection('hotels');
  console.log("POST new hotel");
  if (req.body && req.body.name && req.body.stars) {
    newHotel = req.body;
    newHotel.stars = parseInt(req.body.stars, 10);
    collection.insertOne(newHotel, function(err, response){
      console.log(response);
      res
        .status(201)
        .json(response.ops);
    });
  } else {
    console.log("Data missing from body");
    res
      .status(400)
      .json({ message : "Required Data missing from body"});
  }
}
