//ANGULARJS
angular.module('maribethApp', ['ngResource','ngRoute'])
	.constant('uiCalendarConfig', {})
  .controller('appController',
    function($scope, $http, $window){
      $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
      $scope.years = [2014,2015,2016,2017,2018,2019,2020];
      $scope.days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

      $scope.mgrheader = "/views/manager_header.html";
      $scope.crewheader = "/views/crew_header.html";

      $scope.header = "/views/header.html";          
    })  
  
  
  	