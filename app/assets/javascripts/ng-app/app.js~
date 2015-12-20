var app = angular.module('ETF-SQL-Web', [ 'ngRoute', 'templates']);

app.config(function($routeProvider) {
	$routeProvider
	
		// Signup routing
		.when('/signup', {
			controller: 'SignupController',
			templateUrl: '../templates/signup/signup.html',
		})
		.when('/login', {
			controller: 'SessionsController',
			templateUrl: '../templates/user/login.html',
		})
		.when('/logout', {
			controller: 'SessionsController',
			templateUrl: '../templates/user/logout.html'
		})
		.when('/console', {
			controller: 'ConsoleController',
			templateUrl: '../templates/console/console.html.erb',
		})
		.when('/resetPassword/:token', {
			controller: 'PasswordResetController',
			templateUrl: '../templates/user/resetPassword.html',
		})
		.when('/forgottenPassword', {
			controller: 'PasswordResetController',
			templateUrl: '../templates/user/forgottenPassword.html'
		})
		.when('/preference', {
			controller: 'PreferenceController',
			templateUrl: '../templates/user/preference.html'
		})
		// Default routing
		.otherwise({
			controller: 'HomeController',
			templateUrl: '../templates/home.html',
		});
});
