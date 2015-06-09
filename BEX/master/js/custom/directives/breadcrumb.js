/**=========================================================
 * Module: breadcrumb.js
 * elemento per il breadcrumb
 =========================================================*/

myApp.directive('breadcrumb', ["StatesManagerService", "$rootScope", "ARTICLES_RESULTS", function(StatesManagerService, $rootScope, ARTICLES_RESULTS) {
	"use strict";

	return {
		restrict: 'E',
		templateUrl: 'app/templates/breadcrumb.html',
		scope:{},
		link: function($scope){
			$scope.states = StatesManagerService.getStates();
			$scope.types = ARTICLES_RESULTS;

			$scope.changeState = function(index) {
				var newState = StatesManagerService.restoreState(index);
				$rootScope.$state.go(newState.state.name, newState.params);
			}
		}
	}
}]);