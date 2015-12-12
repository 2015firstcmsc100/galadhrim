'use strict';

(function() {
	angular.module("galadriel", ["ngRoute", "ngCookies"])
		.config(config);
	
	config.$inject = ["$routeProvider"];

	function config($routeProvider) {
		$routeProvider;
			
	}
})();
