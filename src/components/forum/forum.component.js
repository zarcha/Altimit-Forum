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

    responseForum.forEach(function(forum){
      if(!me.forums[forum.forum_id]){
        me.forums[forum.forum_id] = {
          forum_name: forum.forum_name,
          forum_description: forum.forum_description,
          catagories: [{
            catagory_id: forum.catagory_id,
            catagory_name: forum.catagory_name,
            catagory_description: forum.catagory_description,
            topic_count: forum.topic_count,
            topic_last_user: forum.user,
            topic_last_update: forum.topic_last_update ? new Date(forum.topic_last_update) : null
          }]
        }
      }else {
        temp = {
          catagory_id: forum.catagory_id,
          catagory_name: forum.catagory_name,
          catagory_description: forum.catagory_description,
          topic_count: forum.topic_count,
          topic_last_user: forum.user,
          topic_last_update: forum.topic_last_update ? new Date(forum.topic_last_update) : null
        };
        me.forums[forum.forum_id].catagories.push(temp);
      }
    });

    console.log(me.forums);
  };
}]);
