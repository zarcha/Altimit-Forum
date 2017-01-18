var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'altimit-servers.com',
  user: 'zarch',
  password: 'Kimberly2',
  database: 'altimit_db'
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to DB');
    return;
  }

  console.log('Connection established');
});

router.get('/forums', function(req, res){
  con.query('SELECT c.id, c.catagory_name, c.catagory_description, c.topic_count, c.topic_last_update, c.topic_last_user, f.id, f.forum_name, f.forum_description FROM catagories AS c LEFT JOIN forums AS f ON c.forum_id = f.id', function(err,rows){
    if(err) throw err;

    response = rows;
    res.end(JSON.stringify(response));
  });
});

router.get('/topics', function(req, res){
  con.query('SELECT t.topic_name, t.topic_description, t.post_count, t.post_last_update, un1.username AS creator, un2.username AS last_poster FROM topics AS t LEFT JOIN username AS un1 ON t.user_id = un1.id LEFT JOIN username AS un2 ON t.post_last_user = un2.id LEFT JOIN catagories AS c ON t.catagory_id = c.id WHERE t.id = ' + req.que.topic_id, function(err,rows){
    if(err) throw err;

    response = rows;
    res.end(JSON.stringify(response));
  });
});

//Get all posts including the posts information and its creators infomation
router.get('/posts', function(req, res){
  con.query('SELECT p.content, p.date, un.username, t.name FROM username AS un, topics AS t, posts AS p WHERE un.id = p.user_id and t.id = p.topic_id and p.topic_id = ' + req.query.topic_id, function(err,rows){
    if(err) throw err;

    response = rows;
    res.end(JSON.stringify(response));
  });
});

module.exports = router;
