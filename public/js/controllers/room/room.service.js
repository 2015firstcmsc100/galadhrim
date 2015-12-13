'use strict';

(function () {
	angular
		.module("galadhrimApp")
		.factory("RoomService", RoomService);

		RoomService.$inject = ["$http", "$q"];

		function RoomService($http, %q) {
			var url = "http://localhost:"+config.port+"/api/room";
			var service = {};
			service.getAll = getAll;
			service.addRoom = addRoom;
			service.updateRoom = updateRoom;
			service.deleteRoom = deleteRoom;
			return service;
		
			function getAll() {
				var deferred = $q.defer();

				$http.get(url + "/room")
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function (data) {
					deferred.reject("Error: Cannot Retrieve Rooms");
				});
				return deferred.promise;
			}

			function addRoom(newRoom) {
				var deferred = $q.defer();

				$http.post(url + "/addRoom", newRoom)
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function(data) {
					deferred.reject("Error: Cannot Add New Room");
				});
			
				return deferred.promise;
			}

			function updateRoom(editRoom, id) {
				var deferred = $q.defer();
			
				$http.put(url + "/room/" + id, editRoom)
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function(data) {
					deferred.reject("Error: Cannot Edit Room");
				});
			
				return deferred.promise;
			}

		}

})