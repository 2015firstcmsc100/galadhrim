'use strict';

(function () {
	angular
		.module("galadhrimApp")
		.factory("AnnouncementService", AnnouncementService);

		AnnouncementService.$inject = ["$http", "$q"];

		function AnnouncementService($http, %q) {
			var url = "http://localhost:"+config.port+"/api/announcement";
			var service = {};
			service.getAll = getAll;
			service.addAnnouncement = addAnnouncement;
			service.updateAnnouncement = updateAnnouncement;
			service.deleteAnnouncement = deleteAnnouncement;
			return service;
		
			function getAll() {
				var deferred = $q.defer();

				$http.get(url + "/announcement")
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function (data) {
					deferred.reject("Error: Cannot Retrieve Announcements");
				});
				return deferred.promise;
			}

			function addAnnouncement(newAnnouncement) {
				var deferred = $q.defer();

				$http.post(url + "/addAnnouncement", newAnnouncement)
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function(data) {
					deferred.reject("Error: Cannot Add New Announcement");
				});
			
				return deferred.promise;
			}

			function updateAnnouncement(editAnnouncement, id) {
				var deferred = $q.defer();
			
				$http.put(url + "/announcement/" + id, editAnnouncement)
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function(data) {
					deferred.reject("Error: Cannot Edit Announcement");
				});
		  
		  function DeleteAnnouncement(id) {
			var deferred = $q.defer();

			$http.delete(url + "/announcement/" + id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Delete Announcement");
			});
		
			return deferred.promise;
		}
		  	
				return deferred.promise;
			}

		}

})
