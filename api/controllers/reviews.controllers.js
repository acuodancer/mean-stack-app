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
      var response = {
        status : 200,
        message : doc.reviews
      };
      if (err) {
        console.log("Error finding reviews");
        response.status = 500;
        response.message = err;
      } else {
        console.log("Returned doc ", doc);
      }
      res
        .status(response.status)
        .json(response.doc);
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
      var response = {
        status : 200,
        message : hotel.reviews.id(reviewId)
      };
      if (err) {
        console.log("Error finding reviews");
        response.status = 500;
        response.message = err;
      } else if (!hotel) {
        response.status = 404;
        response.message = {
          "message" : "Hotel not found",
        };
      } else if (!hotel.reviews.id(reviewId)) {
        response.status = 404;
        response.message = {
          "message" : "Review not found",
        };
      } else {
          console.log("Returned doc", hotel);
      }
      res
        .status(response.status)
        .json(response.message);
    })
}
