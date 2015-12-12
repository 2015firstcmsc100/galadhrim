'use strict';

(function () {
	angular
		.module("galadhrimApp")
		.factory("LogService", LogService);

	LogCtrl.$inject = ["$http", "$q"];

	function LogService($http, $q) {
		var url = "http://localhost:5000" + config.port + "/api/monitoring/logs";
		var service = {};
		service.getAll = getAll;
		return service;

		function getAll() {
			var deferred = $q.defer();

			$http.get(url)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Logs"); 
			});
			return deferred.promise;
		}
	}
})();
