'use strict';

angular.module('etvApp').filter('byDateRange', function() {

    return function (items, startDate, endDate) {
    // Using ES6 filter method
        return items.filter(function(item){
	    return moment(item.start_date).isAfter(startDate) && moment(item.end_date).isBefore(endDate)
        });
    };

});
