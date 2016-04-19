/**
*  Main app file
*/
'use strict';

//dependencies

var express  = require ('express');
var mongoose = require ('mongoose');
var config   = require ('./config/enviroment');

//connect to MongoDB
//mongodb://localhost/movieTracking
mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
mongoose.connection.on('error', function(err){
  console.log('MongoDB connection error: ' + err);
  process.exit(-1);
});

//setup server
var app = express();
require ('./config/express')(app);
require ('./routes') (app);

app.listen(config.port);
console.log('Server listening on port: ' + config.port);
module.exports = app;
