var app = angular.module('etvApp', ['ui.bootstrap', 'chart.js']);
app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
	colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
	responsive: true
    })
})
