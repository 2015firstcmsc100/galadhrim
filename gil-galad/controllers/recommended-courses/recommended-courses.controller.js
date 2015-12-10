// recommended-courses.controller.js
'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.controller("RecommendedCoursesCtrl", RecommendedCoursesCtrl);

	RecommendedCoursesCtrl.$inject = ["$scope", "RecommendedCoursesService"];

	function RecommendedCoursesCtrl($scope, RecommendedCoursesService) {
		$scope.recommendedCourses=[];

		
		RecommendedCoursesService.GetAll()
			.then(function(data) {
				$scope.recommendedCourses = data;
			});

		$scope.addRecommendedCourse = function(){
			RecommendedCoursesService.addRecommendedCourse($scope.newRecommendedCourse)
				.then(function(data) {
					$scope.newRecommendedCourse.courseId = "";
					$scope.newRecommendedCourse.studentId = "";
					$scope.recommendedCourses.push(data);
				});
				
			RecommendedCoursesService.GetAll()
				.then(function(data) {
					$scope.recommendedCourses = data;
				});
		}

		$scope.editRecommendedCourse = function(courseId){
			RecommendedCoursesService.updateRecommendedCourse($scope.editRecommendedCourse, courseId)
				.then(function(data) {
					$scope.editRecommendedCourse.courseId = "";
					$scope.editRecommendedCourse.studentId = "";
				});
				
			RecommendedCoursesService.GetAll()
				.then(function(data) {
					$scope.recommendedCourses = data;
				});
		}
						
		$scope.deleteRecommendedCourse = function(courseId){
			var del = confirm("Are you sure you want to delete this recommended course?");
			if(!del) {
				return false;
			}
			
			RecommendedCoursesService.deleteRecommendedCourse(courseId)
				.then(function(data) {
				});
				
			RecommendedCoursesService.GetAll()
				.then(function(data) {
					$scope.recommendedCourses = data;
				});
		}
		
	}
})();

