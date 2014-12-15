'use strict';

/**
 * @ngdoc function
 * @name slpWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slpWebApp
 */
angular.module('slpWebApp')
  .controller('MainCtrl', function ($location, RequestArticlesService) {
    var self = this;
    self.searchTxt = "";

    self.goToDashboard = function() {
      RequestArticlesService.setText(self.searchTxt)
      $location.path('articlesDashboard');
    }

    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
