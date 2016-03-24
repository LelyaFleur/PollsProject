angular.module('VotesProject').controller('SurveyResultsController',
	
	function($scope, Survey, Socket){
		$scope.showForm = false;
		$scope.selectedSurvey = undefined;		
		
	    // when landing on the page, get all surveys and show them
	    Survey.allSurveysWithResults()
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
    				className = "list-group-item-warning";
    				break;
				case 1: 
					className = "list-group-item-info";
					break;
				case 2:
					className = "list-group-item-success";
					break;
				default:
        			className = "list-group-item-success";
    		}
		    return className;
    	};    	   
	});