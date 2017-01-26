angular.module('AltimitForum')
.directive('navBar', ['authService', function(authService){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '../views/nav.html',
    link: function(scope){
      scope.authService = authService;
    }
  };
}]);
