'use strict';

(function(){
	angular
		.module("galadhrimApp", [])
		.factory("SectionService", SectionService);

		SectionService.$inject = ["$http", "$q"];

	function SectionService($http,$q){
		var url = "http://localhost:"+config.port+"/api";
		var service = {};
		service.getAll = getAll;
		service.addSection = addSection;
		service.updateSection = updateSection;
		service.deleteSection = deleteSection;
		return section;

		function getAll(){
			var deferred = $q.defer();

			$http.get(url+"/section")
				.success(function(data){
					deferred.resolve.(data);
				})
				.error(function(data){
					deffered.reject("Error: Cannot retrieve Sections");
				});
				return deferred.promise;
		}

		function addSection(newSection){
			var deferred = $q.defer();

			$http.get(url+"/student", newStudent)
				.success(function(data)){
						deferred.resolve(data);
				}
				.error(function(data){
					deferred.reject("Error: Cannot Add Section");
				});
			return deferred.promise;
		}

		function updatesection(editSection,id){
			var deferred = $q.defer();

			$http.put(url+"/section/"+id,editStudent)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Error: Cannot Edit Section");
				});
			return deferred.promise;
		}

		function deleteSection(id){
			var deferred = $q.defer();

			$http.delete(url+"/section/"+id)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Error: Cannot Delete Student");
				})
			return deferred.promise;
		}
	}

});
