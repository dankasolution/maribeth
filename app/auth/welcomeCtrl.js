(function(){
  "use strict";

	angular.module('maribethApp')
		.controller('welcomeCtrl', welcomeCtrl); //welcomeCtrl function is not injected by $scope because it is controller as...
					
	function welcomeCtrl(){
		var vm = this;
		vm.months = [1,2,3,4,5,6,7,8,9,10,11,12];
		vm.years = [2014,2015,2016,2017,2018,2019,2020];
		vm.days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];


		vm.logMeIn = function(){
			//Post login data to web service
			//console.log("username", vm.username);
			//console.log("password", vm.password);
		}

	}	
		
}());