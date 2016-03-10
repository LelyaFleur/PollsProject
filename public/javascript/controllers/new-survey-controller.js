angular.module('VotesProject').controller('NewSurveyController', ['Survey', '$scope', 

  function(Survey, $scope){       
        $scope.newSurvey = { title: '',
                      questions: [{text: '',
                                      choices: [{text:'', votes: 0}]}
                       ],
                       publishDate: {startDate: new Date(), endDate: new Date()}
                     };


        $scope.addQuestion = function(){
          $scope.newSurvey.questions.push({text: '', choices: [{text:'',votes: 0}]});
          console.log("show form:" + $scope.showForm);
        }; 

        $scope.removeQuestion = function(question){
          $scope.newSurvey.questions.some(function(item,i){
            if(item === question){
              $scope.newSurvey.questions.splice(i, 1);
              return true;
            }
          });
        }; 

        $scope.addChoice = function(choices){                
          choices.push({text:'', votes: 0});                
        }; 

        $scope.removeChoice = function(answer, choices){
          choices.some(function(item,i){
            if(item === answer){
              choices.splice(i, 1);
              return true;
            }
          });
        };

        $scope.addSurvey = function(surveys){          

          surveys.push($scope.newSurvey);
          var choices;
          for(var question in $scope.newSurvey.questions) {
            choices = $scope.newSurvey.questions[question].choices;
            choices.some(function(item,i){
              if(item.text === ''){
                choices.splice(i, 1);
                return true;
              }
            });
          };

          Survey.create($scope.newSurvey)          
                  .success(function(data) {
                    console.log("newSurvey:" + $scope.newSurvey.publishDate.startDate);
                      $scope.newSurvey = { title: '',
                        questions: [{text: '',
                                           choices: [{text:'', votes: 0}]}
                      ],
                         publishDate: {startDate: new Date(), endDate: new Date()}
                  }; 
                      $scope.surveys = data;
                      $scope.showForm = false;                     
                      
                      console.log("Creating a survey:" + data);
                     
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                });
        };
}]);
    