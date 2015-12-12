/*
	courses/courses.service.js
	
	getAll()
	addCourse(newCourse)
	updateCourse(editCourse, id)
	deleteCourse(id)
*/
'use strict';

(function(){
	angular
		.module("galadhrimApp", []) 
		.factory("CoursesService", CoursesService);

		CoursesService.$inject = ["$http", "$q"];

	function CoursesService($http, $q){
		var url = "http://localhost:" + config.port + "/api/courses/";
		var service = {};
		service.getAll = getAll;
		service.addCourse = addCourse;
		service.updateCourse = updateCourse;
		service.deleteCourse = deleteCourse;
		return service;

		function getAll(){
			var deferred = $q.defer();

			$http.get(url + "/courses")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Courses");
			});

			return deferred.promise;			
		}

		function addCourse(newCourse){
			var deferred = $q.defer();

			$http.get(url + "/courses", newCourse)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Add Course");
			});

			return deferred.promise;	
		}

		function updateCourse(editCourse, id){
			var deferred = $q.defer();
			
			$http.put(url + "/courses/" + id, editCourse)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Edit Course");
			});

			return deferred.promise;			
		}

		function deleteCourse(id){
			var deferred = $q.defer();	

			$http.delete(url + "/courses/" + id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Delete Course");
			});
		
			return deferred.promise;			
		}
	}	
})
