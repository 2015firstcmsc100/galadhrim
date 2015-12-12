// curriculum/curriculum.service.js

'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.factory("CurriculumService", CurriculumService);

	CurriculumService.$inject = ["$http", "$q"];

	function CurriculumService($http, $q) {
		var url = 'http://galadhrim.loc'+ (process.env.PORT || config.port);				
		var service = {};
		service.GetAll = GetAll;
		service.AddCurriculum = AddCurriculum;
		service.DeleteCurriculum = DeleteCurriculum;
		service.UpdateCurriculum = UpdateCurriculum;
		return service;

		function GetAll() {
			var deferred = $q.defer();

			$http.get(url + "/degree-programs")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Curriculums");
			});
			return deferred.promise;
		}

		function AddCurriculum(newCurriculum) {
			var deferred = $q.defer();

			$http.post(url + "/curriculum", newCurriculum)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Add Curriculum");
			});
		
			return deferred.promise;
		}
		
		function DeleteCurriculum(id) {
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
		
		function UpdateCurriculum(editCurriculum, id) {
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
	}
})();
