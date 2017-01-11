var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
  console.log("GET the hotels");
  res
    .status(200)
    .json(  hotelData );
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
