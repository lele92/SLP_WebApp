
myApp.controller('HomeSearchController', function($rootScope,RequestArticlesService, ArticleManagerService) {
    var self = this;

    self.searchText = "";

    self.searchArticles = function() {
        RequestArticlesService.setSearchString(self.searchText);
        ArticleManagerService.requestArticles(self.searchText);
        //todo: da rivedere, per doc: http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state
        $rootScope.$state.go('app.articles-results');
    }
})