angular.module('AltimitForum')
.controller('loginCtrl', ['$scope', '$http', '$location','authService', function($scope, $http, $location, authService){
  var me = this;

  me.username = '';
  me.password = '';

  me.errorMessage = '';

  //Functions
  me.login = login;
  me.checkLogin = checkLogin;

  //Call this so that we can redirect if they are already logged in
  me.checkLogin();
  function checkLogin(){
    authService.getUser().then(function(){
      if(authService.userData){
        $location.path('/');
      }
    });
  }

  //Login through API/passport
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

    $http(req).then(function(response){
      me.errorMessage = '';
      checkLogin();
    },
    function(response){
      me.errorMessage = 'An error occured during login. Please try again.'
      console.log('error', response);
    });
  }
}]);
