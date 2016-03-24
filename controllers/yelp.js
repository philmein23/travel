var express = require("express");
var Yelp = require("yelp");
var router  = express.Router();
var async = require('async');
// Create all API endpoints
// 1. user
// 2. preference
// 3. Andrew will pass longitude and latitude to here and I will create route on google map

router.get("/", function(req, res) {
  var yelp = new Yelp({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET,
  });

  var search = req.query.q;
  var asyncArray = [];
  var results = [];
  console.log(req.query)
  if(typeof(search) === 'string'){
    search = [search];
  };
  var parsedSearch = search.map(function(ele) {
    return JSON.parse(ele);
  });

var yelpSearchFn = function(data, callback){
  yelp.search({term: data.term, location: data.location, cl:data.latitude + "," + data.longitude})
      .then(function (data) {
        callback(null, data);
      })
      .catch(function (err) {
        console.error(err);
      });
};


async.map(parsedSearch, yelpSearchFn, function(err, results){
  var all = [].concat.apply([], results.map(function(i){
    return i.businesses;
  }));
  res.send(all);
});
});

module.exports = router;
