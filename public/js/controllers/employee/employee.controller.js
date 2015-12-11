'use strict';

(function() {
	angular
		.module("galadhrimApp")
		.controller("EmployeeCtrl", EmployeeCtrl);

	EmployeeCtrl.$inject = ["$scope", "EmployeeService"];

	function EmployeeCtrl($scope, EmployeeService) {
		$scope.employees = [];		// list of employees

		EmployeeService.GetAll()	// $scope.employees - should contain list of all course employees
			.then(function(data){
				$scope.employees = data;
			});

		$scope.addEmployee = function() {		// $scope.addEmployee - function that calls to service to add new employee
			EmployeeService.addEmployee($scope.newEmployee)		
				.then(function(data) {			// $scope.newEmployee - contains the new employee record to be added
					$scope.newEmployee.firstName = "";
					$scope.newEmployee.middleName = "";
					$scope.newEmployee.lastName = "";
					$scope.newEmployee.unitId = "";
					$scope.newEmployee.push(data);
				});

			EmployeeService.GetAll() 
				.then(function(data) {
					$scope.employees = data;
				})
		} // end of $scope.addEmployee					

		$scope.editEmployee = function(empID) { 	// $scope.editEmployee - contains the updated employee
			EmployeeService.updateEmployee($scope.editEmployee, empID)	
				.then(function (data) {				// $scope.editEmployee - function that calls to service to edit employee							
					$scope.editEmployee.firstName = "";	
					$scope.editEmployee.middleName = "";
					$scope.editEmployee.lastName = "";
					$scope.editEmployee.unitId = "";
				});

			EmployeeService.GetAll()
				.then(function(data) {
					$scope.employees = data;
				});			
		} // end of $scope.editEmployee

		$scope.deleteEmployee = function(empID) {	// $scope.deleteEmployee - function that confirms if the user is sure to delete the record, then calls to service to delete employee
			var delEmp = confirm ("Are you sure you want to delete this employee?");

			if(!del) {
				return false;
			}

			EmployeeService.deleteEmployee(empID)			
				.then(function(data) {
				});

			EmployeeService.GetAll() 
				.then(function(data) {
					$scope.employees = data;
				});
		} // end of $scope.deleteEmployee
	}
})();
