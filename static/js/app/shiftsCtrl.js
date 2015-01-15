angular.module('maribethApp')
	.controller('shiftsCtrl', 
	    function($scope, $http, $location){	      
	      //initial call: get crew shifts based on crewid
	      $scope.crewid = $location.absUrl().split("/").pop();
	      $scope.shiftrecords = [];
	      $scope.shiftontable = {};

	      var generateEmptyShiftHours = function(){
	      	var _shifthours = [];	          		
          	for(i=0; i<7; i++){
          		var ohours = {
          			status: true,
          			day: $scope.days[i],
          			startwork: '',
          			startbreak: '',
          			finishbreak: '',
          			finishwork: ''
          		};
          		_shifthours.push(ohours);
          	}
          	return _shifthours;
	      }

	      var initShiftTable = function(){
	      	//this object here should get from object model	      	
	      	$scope.shiftontable = {
	      		startdate: Date.now(),
	      		shifthours: generateEmptyShiftHours()
	      	}
	      }

	      var getShifts	= function(){
	      	//call user data -> with id:param
		    $http.get('/crewshifts/get/'+ $scope.crewid)
		        .success(function(data, status, headers, config){
		          $scope.shifts = data;
		          // console.log("whole data: " + data);

		          angular.forEach($scope.shifts, function(item){				
		          	$scope.shiftrecords.push(item.shifts[0]);	          	      			
		      		})
		          $scope.error = "";

		          initShiftTable();
		          // console.log($scope.shiftontable);
		          // console.log($scope.shiftrecords);
		          	          
		        })
		        .error(function(data, status, headers, config){
		          console.log('error get crewshifts data');	        	
		          $scope.shifts = [];
		          $scope.error = data;
		        });
	      }
	      
	      getShifts();
	      
	      //function addShift
	      $scope.addShift = function(){
	      	//post shift to service with ajax
	      	//validation process happens here as well
	      	//use $http instead!
	      	var data = {}; //this object here should get from object model	 
            data.crewid = $scope.crewid;
            data.startdate = $scope.shiftontable.startdate;
            data.shifthours = $scope.shiftontable.shifthours;

            //console.log(data);
            $http.post("/crewshifts/upsert/", data)
            	.success(function(data, status, headers, config){
            		//$scope.shifts
            	})
            	.error(function(data, status, headers, config){})
	      };

	      $scope.resetRow = function(el){
	      	el.startwork = '';
      		el.startbreak = '';
      		el.finishbreak = '';
      		el.finishwork = '';      	
	      };

	      $scope.populateTable = function(){
	      	console.log($scope.shiftontable);
	      	//$scope.shift = $scope.shifts.shift[0];

	      	// angular.forEach($scope.todo.items, function(item){
	      	// 	...
	      	// })
	      }

	    })