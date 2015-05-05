myApp.controller('RightNavbarController', ["FiltersManagerService", function(FiltersManagerService) {
    var self = this;
    self.filterActivatedF = FiltersManagerService.getFilterActivated();
}]);
