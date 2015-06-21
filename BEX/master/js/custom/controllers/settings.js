myApp.controller('SettingsController',['$rootScope','$localStorage','EndpointsManager', function($rootScope, $localStorage, EndpointsManager){
	"use strict";

	var self = this;

	self.endpoints = EndpointsManager.getEndpoints();
	self.selectedEndpoint = EndpointsManager.getSelectedEndpoint();
	self.newEndpoint = "";

	self.isSelectedEndpoint = function(value) {
		return value === self.selectedEndpoint;
	}

	self.removeEndpoint = function(index) {
		EndpointsManager.removeEndpoint(index);
	}

	self.addEndpoint = function() {
		EndpointsManager.addEndpoint(self.newEndpoint);
		self.newEndpoint = "";
	}

	self.setSelectedEndpoint = function(index) {
		EndpointsManager.setSelectedEndpoint(index);
	}

}]);