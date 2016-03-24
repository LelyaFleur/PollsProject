angular.module('VotesProject').controller('SurveyListController',
	function($scope, Survey, Socket){
		$scope.showForm = false;
		
		$scope.selectedSurvey = undefined;
		
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

    	$scope.getCountdown = function(survey) {
    		if(survey.state === 1) {
	      			var now = new Date().valueOf();
	      			console.log("now: "  + now);
	      			var end = new Date(survey.publishDate.endDate);
	      			var diff =  end.valueOf() - now;
	      			var countdown =  parseInt((diff/1000));
	      			console.log("countdown: " + countdown);
      		}
      		return countdown; 
    	};

    	


	      	
	});