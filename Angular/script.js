
// script.js

// Load Dependencies
var app = angular.module('mainApp', ['ngRoute']);

var loggedin = false;

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
                    var p = CryptoJS.AES.encrypt($scope.pass1, "lololol");
                    $http({
                     url: '/createUser',
                     method: 'POST',
                     headers: {'Content-Type': 'application/json'},
                     data: JSON.stringify({
                                          "user":$scope.username,
                                          "pass":p.toString(CryptoJS.enc.Utf8)
                                          })
                     });
               }else {
                    console.log("passwords do not match");
               }
               
//               console.log($scope.username);
//               console.log(p);
                                   };

});

app.controller('error404Controller', function($scope, $http) {
               
               $scope.name = "error404Controller";
               });

app.directive('drawing', function(){
              return {
              restrict: "A",
              link: function(scope, element){
              var ctx = element[0].getContext('2d');
              
              // variable that decides if something should be drawn on mousemove
              var drawing = false;
              
              // the last coordinates before the current move
              var lastX;
              var lastY;
              
              element.bind('mousedown', function(event){
                           if(event.offsetX!==undefined){
                           lastX = event.offsetX;
                           lastY = event.offsetY;
                           } else { // Firefox compatibility
                           lastX = event.layerX - event.currentTarget.offsetLeft;
                           lastY = event.layerY - event.currentTarget.offsetTop;
                           }
                           
                           // begins new line
                           ctx.beginPath();
                           
                           drawing = true;
                           });
              element.bind('mousemove', function(event){
                           if(drawing){
                           // get current mouse position
                           if(event.offsetX!==undefined){
                           currentX = event.offsetX;
                           currentY = event.offsetY;
                           } else {
                           currentX = event.layerX - event.currentTarget.offsetLeft;
                           currentY = event.layerY - event.currentTarget.offsetTop;
                           }
                           
                           draw(lastX, lastY, currentX, currentY);
                           
                           // set current coordinates to last one
                           lastX = currentX;
                           lastY = currentY;
                           }
                           
                           });
              element.bind('mouseup', function(event){
                           // stop drawing
                           drawing = false;
                           });
              
              // canvas reset
              function reset(){
              element[0].width = element[0].width;
              }
              
              function draw(lX, lY, cX, cY){
              // line from
              ctx.moveTo(lX,lY);
              // to
              ctx.lineTo(cX,cY);
              // color
              ctx.strokeStyle = "#4bf";
              // draw it
              ctx.stroke();
              }
              }
              };
              });
app.config(function($routeProvider, $locationProvider) {
           
           $routeProvider
           
           .when('/', {
                 
                 templateUrl: 'template/login.html',
                 controller: 'homeController'
                 })
           
           .when('/draw', {
                 
                 templateUrl: 'template/draw.html',
                 controller: 'drawController',
                 directive: 'drawing'
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
