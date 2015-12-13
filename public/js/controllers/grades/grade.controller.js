'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.controller("GradesCtrl", GradesCtrl);

	GradesCtrl.$inject = ["$scope", "GradesService"];

	function GradesCtrl($scope, GradesService) {
		$scope.grades = [];

		GradesService.getAll()
			.then(function (data) {
				$scope.grades = data;
			});

		$scope.addGrade = function () {
			GradesService.addGrade($scope.newGrade)
				.then(function (data) {
					$scope.newGrade.studentId: "";
					$scope.newGrade.sectionId: "";
					$scope.newGrade.grade: "";
					$scope.newGrade.remarks: "";
					$scope.newGrade.push(data);
				});		

			GradesService.getAll()
				.then(function(data) {
					$scope.grades = data;
				});
		}

		$scope.editGrade = function (gradeId) {
			GradesService.updateGrade($scope.editGrade, gradeId)
				.then(function (data) {
					$scope.newGrade.studentId: "";
					$scope.newGrade.sectionId: "";
					$scope.newGrade.grade: "";
					$scope.newGrade.remarks: "";
				});		

			GradesService.getAll()
				.then(function(data) {
					$scope.grades = data;
				});

			});
		}

		$scope.deleteGrade = function (gradeId) {
			var del = confirm("Are you sure you want to delete the record?");
			if(!del) {
				return false;
			}
			
			GradesService.deleteGrade(gradeId)
				.then(function(data) {
				});
				
			GradesService.getAll()
				.then(function(data) {
					$scope.grades = data;
				});
		}

	}

})();