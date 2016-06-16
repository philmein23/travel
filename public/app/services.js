angular.module('travelServices', ['ngResource'])
.factory('travel', ['$resource', "$firebaseAuth", function($resource, $firebaseAuth) {
	var ref = new Firebase("https://shining-torch-3315.firebaseio.com/");
  return { auth: $firebaseAuth(ref),
  		     yelp: $resource("/yelp" , {}, {
  			         querys: { method: 'GET', isArray: true }
  			   }),
           initial: $resource("/api/user/create"),
           authenticate: $resource("/api/user/auth")
  	  };
}])
.service('Authkey', function(){
  var authkey = "";
  var username = "";
  var id = "";
  var user = {};
  var loc = "";

  return {
  getUserData: function(){
    return user;
  },
  setUserData: function(User){
    user = User;
  },
  clearUserData: function(){
    user = {};
  },
  getAuthKey: function(){
        return authkey;
     },
  setAuthKey: function(key){
        authkey = key;
     },
  resetAuthKey: function(){
     	authkey = "";
     },
  setUserName: function(name){
		username = name;
	},
  getUserName: function(){
		return username;
	},
  clearUserName: function(){
		username = "";
	},
  setUserId: function(num){
		id = num;
	},
  getUserId: function(){
		return id;
	},
  clearUserId: function(){
		id = "";
	},
  setUserLocation: function(Loc){
    loc = Loc;
  },
  getUserLocation: function(){
    return loc;
  },
  clearUserLocation: function(){
    loc = "";
  }
};
});
