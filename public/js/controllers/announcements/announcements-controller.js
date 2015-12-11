'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.controller("AnnouncementsCtrl", AnnouncementsCtrl);

	AnnouncementsCtrl.$inject = ["$scope", "AnnouncementsService"];

	function AnnouncementsCtrl($scope, AnnouncementsService) {
		$scope.announcements=[];

		AnnouncementsService.GetAll()
			.then(function(data) {
				$scope.announcements = data;
			});

		$scope.addAnnouncement = function(){
			AnnouncementsService.addAnnouncement($scope.newAnnouncement)
				.then(function(data) {
					$scope.announcements.push(data);
				});
		}

		$scope.deleteAnnouncement = function(announcement){
			var x = confirm("Are you sure you want to delete the said announcement?");
			if(!x) return false;

			AnnouncementsService.deleteAnnouncement(announcement)
				.then(function(data) {
					$scope.announcements.splice($scope.announcements.indexOf(announcement), 1);
				});
		}
		
		$scope.editAnnouncement = function(announcement){
			AnnouncementsService.editAnnouncement(announcement.id, $scope.editedAnnouncement)
				.then(function(data) {
					$scope.announcements[indexOf(announcement)] = data;
				});
		}
	}
})();