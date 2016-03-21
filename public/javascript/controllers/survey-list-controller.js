angular.module('VotesProject').controller('SurveyListController',
	function($scope, Survey, Socket){
		$scope.showForm = false;
		
		$scope.selectedSurvey = undefined
		
	    // when landing on the page, get all surveys and show them
	    Survey.all()
	        .success(function(data) {
	            $scope.surveys = data;
	            console.log(data);
	            $scope.surveys.forEach(function(survey){
	            	Socket.on('status', function (data) {
  						console.log("title: " + survey.title + "  change state:" + survey.state);
  						if(survey._id === data.id)
    					survey.state = data.status; 
  					}); 
	            });
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });

	    $scope.selectSurvey = function(survey) {
		    $scope.selectedSurvey = survey;
    	};
	});