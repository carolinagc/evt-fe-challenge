app.factory('etvService', function($http) {

    var content = {};

    content.getAppData = function() {
        return $http.get('json/data.json')
            .then(getData)
            .catch(function(e){
                console.log('Error retrieving data',e);
                throw e;
            });
    };

    function getData(response) {
	var allData = {};
	var startDate, endDate, startDt, endDt;
	var endDate;
	var data = response.data;

	// It was detected that the data in the json file is not consistent
	// Sometimes start_date is after the end_date, or viceversa
	// To work with the data is has been done in an "invasive" way
	// and the start_date and end_date have been switched so to
	// have consistent data.
	// Also in order of doing the filtering correct, dates
	// have been converted from string into Date type


	angular.forEach(data, function (value, key) {
	    startDate = data[key].start_date;
	    endDate = data[key].end_date;
	    startDt = new Date(startDate);
	    endDt = new Date(endDate);

	    if (moment(startDt).isBefore(endDt)) {
		data[key].start_date = moment(startDt).format('YYYY/MM/DD');
		data[key].end_date = moment(endDt).format('YYYY/MM/DD');
	    } else {
		data[key].start_date = moment(endDt).format('YYYY/MM/DD');
		data[key].end_date = moment(startDt).format('YYYY/MM/DD');
	    };

        });


        return data;


    };


    return content;   
 
});
    
           
