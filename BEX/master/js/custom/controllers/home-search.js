
myApp.controller('HomeSearchController', ["$rootScope", "RequestArticlesService", "ArticleManagerService", function($rootScope,RequestArticlesService, ArticleManagerService) {
    var self = this;
    var ABSTRACT_SEARCH = 0;
    var TITLE_SEARCH = 1;
    var AUTHOR_SEARCH = 2;
    var searchType = ABSTRACT_SEARCH;

    self.authors = [];
    self.searchText = "";
    self.searchTitle = "";
    self.searchAuthor = "";

    //todo: da testare
    //todo: duplicato: vedi filters-manager
    var isEmpty = function(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }

    //todo: da eliminare
    //todo: duplicato: vedi funzione run() in app.js
    //if (isEmpty($rootScope.authors)) {
    //    ArticlesInfoService.getAllAuthors().then(
    //        function (response) {
    //            $rootScope.authors = [];
    //            var authorsFullName = response.data.results.bindings;
    //
    //            for (var i in authorsFullName) {
    //                $rootScope.authors.push(authorsFullName[i].fullName.value);
    //            }
    //            console.log($rootScope.authors);
    //        },
    //        //todo caso da gestire meglio
    //        function (errResponse) {
    //            ngDialog.open({template: "app/templates/dialog-error.html"});
    //            console.error("Error while fetching authors. " + errResponse.status + ": " + errResponse.statusText)
    //        }
    //    );
    //}

    self.searchForArticles = function() {
        RequestArticlesService.setSearchString(self.searchText);
        switch (searchType) {
            case ABSTRACT_SEARCH:     // abstract
                if (self.searchText) {
                    ArticleManagerService.getArticlesByAbstract(self.searchText);
                }
                break;
            case TITLE_SEARCH:     // title
                if (self.searchTitle) {
                    ArticleManagerService.getArticlesByTitle(self.searchTitle);
                }

                break;
            case AUTHOR_SEARCH:     // author
                if (self.searchAuthor) {
                    ArticleManagerService.getArticlesByFullNameAuthor(self.searchAuthor);
                }
                break;
        }

        //todo: per doc: http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state
        $rootScope.$state.go('app.articles-results');
    }

    self.switchSearch = function(searchT) {
        switch (searchT) {
            case 0:
                searchType = ABSTRACT_SEARCH;
                break;
            case 1:
                searchType = TITLE_SEARCH;
                break;
            case 2:
                searchType = AUTHOR_SEARCH;
                break;
        }
    }

    self.refreshAuthors = function(str) {
        self.authors.length = 0;
        for (key in $rootScope.authors) {
            if ($rootScope.authors[key].toUpperCase().startsWith(str.toUpperCase())) {
                self.authors.push($rootScope.authors[key]);
            }
        }
    };


}]);