myApp.controller('RightNavbarController', ["CitationsFiltersManagerService","ArticlesFiltersManager","$rootScope", function(CitationsFiltersManagerService,ArticlesFiltersManager,$rootScope) {
    var self = this;
    self.citationsFilterActivated = CitationsFiltersManagerService.getFilterActivatedBool();
    self.articlesFilterActivated = ArticlesFiltersManager.getFilterActivatedBool();

    self.checkOffsidebarOverlap = function() {
        return $rootScope.offsidebarOverlap? "offsidebar-open-overlap" : "offsidebar-open";
    }
}]);
