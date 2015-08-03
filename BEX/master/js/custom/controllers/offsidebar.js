myApp.controller('OffsidebarController',["$rootScope", function($rootScope){
	var self = this;
	self.overlap = $rootScope.offsidebarOverlap;

	self.switchOffsidebarOverlap = function() {
		$rootScope.offsidebarOverlap?$('body').removeClass('offsidebar-open-overlap'):$('body').removeClass('offsidebar-open');
		$rootScope.offsidebarOverlap = !$rootScope.offsidebarOverlap;
		//console.log($rootScope.offsidebarOverlap)
	}
}]);