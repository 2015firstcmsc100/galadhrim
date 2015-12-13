// degree-programs/degree-programs.controller.js
'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.controller("DegreeProgramsCtrl", DegreeProgramsCtrl);

	DegreeProgramsCtrl.$inject = ["$scope", "DegreeProgramsService"];

	function DegreeProgramsCtrl($scope, DegreeProgramsService) {
		$scope.degreePrograms=[];

		/* $scope.degreePrograms - contains the list of all degree programs */
		DegreeProgramsService.GetAll()
			.then(function(data) {
				$scope.degreePrograms = data;
			});


		/* $scope.newDegreeProgram - contains the new degree program record to be added 
		   $scope.AddDegreeProgram - function that calls to service to add new degree program
		*/
		$scope.AddDegreeProgram = function(){
			DegreeProgramsService.AddDegreeProgram($scope.newDegreeProgram)
				.then(function(data) {
					$scope.newDegreeProgram.code = "";
					$scope.newDegreeProgram.name = "";
					$scope.degreePrograms.push(data);
				});
				
			DegreeProgramsService.GetAll()
				.then(function(data) {
					$scope.degreePrograms = data;
				});
		}
		
		/*  $scope.editDegreeProgram - contains the updated degree program 
			$scope.EditDegreeProgram - function that calls to service to edit degree program
		*/
		$scope.EditDegreeProgram = function(degreeprogram_id){
			DegreeProgramsService.UpdateDegreeProgram($scope.editDegreeProgram, degreeprogram_id)
				.then(function(data) {
					$scope.editDegreeProgram.code = "";
					$scope.editDegreeProgram.name = "";
				});
			
			DegreeProgramsService.GetAll()
				.then(function(data) {
					$scope.degreePrograms = data;
				});
		}
		
		/* $scope.DeleteDegreeProgram - function that confirms if the user is sure to delete the record, then calls to service to delete program
		*/		
		$scope.DeleteDegreeProgram = function(degreeprogram_id){
			var del = confirm("Are you sure you want to delete the degree program?");
			if(!del) {
				return false;
			}
			
			DegreeProgramsService.DeleteDegreeProgram(degreeprogram_id)
				.then(function(data) {
				});
				
			DegreeProgramsService.GetAll()
				.then(function(data) {
					$scope.degreePrograms = data;
				});
		}
		
	}
})();

