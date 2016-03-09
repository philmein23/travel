var app = angular.module('travelapp', ['ngRoute', 'allInfoNearbyCtrls', 'travelServices', 'firebase']);

app.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $location.path("/home");
  }
});
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/index.html',
    controller: 'homeCtrl',
    resolve: {
       "currentAuth": ["travel", function(travel) {
        return travel.auth.$waitForAuth();
    }]
  }
  })
  // For later when views require authentication
  // resolve: {
  //   // controller will not be loaded until $requireAuth resolves
  //   // Auth refers to our $firebaseAuth wrapper in the example above
  //   "currentAuth": ["Auth", function(Auth) {
  //     // $requireAuth returns a promise so the resolve waits for it to complete
  //     // If the promise is rejected, it will throw a $stateChangeError (see above)
  //     return Auth.$requireAuth();
  //   }]
  // }

  .when('/register', {
    templateUrl: 'app/views/register.html',
    controller: 'registerCtrl'
  })
  .when('/login', {
    templateUrl: 'app/views/login.html',
    controller: 'loginCtrl'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}]);
