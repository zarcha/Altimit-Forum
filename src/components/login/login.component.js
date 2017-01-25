angular.module('AltimitForum')
.controller('loginCtrl', ['$scope', '$http', function($scope, $http){
  var me = this;
  me.getUser = getUser;

  me.username = '';
  me.password = '';

  me.errorMessage = '';

  me.login = function(){
    var req = {
      method: 'POST',
      url: '/api/login',
      headers: {
        'Content-Type': undefined
      },
      params: {
        username: me.username,
        password: me.password
      }
    }

    $http(req).then(function(response){
      me.errorMessage = '';
    },
    function(response){
      me.errorMessage = 'An error occured during login. Please try again.'
      console.log('error', response);
    }).then(getUser).then(function(response){
      console.log(response);
    });
  }

  function getUser(){
    var req = {
      method: 'GET',
      url: '/api/user',
      headers: {
        'Content-Type': undefined
      }
    }

    return $http(req);
  }
}]);
