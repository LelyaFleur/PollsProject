angular.module('VotesProject').controller('DateTimeController',  function ($scope) {
	var that = $scope;

    var in10Days = new Date();
    in10Days.setDate(in10Days.getDate() + 10);

    $scope.newSurvey.publishDate.startDate = new Date();
    $scope.newSurvey.publishDate.endDate = in10Days;
    

    $scope.open = {
        
        startDate: false,
        endDate: false
        
    };

    // Disable today selection
    $scope.disabled = function(date, mode) {
        return (mode === 'day' && (new Date().toDateString() == date.toDateString()));
    };

    $scope.dateOptions = {
        showWeeks: false,
        startingDay: 1
    };

    $scope.timeOptions = {
        readonlyInput: false,
        showMeridian: false
    };

    $scope.dateModeOptions = {
        minMode: 'year',
        maxMode: 'year'
    };

    $scope.openCalendar = function(e, date) {
        that.open[date] = true;
    };

    // watch date4 and date5 to calculate difference
   /* var unwatch = $scope.$watch(function() {
        return that.dates;
    }, function() {
        if (that.dates.date4 && that.dates.date5) {
            var diff = that.dates.date4.getTime() - that.dates.date5.getTime();
            that.dayRange = Math.round(Math.abs(diff/(1000*60*60*24)))
        } else {
            that.dayRange = 'n/a';
        }
    }, true);*/

    $scope.$on('$destroy', function() {
        unwatch();
    });
});