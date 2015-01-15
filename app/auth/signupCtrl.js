(function(){
  "use strict";

	angular.module('maribethApp')
		.controller('signupCtrl', ['$http', signupCtrl])

	var UserDetails = {
		username: '',
		password: '',
	}

	function signupCtrl($http){
		var vm = this;

		vm.trace = "signup yo";

		//vm.userDetails = new UserDetails();

		vm.signMeUp = function(userDetails){
			//send data to web service
			//userDetails.$save();
			//$http.post(url, data, config)
		}

	};
}());