// curriculum/curriculum.controller.js
'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.controller("CurriculumCtrl", CurriculumCtrl);

	CurriculumCtrl.$inject = ["$scope", "CurriculumService"];

	function CurriculumCtrl($scope, CurriculumService) {
		$scope.curricula=[];

		
		CurriculumService.getAll()
			.then(function(data) {
				$scope.curricula = data;
			});


		$scope.addCurriculum = function(){
			CurriculumService.addCurriculum($scope.newCurriculum)
				.then(function(data) {
					$scope.newCurriculum.code = "";
					$scope.newCurriculum.name = "";
					$scope.newCurriculum.degreeProgramId = "";
					$scope.newCurriculum.push(data);
				});
				
			CurriculumService.getAll()
				.then(function(data) {
					$scope.curricula = data;
				});
		}
		
		$scope.editCurriculum = function(curriculum_id){
			CurriculumService.updateCurriculum($scope.editCurriculum, curriculum_id)
				.then(function(data) {
					$scope.editCurriculum.code = "";
					$scope.editCurriculum.name = "";
					$scope.editCurriculum.degreeProgramId = "";
				});
			
			CurriculumService.getAll()
				.then(function(data) {
					$scope.curricula = data;
				});
		}
		
				
		$scope.deleteCurriculum = function(curriculum_id){
			var del = confirm("Are you sure you want to delete the curriculum?");
			if(!del) {
				return false;
			}
			
			CurriculumService.deleteCurriculum(curriculum_id)
				.then(function(data) {
				});
				
			CurriculumService.getAll()
				.then(function(data) {
					$scope.curricula = data;
				});
		}
		
	}
})();

