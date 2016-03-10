angular.module('VotesProject').directive('questionValidity', function(){
    return {
        restrict: 'A',
        require: 'ngModel',
       /* scope:{
        	questionValidity : '='
        },*/ 

        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
            	var valueArr = ngModelValue.choices.map(function(item){ return item.text });
				var isDuplicate = valueArr.some(function(item, idx){ 
					 return valueArr.indexOf(item) != idx 
				});

            	console.log("I'm here:" + ngModelValue.text);
            	if(scope.questionValidity.choices.length > 1){
            		 ctrl.$setValidity('questionValidator', true);
            		 console.log("number of choices: " + ngModelValue.choices.length);
            	}else{
            		ctrl.$setValidity('questionValidator', false);
            		console.log("number of choices: " + ngModelValue.choices.length);
            	}

            	if(isDuplicate){
            		 ctrl.$setValidity('duplicateValidator', false);            		 
            	}else{
            		ctrl.$setValidity('duplicateValidator', true);
            	}
            	console.log("I'm here");
	            
	            return ngModelValue;
       	 	}
       	 	
        	ctrl.$parsers.push(customValidator); 
		}
	};
});