'use strict';

/**
 * @ngdoc function
 * @name slpWebAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the slpWebAppApp
 */
angular.module('slpWebAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
