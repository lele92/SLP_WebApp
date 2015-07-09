myApp.controller('RightNavbarController', ["CitationsFiltersManagerService","ArticlesFiltersManager","$rootScope", function(CitationsFiltersManagerService,ArticlesFiltersManager,$rootScope) {
    var self = this;
    self.filterActivatedF = CitationsFiltersManagerService.getFilterActivated() || ArticlesFiltersManager.getFilterActivated();

    self.checkOffsidebarOverlap = function() {
        return $rootScope.offsidebarOverlap? "offsidebar-open-overlap" : "offsidebar-open";
    }
}]);
