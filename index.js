var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var ejsLayout = require("express-ejs-layouts");
var api = require("./controllers/api");
var mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/travel", function(err){
	if(err){
		throw err;
	}
	console.log("Connection Sucess!");
});


app.use("/api", api);
app.use("/yelp", api);


app.get("/", function(req, res){
	// var t =  User.findOne({ username: 'ames22' });
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);
