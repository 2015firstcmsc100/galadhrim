'use strict';

(function(){
	angular
		.module("galadhrimApp", [])
		.factory("GradesService", GradesService);

	GradesService.$inject = [$http];
	function GradesService($http){
		var url = "http://localhost:"+config.port+"/api/grades/";
		var service = {};

		service.getAll = function (){
			$http({
				method: 'GET',
				url: url,
				params:'id=0'
			}).success(function(data){
				return data;
			}).error(function(data){
				alert("Error in getting grades!");
			})
		};

		service.addGrade = 	function (newGrade){
			var params = 'id=' + newGrade.id + ', studentid=' + newGrade.studentid + ', sectionid=' + newGrade.sectionid +
				', grade=' + newGrade.grade + ', remarks=' + newGrade.remarks;

			$http({
				method: 'POST',
				url: url,
				params: params
			}).success(function(data){
				return data;
			}).error(function(data){
				alert("Error in getting grades!");
			})
		};

		service.updateGrade = 	function (editGrade, id){
			var params = 'id=' + id + ', studentid=' + editGrade.studentid + ', sectionid=' + editGrade.sectionid +
				', grade=' + editGrade.grade + ', remarks=' + editGrade.remarks;

				$http({
					method: 'PUT',
					url: url,
					params: params
				}).success(function(data){
					return data;
				}).error(function(){
					alert("Error in updating grades!");
				})
		});

		service.deleteGrade = function (id){
			$http({
				method: 'DELETE',
				url: url,
				params:'id=0'
			}).success(function(data){
				return data;
			}).error(function(){
				alert("Error in deleting grades!");
			})
		});

		return service;
	}
})();
