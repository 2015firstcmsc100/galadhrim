/*
  Service for login
  Services:
	authUser()
	addLogin()
	deleteLogin()
 */

'use strict';

(function(){
	angular
		.module("galadhrimApp", [])
		.factory("LoginService", LoginService);

		LoginService.$inject = ["$http", "$q"];

	function LoginService($http, $q){
		var service = {};
		service.authUser = authUser;
		service.addEmployee = addEmployee;
		service.addLogin = addLogin;
		service.deleteLogin = deleteLogin;
		return service;

		function authUser(){
			var deferred = $q.defer();

			$http.post("/api/login", newUser)
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function (data) {
					deferred.reject("Error: Cannot Authenticate User!");
				});

			return deferred.promise;
		}

		function addLogin(){
			var deferred = $q.defer();

			$http.post("/api/login", newUser)
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function (data) {
					deferred.reject("Error: Cannot Add Login!");
				});

			return deferred.promise;
		}

		function deleteLogin(){
			var deferred = $q.defer();
			
			$http.post("/api/logout/"+id)
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function(data) {
					deferred.reject("Error: Cannot Delete Login!");
				});

			return deferred.promise;
		}
		
	}
});
