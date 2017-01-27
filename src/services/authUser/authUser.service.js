angular.module('Services', [])
.service('authService', ['$http', '$q', '$location', function($http, $q, $location){

  var me = this;

  me.userData = null;

  me.getUser = getUser;
  me.login = login;
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

  function login(username, password){
    var req = {
      method: 'POST',
      url: '/api/login',
      headers: {
        'Content-Type': undefined
      },
      params: {
        username: username,
        password: password
      }
    }

    return $http(req).then(function(response){
      me.errorMessage = '';
    },
    function(response){
      me.errorMessage = 'An error occured during login. Please try again.'
      console.log('error', response);
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
