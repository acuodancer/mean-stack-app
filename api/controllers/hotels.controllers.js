var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuerry = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  // JSON point
  var point = {
    type : "Point",
    coordinates : [lng, lat]
  };
  // customize geo options
  var geoOptions = {
    spherical : true,
    maxDistance : 2000,
    num : 5
  };
  Hotel
    .geoNear(point, geoOptions, function(err, results, stats) {
      console.log('Geo results: ', results);
      console.log('Geo stats: ', stats);
      res
        .status(200)
        .json(results);
    });
};

module.exports.hotelsGetAll = function(req, res) {
  // OFFSET & COUNT
  var offset = 0;
  var count = 5;
  var MAX_COUNT = 10;
  //otherwise get from query
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  // verification
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : 'If supplied in querystring, count and offset should be numbers'
      });
    return;
  }
  if (offset < 0) {
    res
      .status(400)
      .json({
        "message" : 'Querystring offset out of range'
      });
      return;
  }
  if (count < 0 || count > MAX_COUNT) {
    res
      .status(400)
      .json({
        "message" : 'Querystring count out of range'
      });
      return;
  };
  //
  if (req.query && req.query.lat & req.query.lng) {
    runGeoQuerry(req, res);
    return;
  }
  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
      if (err) {
        console.log("Error finding hotels");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found hotels: ", hotels.length);
        res
          .status(200)
          .json(hotels);
      }
    });
};

module.exports.hotelsGetOne = function(req, res) {
  // get info from requset
  var hotelId = req.params.hotelId;
  console.log("GET htelId ", hotelId);
  Hotel
    .findById(hotelId)
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding hotels");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        response.status = 404;
        response.message = {
          "message" : "Hotel not Found!"
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
}

module.exports.hotelsAddOne = function(req, res) {
  Hotel
    .create({
      name : req.body.name,
      description : req.body.description,
      stars : parseInt(req.body.stars,10), //Integer
      services : _splitArray(req.body.services),
      photos : _splitArray(req.body.photos),
      currency : req.body.currency,
      location : {
        address : req.body.address,
        coordinates : [
          parseFloat(req.body.lng),
          parseFloat(req.body.lat)]
      }
    }, function(err, hotel){ // run after create is completed
      if (err) {
        console.log("Error creating hotel");
        res
          .status(400)
          .json(err)
      } else {
        console.log('Hotel created ', hotel);
        res
          .status(200)
          .json(hotel)
      }
    });
}

module.exports.hotelsUpdateOne = function(req, res) {
  // get info from requset
  var hotelId = req.params.hotelId;
  console.log("GET htelId ", hotelId);
  Hotel
    .findById(hotelId)
    .select("-reviews -room") // we don't want these fields
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding hotels");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        response.status = 404;
        response.message = {
          "message" : "Hotel not Found!"
        };
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        doc.name = req.body.name,
        doc.description = req.body.description,
        doc.stars = parseInt(req.body.stars,10), //Integer
        doc.services = _splitArray(req.body.services),
        doc.photos = _splitArray(req.body.photos),
        doc.currency = req.body.currency,
        doc.location = {
          address : req.body.address,
          coordinates :
          [parseFloat(req.body.lng),
            parseFloat(req.body.lat)]
        };
        doc.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err)
          } else {
            res
              .status(204) //Save successfully response
              .json(hotelUpdated);
          }
        })
      }
    });
}
