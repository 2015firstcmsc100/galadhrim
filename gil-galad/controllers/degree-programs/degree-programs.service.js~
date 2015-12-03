// degree-programs/degree-programs.service.js

'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.factory("DegreeProgramsService", DegreeProgramsService);

	DegreeProgramsService.$inject = ["$http", "$q"];

	function DegreeProgramsService($http, $q) {
		var url = "http://localhost:5000";					//di po ako sure dito kung localhost:5000
		var service = {};
		service.GetAll = GetAll;
		service.AddDegreeProgram = AddDegreeProgram;
		service.DeleteDegreeProgram = DeleteDegreeProgram;
		service.EditDegreeProgram = EditDegreeProgram;
		return service;

		function GetAll() {
			var deferred = $q.defer();

			$http.get(url + "/degree-programs")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Degree Programs");
			});
			return deferred.promise;
		}

		function AddDegreeProgram(newDegreeProgram) {
			var deferred = $q.defer();

			$http.post(url + "/degree-programs", newDegreeProgram)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Add Degree Program");
			});
		
			return deferred.promise;
		}
		
		function DeleteDegreeProgram(id) {
			var deferred = $q.defer();

			$http.delete(url + "/degree-programs/" + id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Delete Degree Program");
			});
		
			return deferred.promise;
		}
		
		function EditDegreeProgram(editDegreeProgram, id) {
			var deferred = $q.defer();
			
			$http.put(url + "/degree-programs/" + id, editDegreeProgram)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Edit Degree Program");
			});
		
			return deferred.promise;
		}
	}
})();
