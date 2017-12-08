
// script.js

// Load Dependencies
var app = angular.module('mainApp', ['ngRoute']);

app.controller('mainController', function($scope) {} );

app.controller('homeController', function($scope, $http) {
               
               $scope.name = "homeController";
               });

app.controller('drawController', function($scope, $http) {
               
               $scope.name = "drawController";
               });

app.controller('guessController', function($scope, $http) {
               
               $scope.name = "guessController";
               });


app.config(function($routeProvider, $locationProvider) {
           
           $routeProvider
           
           .when('/', {
                 
                 templateUrl: 'template/login.html',
                 controller: 'homeController'
                 })
           
           .when('/draw', {
                 
                 templateUrl: 'template/draw.html',
                 controller: 'aboutController'
                 })
           
           .when('/guess', {
                 
                 templateUrl: 'template/guess.html',
                 controller: 'contactController'
                 })
           
           .when('/error404', {
                 
                 templateUrl: 'template/404.html',
                 controller: 'error404Controller'
                 })
           
           .otherwise({
                      
                      redirectTo: '/'
                      });
           
           $locationProvider.html5Mode(true);
           });
