//ANGULARJS
(function(){
  "use strict";

  var app = angular.module('maribethApp', ['ui.router']);

  app.config(['$stateProvider','$urlRouterProvider', 
              function($stateProvider, $urlRouterProvider){
                $urlRouterProvider.otherwise("/welcome"); //default route

                $stateProvider
                  .state('welcome', {
                    url: '/welcome',
                    templateUrl: 'app/auth/welcomeView.html',
                    controller: 'welcomeCtrl as vm'
                  })
                  .state('signup', {
                    url: '/signup',
                    templateUrl: 'app/auth/signupView.html',
                    controller: 'signupCtrl as vm'
                  })
              }])      
}());
  
  	