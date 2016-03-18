var mongoose = require("mongoose");
// ,
//     bcrypt = require('bcrypt'),
//     SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	username: { type: String, 
	 			      required: true
	 			   },
  uid: {   type: String,
    			 required: true,
           index: { unique: true } 

    		  },
  email:{  	type: String,
    			  required: true
    	  },
  location: {	type: String,
   				   required: true
   			},
  preferences: [String],
  favorites: [String],
  pastRoutes: [String]
});

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            username: ret.username,
            email: ret.email,
            location: ret.location
        };
        return returnJson;
    }
});

// UserSchema.pre('save', function(next){
// 	var user = this;

// 	if(!user.isModified("password")) {
// 		return next();
// 	}
// 	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
// 		if(err) {
// 			return next(err);
// 		}
// 		bcrypt.hash(user.password, salt, function(err, hash){
// 			if(err){
// 				return next(err);
// 			}
// 			user.password = hash;
// 			next();
// 		});
// 	});
// });

// UserSchema.methods.comparePassword = function(password, cb) {
// 	bcrypt.compare(password, this.password, function(err, isMatch){
// 		if(err){
// 			return cb(err);
// 		}
// 		cb(null, isMatch);
// 	});
// };
module.exports = mongoose.model('User', UserSchema);
