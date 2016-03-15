angular.module("allInfoNearbyCtrls", [])
.controller('homeCtrl', ['$scope','travel', 'Authkey', '$http', function($scope, travel, Authkey, $http){
  $scope.businesses = [];
  $scope.query = {};
  $scope.getGeoLocation = {};
  $scope.LoggedIn = Authkey.getUserId() == "" ? false : true;
  $scope.search = function(){
    $scope.businesses  = [];
    travel.yelp.query({q: $scope.query}, function(list){
      console.log(list.businesses);
      $scope.businesses = list.businesses;
    });
  };
   $scope.getLocation = function() {
     if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
         console.log(position);
         $scope.getGeolocation.latitude = position.coords.latitude;
         $scope.getGeolocation.longitude = position.coords.longitude;
       });
     } else {
       console.log("Geolocation is not supported");
     }
   };
}])
.controller('registerCtrl', ['$scope','travel', 'Authkey','$location', '$http', function($scope, travel, Authkey, $http, $location){


    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      travel.auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = "User created.";
        Authkey.setUserId(userData.uid);
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

      travel.auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = "LoggedIn.";
        Authkey.setUserId(userData.uid);
        $location.path("/");
      }).catch(function(error) {
        $scope.error = error;
      });
    };
}])
