//NODEJS

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser= require('cookie-parser');
var expressSesion = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSesion});
var mongoose = require('mongoose');

//include models
require('./services/models/objects_model.js');

//set db connection
var conn = mongoose.connect('mongodb://maribethDBadmin:password@localhost:27017/maribeth');


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');


    next();
}

//init express
var app = express();

app.use(allowCrossDomain);    
// app.engine('.html', require('ejs').__express);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSesion({
	secret: 'SECRET',
	cookie: {maxAge: 60*60*1000},
	store: new mongoStore({
		db: mongoose.connection.db,
		collection: 'sessions'
	})
}));
app.use(allowCrossDomain);
    
//include routes
require('./services/routes/auth_routes')(app);
require('./services/routes/manager_routes')(app);
require('./services/routes/crew_routes')(app);
require('./services/routes/user_routes')(app);

app.listen(8080);
