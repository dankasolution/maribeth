angular.module('maribethApp')
	.controller('crewsCtrl', 
	    function($scope, $http, $window){
	      $http.get('/crews/get')
	        .success(function(data, status, headers, config){
	          $scope.crews = data;
	        })
	        .error(function(data, status, headers, config){
	          $scope.crews = [];
	        });         
	    })