//getting required modules and store them in corresponding variables.
	var express = require('express');
	var mongoose = require('mongoose');
	var fs = require('fs');
	var router = require('./routes/api');

//Set up express.
	var app = express();

//connection to mongodb database sheets and setting up mongoose promise.
	var db = mongoose.createConnection('mongodb://localhost/sheets');
	db.once('open', function(){
		console('connected to mongodb');
		done();
	}).on('error', function(error){
		console.log('MongoDB connection error:', error);
	});

//setting up middleware.

	//initialize routes.
	app.use(require(router));

	//error handling for semantic errors
	app.use(function(err, req, res, next){
	res.status(422).send({error: err.message});
	});


//Listening to the port.

	//process.env.port sets the default port for hosting websites.
	app.listen(process.env.port || 4000, function(err){
	console.log('Now listening for requests on 4000');
	});