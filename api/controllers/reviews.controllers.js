var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
// GET all reviews for one hotelsm
module.exports.reviewsGetAll = function(req, res) {
  // get info from requset
  var hotelId = req.params.hotelId;
  console.log("GET hotelId ", hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      console.log("Returned doc ", doc);
      res
        .status(200)
        .json(doc.reviews);
    })
}
// GET a single review for one hotel
module.exports.reviewsGetOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      console.log("Returned doc", hotel);
      var review = hotel.reviews.id(reviewId);
      res
        .status(200)
        .json(review);
    })
}
