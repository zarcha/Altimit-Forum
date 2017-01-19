var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport'),
localStrategy = require('passport-local').Strategy;

module.exports = function(con) {

  con.connect(function(err){
    if(err){
      console.log('Error connecting to DB');
      return;
    }

    console.log('Connection established');
  });

  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  router.get('/user', function(req, res){
    console.log(req.session.passport.user.username);
    res.send(req.session.passport.user.username);
  });

  router.get('/forums', function(req, res){
    console.log(req.session.user);
    con.query('SELECT c.id AS catagory_id, c.catagory_name, c.catagory_description, c.topic_count, c.topic_last_update, c.topic_last_user, f.id AS forum_id, f.forum_name, f.forum_description FROM catagories AS c LEFT JOIN forums AS f ON c.forum_id = f.id', function(err,rows){
      if(err) throw err;

      response = rows;
      res.end(JSON.stringify(response));
    });
  });

  router.get('/topics', function(req, res){
    var responseToSend;

    con.query('SELECT t.topic_name, t.topic_description, t.post_count, t.post_last_update, c.catagory_name, un1.username AS creator, un2.username AS last_poster FROM topics AS t LEFT JOIN username AS un1 ON t.user_id = un1.id LEFT JOIN username AS un2 ON t.post_last_user = un2.id LEFT JOIN catagories AS c ON t.catagory_id = c.id WHERE t.catagory_id = ' + req.query.catagory_id, function(err,rows){
      if(err) throw err;

      console.log(rows);
      responseToSend = rows;
      if(responseToSend.length){
        res.end(JSON.stringify(responseToSend));
      }else{
        con.query('SELECT catagory_name FROM catagories WHERE id = ' + req.query.catagory_id, function(err2,rows2){
          if(err2) throw err2;
          console.log(rows2);
          responseToSend = rows2;
          res.end(JSON.stringify(responseToSend));
        });
      }
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

  return router;
}
