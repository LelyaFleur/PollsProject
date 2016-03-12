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

    	$scope.getClass = function(survey) {
    		var  className;
    		switch (survey.state){
    			case 0: 
    				className = "list-group-item-danger";
    				break;
				case 1: 
					className = "list-group-item-warning";
					break;
				case 2:
					className = "list-group-item-info";
					break;
				default:
        			className = "list-group-item-info";
    		}
		    return className;
    	};    	   
	});