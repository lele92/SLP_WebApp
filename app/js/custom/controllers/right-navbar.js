myApp.controller('RightNavbarController', function(FiltersManagerService) {
    var self = this;
    self.filterActivatedF = FiltersManagerService.getFilterActivated();
});
