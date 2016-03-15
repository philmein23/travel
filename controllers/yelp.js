var express = require("express");
var Yelp = require("yelp");
var router  = express.Router();

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

	yelp.search({term: search.term, location: search.location})
	.then(function (data) {

    // console.log(data);
	res.send(data);
  console.log(req);
  })
  .catch(function (err) {
    console.error(err);
  });
	// res.send("testing");
});

module.exports = router;
