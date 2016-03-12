
var mongoose = require('mongoose');
//var voteSchema = new mongoose.Schema({ ip: 'String' });
var choiceSchema = new mongoose.Schema({ 
	text: String,
	votes: Number
});

var questionSchema = new mongoose.Schema({
	text: { type: String, required: true },
 	choices: [choiceSchema]
});

var submissionSchema = new mongoose.Schema({
	_id:false,
	dni: String
});

var SurveySchema = new mongoose.Schema({
	title: String,
	questions: [questionSchema],
	submissions: [submissionSchema],
	publishDate: { startDate: Date, endDate: Date },
	state: Number

});

// return the model

module.exports = mongoose.model('Survey', SurveySchema);

