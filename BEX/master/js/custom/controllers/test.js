myApp.controller('testController', ["$rootScope", "ngDialog", "ArticleManagerService", "CitationsFiltersManagerService","RequestArticlesService", "$scope", "$timeout", "$stateParams", "SEARCH_TYPE","$sessionStorage","BookmarksManagerService","ORDER_BY","ArticlesFiltersManager", function($rootScope, ngDialog, ArticleManagerService, CitationsFiltersManagerService, RequestArticlesService, $scope, $timeout, $stateParams, SEARCH_TYPE, $sessionStorage, BookmarksManagerService, ORDER_BY, ArticlesFiltersManager) {
	var self = this;

	self.params = $stateParams;

	console.log(self.params)
}]);