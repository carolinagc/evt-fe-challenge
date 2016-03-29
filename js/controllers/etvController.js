'use strict';

app.controller('etvCtrl', function($scope, $filter, $timeout, etvService){    
    var isFiltered = false;

    getData();

    
    //Get data from json file
    
    function getData() {
	etvService.getAppData().then(function(data){
            $scope.allData = data;
	});
    }

    // Sort columns

    $scope.orderProp = 'city';
    $scope.direction = false;

    $scope.sort = function(column){
	if ($scope.orderProp === column) {
            $scope.direction = !$scope.direction;
	} else {
            $scope.orderProp = column;
            $scope.direction = false;
	}
    };

    // Date picker

    $scope.open1 = function() {
	$scope.popup1.opened = true;
	$scope.popup2.opened = false;
    };


    $scope.open2 = function() {
	$scope.popup2.opened = true;
	$scope.popup1.opened = false;
    };

    
    $scope.dateOptions = {
	formatYear: 'yy',
	startingDay: 1
    };
    
    $scope.formats = ['dd-MM-yyyy', 'MM/dd/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    
    $scope.popup1 = {
	opened: false
    };

    $scope.popup2 = {
	opened: false
    };


    $scope.wrongDateRange = function() {
	if ($scope.startDt > $scope.endDt) {
            return true;
	}
    };



  // Filter by dateRange when there is a startDate or endDate selected       
    $scope.filterByDate = function (startDt, endDt) {
	// changing date format
	var startDate =  moment(startDt).format('YYYY/MM/DD');
	var endDate =  moment(endDt).format('YYYY/MM/DD');

	var allFilteredData ;
	
	if ((moment(startDt).isBefore(endDt)) && isFiltered == false) {
	    console.log('start date', startDate);
	    console.log('end date', endDate);
            allFilteredData = $filter('byDateRange')($scope.allData, startDate, endDate);	
	    isFiltered = true;
	    console.log('all filtered data', allFilteredData);
	    $scope.allData = allFilteredData;
	} else {
	    alert ('Please check that the start date'+ startDate + ' is before the end date' + endDate + 'or reset the filter');
	}
    };




    $scope.reset = function () {
	isFiltered = false;
	$scope.startDt="";
	$scope.endDt="";
	getData();
    };


    // Set chart

    $timeout(function () {
	
	var avPrice = [];
	var numCity = [];
	var dailyAv = 0;
	var weeklyAv = 0;
	var monthlyAv = 0;
	var oftenAv = 0;
	var sum = 0;
	var sumW = 0;
	var sumM = 0;
	var sumO = 0;
	var dailyC = 0;
	var weeklyC = 0;
	var monthlyC = 0;
	var oftenC = 0;
	
	angular.forEach ($scope.allData, function(value, key){
	    switch(value.status) {
	    case 'Daily':
		dailyC += 1;
		sum += parseInt(value.price);
		dailyAv = sum/$scope.allData.length;    
            break;
	    case 'Weekly':
		weeklyC +=1;
		sumW += parseInt(value.price);
		weeklyAv = sum/$scope.allData.length;    
		break;
	case 'Monthly':
		monthlyC +=1;
		sumM += parseInt(value.price);
		monthlyAv = sum/$scope.allData.length;    
		break;
	    case 'Often':
		oftenC +=1;
		sumO += parseInt(value.price);
		oftenAv = sum/$scope.allData.length;    
            break;
	    default:
		
	    }
	    
	    avPrice = [dailyAv*40, weeklyAv*150, monthlyAv*560, oftenAv*35];
	    numCity = [dailyC, weeklyC*15, monthlyC, oftenC*45];

	})
	$scope.labels = ['Daily', 'Weekly', 'Monthly', 'Often'];
	$scope.data = [
            avPrice,
	    numCity
	];
	$scope.series = ['Price', 'Cities'];
    }, 3000);
    
});



