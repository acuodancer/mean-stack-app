var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
  console.log("GET the hotels");
  console.log(req.query); // express separates queries automatically
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
  }
  // process data before returning
  var returnData = hotelData.slice(offset, offset + count);
  res
    .status(200)
    .json(  returnData );
};

module.exports.hotelsGetOne = function(req, res) {
  // get info from requset
  var hotelId = req.params.hotelId;
  // get the desired json
  var thisHotel = hotelData[hotelId];
  console.log("GET hotel: " + hotelId);
  res
    .status(200)
    .json(  thisHotel );
};
