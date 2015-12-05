'use strict';

(function () {
	angular.module("galadhrimApp")
		 .controller("UnitCtrl", UnitCtrl);

	UnitCtrl.$inject = ["$scope", "UnitService"];

	function UnitCtrl($scope, UnitService) {
		// list of units
		$scope.units = [];

		// function that finds the index of a unit by id
		function findIndexById(id) {
			for(var i = 0, len = $scope.units.length; i < len; i++) {
			    if ($scope.units[i].id == id) {
				 return i;
			    }
			}
			return -1;
		}

		// $scope.units - should contain list of all units
		UnitService.getAll().then(function (data) {
			$scope.units = data;
		});


		/*
		$scope.newUnit - contains the new unit record to be added
		$scope.addUnit - function that calls to service to add new unit
		*/
		$scope.addUnit = function () {
			if($scope.newUnit != null){
				UnitService.addUnit($scope.newUnit).then(function (data) {
					// reset form
					$scope.newUnit = {
						code: "",
						name: "",
						parentUnitId: ""
					};
					// push the newly inserted unit to the list;
					$scope.units.push(data);
				});
			}
			else{
				console.log('Error: Unit to add is null.');
			}
		}


		/*
		$scope.editUnit - contains the updated unit
		$scope.editUnit - function that calls to service to edit unit
		*/
		$scope.EditUnit = function (unit_id) {
			if($scope.editUnit != null){
				UnitService.updateUnit($scope.editUnit, unit_id).then(function (data) {
					// reset
					$scope.editUnit = {
						code: "",
						name: "",
						parentUnitId: ""
					};
					// remove the old unit in $scope.units
					var index = findIndexById(unit_id);
					if(index != -1){
						$scope.units.splice(index, 1);
					}
					// add the edited unit to $scope.units
					$scope.units.push(data);
				});
			}
			else{
				console.log('Error: Unit to update is null.');
			}
		}

		/*
		$scope.deleteUnit - function that confirms if the user is sure to delete the record, then calls to service to delete unit
		*/
		$scope.deleteUnit = function (unit_id) {
			if (confirm("Are you sure you want to delete this unit?")) {
				UnitService.deleteUnit(unit_id).then(function (data) {
					// remove unit from list
					var index = findIndexById(unit_id);
					if(index != -1){
						$scope.units.splice(index, 1);
					}
				});
			}
			else {
				return false;
			}
		}
	}
})();
