// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var Survey = require('./models/survey');
    
    // configuration =================

    mongoose.connect('mongodb://localhost:27017/test');   // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all surveys
    app.get('/api/surveys', function(req, res) {

        // use mongoose to get all surveys in the database
        Survey.find(null, {submissions: 0, votes: 0}, function(err, surveys) {
            console.log(surveys);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(surveys); // return all surveys in JSON format
        });
    });

    // get all surveys with votes
    app.get('/api/admin', function(req, res) {

        // use mongoose to get all surveys in the database
        Survey.find(null, {submissions: 0}, function(err, surveys) {
            console.log(surveys);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(surveys); // return all surveys in JSON format
        });
    });

    // get survey by id
    app.get('/api/surveys/:id', function(req, res) {
        var surveyId = req.params.id;
        Survey.findById(surveyId, {submissions: 0, votes:0}, function(err, survey) {
          if (err) 
            res.send(err)

            // show the one survey
            console.log(survey);
            res.json(survey);
        });

    });

    //find if a person with a current dni has participated in a current survey
    app.get('/api/surveys/:id/:dni', function(req, res) {
        var surveyId = req.params.id;
        var surveyDNI = req.params.dni;
        console.log("Survey id is:" + surveyId);
        Survey.find({_id: surveyId, submissions: {$elemMatch: {dni : surveyDNI}}}, function(err, survey) {
          
          if (err) res.send(err);
          if(survey.length > 0){
            console.log(survey);
            res.send(true);
          }else{
            console.log(survey);
            res.send(false);
          }
            
        });

    });

    // update survey 
    

    app.put('/api/surveys/:id/:dni', function(req, res) {
        console.log(req.body);
        var id = req.params.id;
        var dni = req.params.dni;
        var submissions = req.body;
        Survey.update({_id: id}, {'$addToSet' : {'submissions': {'dni': dni}}}).exec(function( err, data ){
            if(err) console.log(err);
            console.log("update: " + data);
            if(data){
               Survey.findOne({ _id: id }, function (err, doc){ 
                   if(err) console.log(err);
                   console.log("doc:" + doc);
                   for(var submission in submissions){
                        var qId = submissions[submission].questionId;
                        var aId = submissions[submission].answerId;
                        console.log("questionId." + qId);
                        console.log("choiceId." + aId);
                        doc.questions.id(qId).choices.id(aId).votes += 1;
                    };
                    doc.save();
                }); 
                res.json({ message: 'Updated!' });
            }else{
                res.json({ message: 'Did not update!' });
            }
        });   
             
      
        
       /* */
         /* for(var i in submissions){
            Survey.update({_id: id, questions: {$elemMatch: {_id : submissions[i].questionId}}, choices: {$elemMatch: {_id : submissions[i].answerId}}  , 'choices._id' : submissions[i].answerId},
                   {'$inc': {'questions.$.choices.$.votes': 1}}{'$set': {'questions.$.text' : "blabla"}},
                    function(err, data) { 
                        if(err) console.log(err);

                        console.log(data);
                     }
            );
        }
       /* Meetings.update(
           { _id: meetingId },
           { $addToSet: { messages: 'hey there' } }
)*/
        
        
    });

    // create survey 
    app.post('/api/surveys', function(req, res) {
        
        var survey = new Survey(req.body);      // create a new instance of the Survey model
          // 
        console.log(req.body);

        // save the survey and check for errors
        survey.save(function(err) {
            if (err)
                res.send(err);
            
            Survey.find(function(err, surveys) {
                if (err)
                    res.send(err)
                res.json(surveys);
            });
            //res.json({ message: 'Survey created!' });
        });

    });

    // delete a survey
    app.delete('/api/surveys/:id', function(req, res) {
        Survey.remove({
            _id : req.params.id
        }, function(err, survey) {
            if (err)
                res.send(err);
           // res.json({ message: 'Successfully deleted' });
            // get and return all the surveys after you delete another
            Survey.find(function(err, surveys) {
                if (err)
                    res.send(err)
                res.json(surveys);
            });
        });
    });

     // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");