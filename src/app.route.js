angular.module('AltimitForum')
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/forum.html',
    controller: 'forumCtrl',
    controllerAs: 'Ctrl'
  })
  .when('/catagory/:ID', {
    templateUrl: 'views/catagory.html',
    controller: 'catagoryCtrl',
    controllerAs: 'Ctrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginCtrl',
    controllerAs: 'Ctrl'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'registerCtrl',
    controllerAs: 'Ctrl'
  })
  .otherwise({
    templateUrl: '/'
  });
});
