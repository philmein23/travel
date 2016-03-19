angular.module("allInfoNearbyCtrls", [])
.controller('homeCtrl', ['$scope','travel', 'Authkey', '$http', function($scope, travel, Authkey, $http){
  $scope.businesses = [];
  $scope.savedRoutes = [];
  $scope.query = {};

  $scope.LoggedIn = Authkey.getUserId() == "" ? false : true;
  $scope.search = function(){
    $scope.businesses  = [];
    travel.yelp.query({q:$scope.savedRoutes}, function(list){
      console.log(list.businesses);
      $scope.businesses = list.businesses;
    });
  };
   $scope.getLocation = function() {
     if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
         console.log(position);
         $scope.query.latitude = position.coords.latitude;
         $scope.query.longitude = position.coords.longitude;
       });
     } else {
       console.log("Geolocation is not supported");
     }
   };
   $scope.saveFavorites = function() {
     $scope.savedRoutes.push($scope.query);
     console.log($scope.savedRoutes);
   };
}])
.controller('profileCtrl', ['$scope','travel', 'Authkey','$location', '$http', function($scope, travel, Authkey, $location, $http){
  $scope.name = Authkey.getUserName();
  $scope.location = Authkey.getUserLocation();
  console.log(Authkey.getUserData());


}])

.controller('initialCtrl', ['$scope','travel', 'Authkey','$location', '$http', function($scope, travel, Authkey, $location, $http){
  // if(Authkey.getUserData().email == null){
  //   $location.path("/");
  // }
  $scope.user = {};
  $scope.user.uid = Authkey.getUserId();
  $scope.user.email = Authkey.getUserData().password.email;
  $scope.message = "";
  $scope.setUserPref = function(){
  travel.initial.save([], $scope.user, function(res){
    if(res.status == "OK"){
    Authkey.setUserName(res.user.username);
    Authkey.setAuthKey(res.user.id);
    Authkey.setUserLocation(res.user.location);
    $scope.message = Authkey.getUserName() + " has successfully registered."
    $location.path('/profile');
    } else {
      $scope.message = res.message;
    }

    });
  };
}])
.controller('registerCtrl', ['$scope','travel', 'Authkey','$location', '$http', function($scope, travel, Authkey, $location, $http){


    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      travel.auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = "User created.";
     travel.auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        Authkey.setUserId(userData.uid);
        Authkey.setUserData(userData);
        console.log(userData);
        $location.path("/initial");
      });

      }).catch(function(error) {
        $scope.error = error;
      });
    };

    // $scope.removeUser = function() {
    //   $scope.message = null;
    //   $scope.error = null;

    //   travel.auth.$removeUser({
    //     email: $scope.email,
    //     password: $scope.password
    //   }).then(function() {
    //     $scope.message = "User removed";
    //   }).catch(function(error) {
    //     $scope.error = error;
    //   });
    // };

}])
.controller('loginCtrl', ['$scope', 'travel', 'Authkey','$location', '$http', function($scope, travel, Authkey, $location, $http){

    $scope.login = function() {
      $scope.message = null;
      $scope.error = null;
      $scope.user = {};
      travel.auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = "LoggedIn.";
        Authkey.setUserId(userData.uid);
        Authkey.setUserData(userData);
        $scope.user.uid = userData.uid;

         travel.authenticate.save([], $scope.user, function(res){
          if(res.status == "OK"){
          Authkey.setUserName(res.user.username);
          Authkey.setAuthKey(res.user.id);
          Authkey.setUserLocation(res.user.location);
          $location.path('/profile');
          }
      });
    }).catch(function(error) {
        $scope.error = error;
      });;
    };
}])
.controller("waypointsCtrl", [function() {

}])
