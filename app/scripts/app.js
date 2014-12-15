'use strict';

/**
 * @ngdoc overview
 * @name slpWebApp
 * @description
 * # slpWebApp
 *
 * Main module of the application.
 */
angular
  .module('slpWebApp', [
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/articlesDashboard', {
        templateUrl: 'views/articles.html',
        controller: 'ArticlesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

