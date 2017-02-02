/*
Models are compiled version of schemas
*/
var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  rating : {
    type : Number,
    min : 0,
    max : 5,
    required : true
  },
  review : {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

var roomSchema = new mongoose.Schema({
  name : String,
  number : Number,
  description : String,
  photos : [String],
  price : Number
});

var hotelSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  stars : {
    type : Number,
    min : 0,
    max : 5,
    "default" : 0
  }, // long & double are not supported
  services : [String],
  description : String,
  photos : [String],
  currency : String,
  reviews : [reviewSchema],
  rooms : [roomSchema],
  location : {
    address : String,
    // longitude (EW) before lattitude (NS)
    coordinates : {
      type : [Number],
      index : '2dsphere'
    }
  }
});
// Paramters: Model Name, Schema, Collection name (set to lower case by default)
mongoose.model('Hotel', hotelSchema, 'hotels');
