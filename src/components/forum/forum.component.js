angular.module('AltimitForum')
.controller('forumCtrl', ['$scope', '$http', function($scope, $http){
  var me = this;

  me.forums = {};

  $http({
        method : "GET",
        url : "/api/forums"
    }).then(function mySucces(response) {
        buildForums(response.data);
    }, function myError(response) {
        console.log(response);
    });

  function buildForums(responseForum){
    var temp = {};
    console.log(responseForum);

    responseForum.forEach(function(forum){
      if(!me.forums[forum.id]){
        me.forums[forum.id] = {
          forum_name: forum.forum_name,
          forum_description: forum.forum_description,
          catagories: [{
            catagory_id: forum.catagory_id,
            catagory_name: forum.catagory_name,
            topic_count: forum.topic_count,
            topic_last_user: forum.topic_last_user,
            topic_last_update: forum.topic_last_update
          }]
        }
      }else {
        temp = {
          catagory_id: forum.catagory_id,
          catagory_name: forum.catagory_name,
          topic_count: forum.topic_count,
          topic_last_user: forum.topic_last_user,
          topic_last_update: forum.topic_last_update
        };
        me.forums[forum.id].catagories.push(temp);
      }
    });

    console.log(me.forums);
  };
}]);
