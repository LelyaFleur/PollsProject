angular.module('VotesProject').controller('SurveyListController',
	function($scope, Survey){
		$scope.showForm = false;
		
		$scope.selectedSurvey = undefined
		
	    // when landing on the page, get all surveys and show them
	    Survey.all()
	        .success(function(data) {
	            $scope.surveys = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });

	    $scope.selectSurvey = function(survey) {
		    $scope.selectedSurvey = survey;
    	}; 



	});