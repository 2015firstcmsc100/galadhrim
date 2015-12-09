'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.controller("SectionCtrl", SectionCtrl);

	SectionCtrl.$inject = ["$scope", "SectionService"];

	function SectionCtrl($scope, SectionService) {
		//contain list of all course sections
		$scope.sections=[];

		SectionService.getAll()
			.then(function(data) {
				$scope.sections = data;
			});

		//function that calls to service to add new section
		$scope.addSection = function(){
			SectionService.addSection($scope.newSection)  	//contains the new section record to be added
				.then(function(data) {
					$scope.newSection.courseId = "";
					$scope.newSection.name = "";
					$scope.newSection.numberOfStudents = "";
					
					$scope.newSection.daysLaboratory = "";
					$scope.newSection.daysLecture = "";
					$scope.newSection.daysRecitation = "";
					
					$scope.newSection.timeLaboratory = "";
					$scope.newSection.timeLecture = "";
					$scope.newSection.timeRecitation = "";
					
					$scope.newSection.roomLaboratory = "";
					$scope.newSection.roomLecture = "";
					$scope.newSection.roomRecitation = "";
					
					$scope.newSection.laboratoryInstructor = "";
					$scope.newSection.lectureInstructor = "";
					$scope.newSection.recitationInstructor = "";
					
					$scope.newSection.daysLaboratory2 = "";
					$scope.newSection.daysLecture2 = "";
					$scope.newSection.daysRecitation2 = "";
					
					$scope.newSection.timeLaboratory2 = "";
					$scope.newSection.timeLecture2 = "";
					$scope.newSection.timeRecitation2 = "";
					
					$scope.newSection.roomLaboratory2 = "";
					$scope.newSection.roomLecture2 = "";
					$scope.newSection.roomRecitation2 = "";
					
					$scope.newSection.unitId = "";
					$scope.newSection.year = "";
					$scope.newSection.semester = "";
					
					$scope.newSection.push(data);
				});
				
			SectionService.getAll()
				.then(function(data) {
					$scope.sections = data;
				});
		}

		//function that calls to service to edit section
		$scope.editSection = function(sections_id){
			SectionService.updateSection($scope.editSection, sections_id)	//contains the updated section
				.then(function(data) {
					$scope.newSection.courseId = "";
					$scope.newSection.name = "";
					$scope.newSection.numberOfStudents = "";
					
					$scope.newSection.daysLaboratory = "";
					$scope.newSection.daysLecture = "";
					$scope.newSection.daysRecitation = "";
					
					$scope.newSection.timeLaboratory = "";
					$scope.newSection.timeLecture = "";
					$scope.newSection.timeRecitation = "";
					
					$scope.newSection.roomLaboratory = "";
					$scope.newSection.roomLecture = "";
					$scope.newSection.roomRecitation = "";
					
					$scope.newSection.laboratoryInstructor = "";
					$scope.newSection.lectureInstructor = "";
					$scope.newSection.recitationInstructor = "";
					
					$scope.newSection.daysLaboratory2 = "";
					$scope.newSection.daysLecture2 = "";
					$scope.newSection.daysRecitation2 = "";
					
					$scope.newSection.timeLaboratory2 = "";
					$scope.newSection.timeLecture2 = "";
					$scope.newSection.timeRecitation2 = "";
					
					$scope.newSection.roomLaboratory2 = "";
					$scope.newSection.roomLecture2 = "";
					$scope.newSection.roomRecitation2 = "";
					
					$scope.newSection.unitId = "";
					$scope.newSection.year = "";
					$scope.newSection.semester = "";
				});
			
			SectionService.getAll()
				.then(function(data) {
					$scope.sections = data;
				});
		}
		
		//function that confirms if the user is sure to delete the record, then calls to service to delete section
		$scope.deleteSection = function(sections_id){
			if(!confirm("Are you sure you want to delete this section?");) {
				return false;
			}
			
			SectionService.deleteSection(sections_id).then(function(data) {
			});
				
			SectionService.getAll().then(function(data) {
					$scope.sections = data;
			});
		}
	}
})();

