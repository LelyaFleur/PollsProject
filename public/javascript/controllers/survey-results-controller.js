angular.module('VotesProject').controller('SurveyResultsController',
	
	function($scope, Survey){
		$scope.showForm = false;
		$scope.selectedSurvey = undefined;		
		
	    // when landing on the page, get all surveys and show them
	    Survey.allSurveysWithResults()
	        .success(function(data) {
	            $scope.surveys = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });

	    $scope.removeSurvey = function(survey){

	    	Survey.delete(survey._id)
	        .success(function(data) {
	            $scope.surveys = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });   
	    }; 

	    $scope.selectSurvey = function(survey) {
		    $scope.selectedSurvey = survey;
    	};    	   
	});