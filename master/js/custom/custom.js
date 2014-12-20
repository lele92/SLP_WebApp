// To run this code, edit file 
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// ----------------------------------- 

var myApp = angular.module('SLP_WebApp', ['angle']);

myApp.run(function($log) {

  $log.log('I\'m a line from custom.js');

});

myApp.controller('oneOfMyOwnController', function($scope) {
  /* controller code */
});

myApp.directive('oneOfMyOwnDirectives', function() {
  /*directive code*/
});

myApp.config(function($stateProvider /* ... */) {
  /* specific routes here (see file config.js) */
  $stateProvider
      .state('app.home-search', {
        url: '/homeSearch',
        title: 'Search',
        templateUrl: getBasepath('home-search.html'),
        controller: 'NullController'
      })
});

// Set here the base of the relative path
// for all app views
function getBasepath(uri) {
  return 'app/views/' + uri;
}