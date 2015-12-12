// courses/courses.controller.js
'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.controller("CoursesCtrl", CoursesCtrl);

	CoursesCtrl.$inject = ["$scope", "CoursesService"];

	function CoursesCtrl($scope, CoursesService) {
		$scope.courses=[];

		
		CoursesService.getAll()
			.then(function(data) {
				$scope.courses = data;
			});


		$scope.addCourse = function(){
			CoursesService.addCourse($scope.newCourse)
				.then(function(data) {
					$scope.newCourse.code = "";
					$scope.newCourse.name = "";
					$scope.newCourse.units = "";
					$scope.newCourse.semesterOffered = "";
					$scope.newCourse.unitId = "";
					$scope.newCourse.push(data);
				});
				
			CoursesService.getAll()
				.then(function(data) {
					$scope.courses = data;
				});
		}
		
		$scope.editCourse = function(course_id){
			CoursesService.updateCourse($scope.editCourse, course_id)
				.then(function(data) {
					$scope.editCourse.code = "";
					$scope.editCourse.desc = "";
					$scope.editCourse.units = "";
					$scope.editCourse.semestedOffered = "";
					$scope.editCourse.unitId = "";
				});
			
			CoursesService.getAll()
				.then(function(data) {
					$scope.courses = data;
				});
		}
		
				
		$scope.deleteCourse = function(course_id){
			var del = confirm("Are you sure you want to delete the course?");
			if(!del) {
				return false;
			}
			
			CoursesService.deleteCourse(course_id)
				.then(function(data) {
				});
				
			CoursesService.getAll()
				.then(function(data) {
					$scope.courses = data;
				});
		}
		
	}
})();

