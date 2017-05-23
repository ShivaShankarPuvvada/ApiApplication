//Getting required modules and store them in corresponding variables.
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

//Creating a mongoose schema/blue print/field names.
    var excelSchema = new Schema({
	   Question: {type: String},
	   Option_A: {type: String},
	   Option_B: {type: String},
	   Option_C: {type: String},
	   Option_D: {type: String},
	   Correct_Option: {type: String}
    });

//Creating Mcq model for mongoose excelSchema which allow to do mongodb queries on node.
    var Mcq = mongoose.model('mcq', excelSchema);

//Exporting the Mcq model to use schema in other files.
    module.exports = Mcq;