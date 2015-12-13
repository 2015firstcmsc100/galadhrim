'use strict';

(function () {
	angular.module("galadhrimApp")
		 .controller("LogCtrl", LogCtrl);

	LogCtrl.$inject = ["$scope", "LogService"];

	function LogCtrl($scope, LogService) {
		// should contain list of all logs
		$scope.logs = [];

		LogService.getAll()
  		.then(function (data) {
  			$scope.logs = data;
  		});
	}
})();
