/*
  Service for the resource 'Employee'.
`*/

'use strict';

(function(){
	angular
		.module("galadhrimApp", [])
		.factory("EmployeeService", EmployeeService);

		EmployeeService.$inject = ["$http", "$q"];

	function EmployeeService($http, $q){
		var service = {};
		service.getAll = getAll;
		service.addEmployee = addEmployee;
		service.updateEmployee = updateEmployee;
		service.deleteEmployee = deleteEmployee;
		return service;

		function getAll(){
			var deferred = $q.defer();

			$http.get("/api/employees")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Employees!");
			});

			return deferred.promise;
		}

		function addEmployee(newEmployee){
			var deferred = $q.defer();

			$http.post("/api/employees", newEmployee)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Add Employee!");
			});

			return deferred.promise;
		}

		function updateEmployee(editEmployee, id){
			var deferred = $q.defer();

			$http.put("/api/employees/" + id, editEmployee)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Edit Employee!");
			});

			return deferred.promise;
		}

		function deleteEmployee(id){
			var deferred = $q.defer();

			$http.delete("/api/employees/" + id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Delete Employee!");
			});

			return deferred.promise;
		}
	}
});
