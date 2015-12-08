var app = angular.module('ETF-SQL-Web', [ 'ngRoute', 'templates']);

app.config(function($routeProvider) {
	$routeProvider
	
	
		// Signup routing
		.when('/signup', {
			controller: 'SignupController',
			templateUrl: '../templates/signup/signup.html',
		})
		.when('/console', {
			controller: 'ConsoleController',
			templateUrl: '../templates/console/console.html.erb',
		})
		.when('/login', {
			controller: 'SessionsController',
			templateUrl: '../templates/user/login.html',
		})
		
		// Default routing
		.otherwise({
			controller: 'HomeController',
			templateUrl: '../templates/home.html',
		});
});
