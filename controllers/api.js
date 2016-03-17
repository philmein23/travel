var express = require("express");
var router  = express.Router();
var User = require("../models/user");


router.get("/", function(req, res){
	res.send("hi Api");
});

router.post('/user/create', function(req, res){
   var NewUser = new User(req.body)
   
   NewUser.save(function(err) { if (err) {
      res.send({status: "Error", message: "A User with that name already exists", err: err}) 
      } else {
     User.findOne({ uid: NewUser.uid }, function(err, user) { 
      res.send({status: "OK", user});
     });
    }
   });

});

router.post('/user/auth', function(req, res){
   
   User.findOne({uid: req.body.uid },function(err, user) { if (err) {
      res.send({status: "Error", err: err}) 
      } else {
      res.send({status: "OK", user});
     }
   });

});

// GET route to display info of a user
router.get("/profile", function(req, res) {
	res.render("/api/profile");
});

// GET & POST route to edit a user
router.route("/profile/:firebaseId/edit")
	.get(function(req, res) {
		res.render("edit");
	})
	.post(function(req, res) {

	});

// GET route for route on google map
// router.use("/route", require("./waypoints"));


module.exports = router;
