var app = angular.module('AltimitForum', ['ngRoute']);

angular.module('AltimitForum')
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'forumCtrl',
    controllerAs: 'Ctrl'
  })
  .otherwise({
    templateUrl: '/'
  });
});
