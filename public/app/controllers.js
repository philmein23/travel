angular.module("allInfoNearbyCtrls", [])
.controller('homeCtrl', ['$scope', 'currentAuth','travel', 'Authkey', '$http', function($scope, travel, Authkey, $http){
}])
.controller('registerCtrl', ['$scope', 'currentAuth','travel', 'Authkey', '$http', function($scope, travel, Authkey, $http){


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
.controller('loginCtrl', ['$scope', 'travel', 'Authkey', '$http', function($scope, travel, Authkey, $http){

    $scope.login = function() {
      $scope.message = null;
      $scope.error = null;

      travel.auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = "LoggedIn.";
        Authkey.setUserId(userData.uid);
      }).catch(function(error) {
        $scope.error = error;
      });
    };
}])
