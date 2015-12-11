/*
FE: Unit Service
getAll()
addUnit(newUnit)
updateUnit(editUnit, id)
deleteUnit(id)
*/

'use strict';

(function(){
	angular
		.module("galadhrimApp")
		.factory("UnitService", UnitService);
		
	UnitService.$inject = [$http];
	
	function UnitService($http){
		var url = "http://localhost:" + config.port + "/api/unit/";
		var service = {};
		
		service.getAll = function(){
			$http.get(url)
			.success(function(data){
				return data;
			})
			.error(function(data){
				alert("Error! Cannot retrieve units");
			})
		};
		
		service.addUnit = function(newUnit){
			var params = 'id=' + newUnit.id + ', code=' + newUnit.code + ', name=' + newUnit.name + ', parentUnitId' + newUnit.parentUnitId;
			
			$http.post(url, newUnit)
			.success(function(data){
				return data;
			}
			.error(function(data){
				alert("Error! Cannot add unit");
			})
		}
		
		service.updateUnit = function(editUnit, id){
			var params = 'id=' + newUnit.id + ', code=' + newUnit.code + ', name=' + newUnit.name + ', parentUnitId' + newUnit.parentUnitId;
			
			$http.put(url, newUnit)
			.success(function(data){
				return data;
			}
			.error(function(data){
				alert("Error! Cannot update unit");
			})
		}
		
		service.deleteUnit = function(id){
			$http.delete(url + id)
			.success(function(data){
				return data;
			}
			.error(function(data){
				alert("Error! Cannot delete unit");
			})
		}
		
		return service;
	}

})();
