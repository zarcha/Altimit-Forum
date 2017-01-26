var express = require('express'),
app = express(),
mysql = require('mysql'),
passport = require('passport'),
localStrategy = require('passport-local').Strategy;

var con = mysql.createConnection({
  host: 'altimit-servers.com',
  user: 'zarch',
  password: 'Kimberly2',
  database: 'altimit_db'
});
app.use(express.static('./dist'))

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./api.js')(con) );

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new localStrategy(
  function(username, password, done) {
    con.query(`SELECT un.username, us.password FROM users AS us LEFT JOIN username AS un ON us.id = un.id WHERE un.username = '${username}'`, function(err, rows){
      if (err) { return done("stuff"); }
      var user;

      if(rows && rows.length == 1) {
        user = {
          username: rows[0].username,
          password: rows[0].password
        };
      };

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!validPassword(user, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }


      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(id, cb) {
  con.query(`SELECT un.username, us.password FROM users AS us LEFT JOIN username AS un ON us.id = un.id WHERE un.username = '${id}'`, function(err, rows){
    if (err) { return done("stuff"); }
    var user;

    if(rows && rows.length == 1) {
      user = {
        username: rows[0].username,
        password: rows[0].password
      };
    };

    cb(null, user);
  });
});

function validPassword(user, password){
  return user.password === password;
}

var server = app.listen(8081);
