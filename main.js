var express = require('express'),
app = express();



app.use('/api', require('./api.js'));
app.use(express.static('./dist'))

var server = app.listen(8080);
