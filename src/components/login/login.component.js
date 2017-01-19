angular.module('AltimitForum')
.controller('loginCtrl', ['$scope', '$http', function($scope, $http){
  var me = this;
  me.getUser = getUser;

  me.login = function(){
    var req = {
      method: 'POST',
      url: '/api/login',
      headers: {
        'Content-Type': undefined
      },
      params: {
        username: 'testUser',
        password: 'TestPass'
      }
    }

    $http(req).then(function(response){

    },
    function(response){
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
