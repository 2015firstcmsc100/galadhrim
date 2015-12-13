'use strict';

var app = angular.module('galadhrimApp');

app.controller('LoginController', ['$scope', '$cookies', 'LoginService', function ($scope, $cookies, LoginService) {
	$scope.login = {
		username: '',
		password: ''
	};

	$scope.authLogin = function () {
		LoginService.authUser($scope.login)
			.then(function(data) {
		});
	};

	$scope.addLogin = function () {
		LoginService.addLogin($scope.login)
			.then(function(data) {
		});
	};

	$scope.deleteLogin = function () {
		LoginService.deleteLogin($cookies.get('sessionToken')
			.then(function(data) {
		});
	};

}]);
