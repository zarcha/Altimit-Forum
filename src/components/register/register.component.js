angular.module('AltimitForum')
.controller('registerCtrl', ['$scope', '$http','$location', function($scope, $http, $location) {
  var me = this;

  me.username = '';
  me.email = '';
  me.password = '';

  me.errorMessage = '';

  me.register = register;

  function register(){
    var req = {
      method: 'POST',
      url: '/api/register',
      headers: {
        'Content-Type': undefined
      },
      params: {
        username: me.username,
        password: me.password,
        email: me.email
      }
    }

    $http(req).then(function(response){
      if(response.data === "success"){
        me.errorMessage = '';
        $location.path('/');
      }else{
        me.errorMessage = response.data;
      }

    },
    function(response){
      me.errorMessage = 'An error occured during account creation. Please try again.'
      console.log('error', response);
    });

  };
}]);
