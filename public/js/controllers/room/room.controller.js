// room/room.controller.js
'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.controller("RoomCtrl", RoomCtrl);

	RoomCtrl.$inject = ["$scope", "RoomService"];

	function RoomCtrl($scope, RoomService) {
		$scope.rooms=[];

		/* $scope.rooms - contains the list of all degree programs */
		RoomService.GetAll()
			.then(function(data) {
				$scope.rooms = data;
			});


		/* $scope.newRoom - contains the new room record to be added
		   $scope.addRoom - function that calls to service to add new room
		*/
		$scope.addRoom = function(){
			RoomService.addRoom($scope.newRoom)
				.then(function(data) {
					$scope.newRoom.room = "";
					$scope.rooms.push(data);
				});

			RoomService.GetAll()
				.then(function(data) {
					$scope.rooms = data;
				});
		}

		/*  $scope.editRoom - contains the updated room
			$scope.EditRoom - function that calls to service to edit room
		*/
		$scope.EditRoom = function(room_id){
			RoomService.UpdateRoom($scope.editRoom, room_id)
				.then(function(data) {
					$scope.editRoom.code = "";
				});

			RoomService.GetAll()
				.then(function(data) {
					$scope.rooms = data;
				});
		}

		/* $scope.deleteRoom - function that confirms if the user is sure to delete the record, then calls to service to delete program
		*/
		$scope.deleteRoom = function(room_id){
			var del = confirm("Are you sure you want to delete the room?");
			if(!del) {
				return false;
			}

			RoomService.deleteRoom(room_id)
				.then(function(data) {
				});

			RoomService.GetAll()
				.then(function(data) {
					$scope.rooms = data;
				});
		}

	}
})();
