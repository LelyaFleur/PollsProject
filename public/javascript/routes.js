angular.module('VotesProject').config(['$routeProvider', function($routeProvider) {
  $routeProvider

    .when('/', {
      // redirect to the survey index
      redirectTo: '/surveys'
    })
    
    .when('/surveys', {
      templateUrl: 'templates/pages/surveys/index.html',
      controller: 'SurveyListController'
    })

    .when('/surveys/:id', {
  		templateUrl: 'templates/pages/surveys/show.html',
  		controller: 'SurveysShowController'
	  })

    .when('/admin', {
      templateUrl: 'templates/pages/admin/index.html',
      controller: 'SurveyResultsController'
    })

    .otherwise({redirectTo: '/'});
}]);

		