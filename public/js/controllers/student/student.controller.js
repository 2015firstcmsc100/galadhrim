'use strict';

(function () {
	angular.module("galadhrimApp")
		 .controller("StudentCtrl", StudentCtrl);

	StudentCtrl.$inject = ["$scope", "StudentService"];

	function StudentCtrl($scope, StudentService) {
		// list of students
		$scope.students = [];

		// function that finds the index of a student by id
		function findIndexById(id) {
			for(var i = 0, len = $scope.students.length; i < len; i++) {
			    if ($scope.students[i].id == id) {
				 return i;
			    }
			}
			return -1;
		}

		// $scope.students - should contain list of all students
		StudentService.getAll()
		.then(function (data) {
			$scope.students = data;
		});


		/*
		$scope.newStudent - contains the new student record to be added
		$scope.addStudent - function that calls to service to add new student
		*/
		$scope.addStudent = function () {
			// Assuming ng-models are already checked if empty
			StudentService.addStudent($scope.newStudent)
			.then(function (data) {
				// reset form
				$scope.newStudent = {
    					_id: "",
    					firstName: "",
    					middleName: "",
    					lastName: "",
    					curriculumId: 0,
    					allowedStudents: 0,
    					sex: ""
				};
				// push the newly inserted student to the list;
				$scope.students.push(data);
			});
		
		}


		/*
		$scope.editStudent - contains the updated student
		$scope.EditStudent - function that calls to service to edit student
		*/
		$scope.EditStudent = function (studentId) {
			// Assuming ng-models are already checked if empty
			StudentService.updateStudent($scope.editStudent, studentId)
			.then(function (data) {
				// reset
				$scope.editStudent = {
					_id: "",
    					firstName: "",
    					middleName: "",
    					lastName: "",
    					curriculumId: 0,
    					allowedStudents: 0,
    					sex: ""
				};
				// remove the old student in $scope.students
				var index = findIndexById(studentId);
				if(index != -1){
					$scope.students.splice(index, 1);
				}
				// add the edited student to $scope.students
				$scope.students.push(data);
			});
		}

		/*
		$scope.deleteStudent - function that confirms if the user is sure to delete the record, then calls to service to delete student
		*/
		$scope.deleteStudent = function (studentId) {
			if (!confirm("Are you sure you want to delete this student?")) {
				return false;	
			}
			StudentService.deleteStudent(studentId).then(function (data) {
				// remove student from list
				var index = findIndexById(studentId);
				if(index != -1){
					$scope.students.splice(index, 1);
				}
			});
		}

	}
})();
