
myApp.controller('HomeSearchController', function($rootScope,RequestArticlesService, ArticleManagerService) {
    var self = this;
    self.searchTypes = [
        {name: "free text"},
        {name: "single article"}
    ];
    self.searchType = 0;
    self.searchText = "";
    self.searchPlaceholder = "Type some search text and then click on 'Search'";

    self.searchForArticles = function() {
        RequestArticlesService.setSearchString(self.searchText);
        switch (self.searchType) {
            case 0:     // free text
                ArticleManagerService.requestArticles(self.searchText);
                break;
            case 1:     // single article
                ArticleManagerService.getSingleArticle(self.searchText);
                break;
        }

        //todo: per doc: http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state
        $rootScope.$state.go('app.articles-results');
    }

    self.changePlaceholder = function(){
        switch (self.searchType) {
            case 0:     // free text
                self.searchPlaceholder = "Type some search text and then click on 'Search'";
                break;
            case 1:     // single article
                self.searchPlaceholder = "Type the title of an article and then click on 'Search'";
                break;
        }
    }
})