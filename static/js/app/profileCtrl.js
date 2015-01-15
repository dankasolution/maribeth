angular.module('maribethApp')
	.controller('profileCtrl', 
	    function($scope,$http,$location){
	      //HOW TO GET :id param on the URL to pass on to /user/get service??
	      var _userid = $location.absUrl().split("/").pop();
	      //call user data -> with id:param
	      $http.get('/user/get/'+_userid)
	        .success(function(data, status, headers, config){
	          //console.log(data);
	          $scope.user = data;
	          $scope.error = "";
	        })
	        .error(function(data, status, headers, config){
	          $scope.user = {};
	          $scope.error = data;
	        });
	    })