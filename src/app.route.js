var app = angular.module('AltimitForum', ['ngRoute']);

angular.module('AltimitForum')
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/forum.html',
    controller: 'forumCtrl',
    controllerAs: 'Ctrl'
  })
  .otherwise({
    templateUrl: '/'
  });
});
