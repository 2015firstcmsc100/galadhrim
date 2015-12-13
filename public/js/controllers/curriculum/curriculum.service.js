/*
	curriculum/curriculum.service.js
	
	getAll()
	addCurriculum(newCurriculum)
	updateCurriculum(editCurriculum, id)
	deleteCurriculum(id)
*/
'use strict';

(function(){
	angular
		.module("galadhrimApp", []) 
		.factory("CurriculumService", CurriculumService);

		CurriculumService.$inject = ["$http", "$q"];

	function CurriculumService($http, $q){
		var url = "http://localhost:" + config.port + "/api/curriculum/";
		var service = {};
		service.getAll = getAll;
		service.addCurriculum = addCurriculum;
		service.updateCurriculum = updateCurriculum;
		service.deleteCurriculum = deleteCurriculum;
		return service;

		function getAll(){
			var deferred = $q.defer();

			$http.get(url + "/curriculum")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Curricula");
			});

			return deferred.promise;			
		}

		function addCurriculum(newCurriculum){
			var deferred = $q.defer();

			$http.get(url + "/curriculum", newCurriculum)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Add Curriculum");
			});

			return deferred.promise;	
		}

		function updateCurriculum(editCurriculum, id){
			var deferred = $q.defer();
			
			$http.put(url + "/curriculum/" + id, editCurriculum)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Edit Curriculum");
			});

			return deferred.promise;			
		}

		function deleteCurriculum(id){
			var deferred = $q.defer();	

			$http.delete(url + "/curriculum/" + id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Delete Curriculum");
			});
		
			return deferred.promise;			
		}
	}	
})
