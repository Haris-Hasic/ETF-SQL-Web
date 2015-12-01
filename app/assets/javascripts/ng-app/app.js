var app = angular.module('ETF-SQL-Web', [ 'ngRoute', 'templates']);

app.config(function($routeProvider) {
	$routeProvider
	
		// Signup routing
		.when('/signup', {
			controller: 'SignupController',
			templateUrl: '../templates/signup/signup.html'
		})
		
		// Default routing
		.otherwise({
			controller: 'HomeController',
			templateUrl: '../templates/home.html'
		});
});
