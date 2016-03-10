function(){
'use strict';
	angular.module('citizenParticipationProject', [])
	.controller('SurveyListCtrl', function($scope, $http){
		$scope.formData = {};
		$scope.showForm = false;

	    // when landing on the page, get all surveys and show them
	    $http.get('/api/surveys')
	        .success(function(data) {
	            $scope.surveys = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	})

	.directive('surveyPreview', function(){
	    return {
	      restrict: 'E',
	      templateUrl: 'partials/survey-preview.html',
	      replace: true
	    }
	})

	.directive('newSurvey', function($http){
		return{
			restrict: 'E',
			templateUrl: 'partials/new-survey.html',
			controller: function(){
				
				this.survey = { title: '',
            					questions: [{text: '',
            			                    choices: [{text:''}]}
          					   ]};  

          		this.addQuestion = function(){
          			this.survey.questions.push({text: '', choices: [{text:''}]});
          		};	

          		this.addChoice = function(choices){
          			choices.push({text:''});
          		}	

				this.addSurvey = function(surveys){
					surveys.push(this.survey);

					$http.post('/api/surveys', this.survey)
	            		.success(function(data) {
	              			$scope.formData = {}; // clear the form so our user is ready to enter another
	                		$scope.surveys = data;
	                		console.log(data);
            			})
            			.error(function(data) {
              			  console.log('Error: ' + data);
           			});

					this.survey = { title: '',
            						questions: [{text: '',
            			                         choices: [{text:''}]}
          					 	  ]}; 
				};
			},
			controllerAs: 'newSurveyCtrl'
		}
	});

})();



/* 
app.controller('PollNewCtrl', function PollNewCtrl($scope, $location, Poll) {
          $scope.poll = {
            question: '',
            choices: [ { text: '' }, { text: '' }, { text: '' }]
          };  
          $scope.addChoice = function() {
            $scope.poll.choices.push({ text: '' });
          };
          $scope.createPoll = function() {
            var poll = $scope.poll;
            if(poll.question.length > 0) {
              var choiceCount = 0;
              for(var i = 0, ln = poll.choices.length; i < ln; i++) {
                var choice = poll.choices[i];        
                if(choice.text.length > 0) {
                  choiceCount++;
                }
              }    
              if(choiceCount > 1) {
                var newPoll = new Poll(poll);       
                newPoll.$save(function(p, resp) {
                  if(!p.error) { 
                    $location.path('polls');
                  } else {
                    alert('Could not create poll');
                  }
                });
              } else {
                alert('You must enter at least two choices');
              }
            } else {
              alert('You must enter a question');
            }
          };
        });

  */