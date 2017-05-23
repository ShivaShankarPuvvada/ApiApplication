//getting required modules and store them in corresponding variables.
	var express = require('express');
	var router = express.Router();
	var fs = require('fs');
	var fastCsv = require('fast-csv');
	var Mcq = require('../models/excel');

//setting up the api.

//Sending get request with file name.
	router.get('/home/:file', function(req, res, next){

		//setting up the path of the required files; where req.params.file takes filename entered in url.
		var path = './upload/' + req.params.file + '.csv';

		//Opening the file as a readable stream
		var readStream = fs.createReadStream(path);
		
		//taking the data and send it to client. Where '.on()' is listener and '.pipe()' is a medium.
		readStream.pipe(fastCsv)
		.on('data', function(data){
			res.send(data);
		});

	});

//setting up post request with file name to save a file in mongodb.
	router.post('/post/:file', function(req, res, next){

		//setting up the path of the required files; where req.params.file takes filename entered in url.
		var path = './upload/' + req.params.file + '.csv';

		//checking if the file exists
		fs.exists(path, function(exists) {
	    
	    if (exists) {
        
        var stream = fs.createReadStream(path);

        //declaring the headers/column names and mapping it for schema.
        csv.fromStream(stream, {headers : [
    								    	'Question',
    								    	'Option_A',
        									'Option_B',
        									'Option_C',
        									'Option_D',
        									'Correct_Option'
        ]}).on("data", function(data){
            
            //creating an instance to read each row.
            var newMcq = new Mcq();
            
            newMcq.Question = data['Question'];
            newMcq.Option_A = data['Option_A'];
            newMcq.Option_B = data['Option_B'];
            newMcq.Option_C = data['Option_C'];
            newMcq.Option_D = data['Option_D'];
            newMcq.Correct_Option = data['Correct_Option'];

        });

		//saving new row in mongodb
    	newMcq.save(function (err, data) {
      
      	if(err) {
      		console.log(err);
    	}
      
      	else {
      	console.log( req.parms.file + '.csv sucessfully saved in mongodb');
  		}
       
       });

	}
	});
	});


//setting up post request with file name to save a file in mongodb.
	router.put('/put/:file', function(req, res, next){

	//updating existing doccument in mongodb using Mcq model.
	Mcq.findOneAndUpdate(
		{Option_A: 'No'},
		{$set:{Option_A:'In future'}},
		{new: true}, function(err, doc){
		if(err){
			res.send('Something is wrong!');
			}
		console.log(doc);
		});

		//setting up the path of the required files; where req.params.file takes filename entered in url.
		var path = './upload/' + req.params.file + '.csv';

		//checking if the file exists
		fs.exists(path, function(exists) {
	    
	    if (exists) {
        
        var stream = fs.createReadStream(path);

        //declaring the headers/column names and mapping it for schema.
        csv.fromStream(stream, {headers : [
    								    	'Question',
    								    	'Option_A',
        									'Option_B',
        									'Option_C',
        									'Option_D',
        									'Correct_Option'
        ]}).on("data", function(data){
            
            //creating an instance to read each row.
            var newMcq = new Mcq();
            
            newMcq.Question = data['Question'];
            newMcq.Option_A = data['Option_A'];
            newMcq.Option_B = data['Option_B'];
            newMcq.Option_C = data['Option_C'];
            newMcq.Option_D = data['Option_D'];
            newMcq.Correct_Option = data['Correct_Option'];

        });

		//saving new row in mongodb
    	newMcq.save(function (err, data) {
      
      	if(err) {
      		console.log(err);
    	}
      
      	else {
      	console.log( req.parms.file + '.csv sucessfully saved in mongodb');
  		}
       
       });

	}
	});
	});


//setting up the delete request.
	router.delete('/delete/:file', function(req, res, next){

		var path = './upload/' + req.params.file + '.csv';

		fs.exists(path, function(exists) {
	    
	    if (exists) {
	    	//to delete the file
			fs.unlink(path, function(err){
				if(err){
					res.send(req.params.file + '.csv file not deleted.');
						}
				res.send(req.params.file + '.csv sucessfully deleted.')
			});
		}
		else ('The specified path/filename does not exist.')
		});

		/* or if you want to delete the data in mongodb 
		//to delete created collection in mongodb through mongoose model
		mongoose.connection.collections.mcqs.drop(function(){
			res.send('Collection sucessfully deleted');
		});
		*/

	});	



//exporting the above code through a router variable.
	module.exports = router;