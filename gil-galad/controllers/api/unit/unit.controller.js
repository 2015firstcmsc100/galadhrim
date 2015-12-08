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
		UnitService.getAll()
		.then(function (data) {
			$scope.units = data;
		});


		/*
		$scope.newUnit - contains the new unit record to be added
		$scope.addUnit - function that calls to service to add new unit
		*/
		$scope.addUnit = function () {
			// Assuming ng-models are already checked if empty
			UnitService.addUnit($scope.newUnit)
			.then(function (data) {
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


		/*
		$scope.editUnit - contains the updated unit
		$scope.editUnit - function that calls to service to edit unit
		*/
		$scope.editUnit = function (unitId) {
			// Assuming ng-models are already checked if empty
			UnitService.updateUnit($scope.editUnit, unitId)
			.then(function (data) {
				// reset
				$scope.editUnit = {
					code: "",
					name: "",
					parentUnitId: ""
				};
				// remove the old unit in $scope.units
				var index = findIndexById(unitId);
				if(index != -1){
					$scope.units.splice(index, 1);
				}
				// add the edited unit to $scope.units
				$scope.units.push(data);
			});
		}

		/*
		$scope.deleteUnit - function that confirms if the user is sure to delete the record, then calls to service to delete unit
		*/
		$scope.deleteUnit = function (unitId) {
			if (!confirm("Are you sure you want to delete this unit?")) {
				return false;	
			}
			UnitService.deleteUnit(unitId).then(function (data) {
				// remove unit from list
				var index = findIndexById(unitId);
				if(index != -1){
					$scope.units.splice(index, 1);
				}
			});
		}

	}
})();