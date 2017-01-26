angular.module('Services', [])
.service('authService', ['$http', '$q', '$location', function($http, $q, $location){

  var me = this;

  me.userData = null;

  me.getUser = getUser;
  me.logout = logout;

  getUser();

  function getUser(){
    var req = {
      method: 'GET',
      url: '/api/user',
      headers: {
        'Content-Type': undefined
      }
    }

    return $http(req)
    .then(function(response){
      if(response.data !== 'error'){
        me.userData = response.data;
      }
    })
    .catch(function(err){
      console.log(err);
    });
  };

  function logout(){
    var req = {
      method: 'GET',
      url: '/api/logout',
      headers: {
        'Content-Type': undefined
      }
    }

    return $http(req)
    .then(function(response){
      if(response.data === 'success'){
        me.userData = null;
      }
    })
    .catch(function(err){
      console.log(err);
    });
  };
}]);
