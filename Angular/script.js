
// script.js

// Load Dependencies
var app = angular.module('mainApp', ['ngRoute']);

app.controller('mainController', function($scope) {} );

app.controller('homeController', function($scope, $http) {
               
    $scope.name = "homeController";
    $scope.login = function() {
        console.log("login button clicked.");
        var p = CryptoJS.AES.encrypt($scope.password, "lololol");
        console.log($scope.username);
        console.log(p);
//               console.log(p.toString(CryptoJS.enc.Utf8));
//               console.log("decrypted");
//               var d = CryptoJS.AES.decrypt(p, "lololol");
//               console.log(d.toString(CryptoJS.enc.Utf8));
        $http({
              url: '/loginUser',
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              data: JSON.stringify({
                                   "user":$scope.username,
                                   "pass":p.toString(CryptoJS.enc.Utf8)
              })
        });
    };
});

app.controller('drawController', function($scope, $http) {
               
               $scope.name = "drawController";
               });

app.controller('guessController', function($scope, $http) {
               
               $scope.name = "guessController";
               });

app.controller('createController', function($scope, $http) {
               
               $scope.name = "createController";
               
               $scope.createUser = function() {
               console.log("create account clicked.");
               
               if ($scope.pass1 == $scope.pass2) {
                    console.log("passwords match");
                    var p = CryptoJS.AES.encrypt($scope.password, "lololol");
                    $http({
                     url: '/createUser',
                     method: 'POST',
                     headers: {'Content-Type': 'application/json'},
                     data: JSON.stringify({
                                          "user":$scope.username,
                                          "pass":p.toString(CryptoJS.enc.Utf8)
                                          })
                     });
                    };
               }else {
                    console.log("passwords do not match");
               }
               
//               console.log($scope.username);
//               console.log(p);
});

app.controller('error404Controller', function($scope, $http) {
               
               $scope.name = "error404Controller";
               });


app.config(function($routeProvider, $locationProvider) {
           
           $routeProvider
           
           .when('/', {
                 
                 templateUrl: 'template/login.html',
                 controller: 'homeController'
                 })
           
           .when('/draw', {
                 
                 templateUrl: 'template/draw.html',
                 controller: 'drawController'
                 })
           
           .when('/guess', {
                 
                 templateUrl: 'template/guess.html',
                 controller: 'guessController'
                 })
           .when('/create', {
                 
                 templateUrl: 'template/create.html',
                 controller: 'createController'
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
