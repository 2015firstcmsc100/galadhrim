/*
 * getAll()
 * addStudent(newStudent)
 * updateStudent(editStudent, id)
 * deleteStudent(id)
`*/
'use strict';

(function(){
	angular
		.module("galadhrimApp", [])
		.factory("StudentService", StudentService);

		StudentService.$inject = ["$http", "$q"];

	function StudentService($http, $q){
		var url = "http://localhost:"+config.port+"/api/student/";
		var service = {};
		service.getAll = getAll;
		service.addStudent = addStudent;
		service.updateStudent = updateStudent;
		service.deleteStudent = deleteStudent;
		return service;

		function getAll(){
			var deferred = $q.defer();

			$http.get(url + "/student")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Students!");
			});

			return deferred.promise;			
		}

		function addStudent(newStudent){
			var deferred = $q.defer();

			$http.get(url + "/student", newStudent)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Add Student!");
			});

			return deferred.promise;	
		}

		function updateStudent(editStudent, id){
			var deferred = $q.defer();
			
			$http.put(url + "/student/" + id, editStudent)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Edit Student");
			});

			return deferred.promise;			
		}

		function deleteStudent(id){
			var deferred = $q.defer();	

			$http.delete(url + "/student/" + id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Delete Student");
			});
		
			return deferred.promise;			
		}
	}	
})