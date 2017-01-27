angular.module('AltimitForum')
.controller('catagoryCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
  var me = this;

  me.catagory_name = "";
  me.catagory_description = "";
  me.topic;

  $http({
        method : "GET",
        url : "/api/topics/?catagory_id=" + $routeParams.ID
    }).then(function mySucces(response) {
        buildTopics(response.data);
    }, function myError(response) {
        console.log(response);
    });

  function buildTopics(responseTopic){
    if(responseTopic.length > 0 && responseTopic[0].topic_name){
      me.topic = responseTopic;
    }

    me.catagory_name = responseTopic[0].catagory_name;
    me.catagory_description = responseTopic[0].catagory_description;
  }
}]);
