
myApp.controller('HomeSearchController', ["$rootScope", "RequestArticlesService", "ArticleManagerService","SEARCH_TYPE", "$sessionStorage", function($rootScope,RequestArticlesService, ArticleManagerService, SEARCH_TYPE, $sessionStorage) {
    var self = this;
    var searchType = SEARCH_TYPE.abstractSearch;

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

    //todo: da rifattorizzare
    self.searchForArticles = function() {
        RequestArticlesService.setSearchString(self.searchText); //todo: rivedere a cosa serve

        switch (searchType) {
            case SEARCH_TYPE.abstractSearch:     // abstract
                if (self.searchText) {
                    $sessionStorage.searchQuery = self.searchText;
                    ArticleManagerService.getArticlesByAbstract(self.searchText);
                    $rootScope.$state.go('app.articles-results', {
                        newSearch: true,
                        search: {
                            searchType: searchType
                        }
                    });
                }
                break;
            case SEARCH_TYPE.titleSearch:     // title
                if (self.searchTitle) {
                    $sessionStorage.searchQuery = self.searchTitle;

                    ArticleManagerService.getArticlesByTitle(self.searchTitle);
                    $rootScope.$state.go('app.articles-results', {
                        newSearch: true,
                        search: {
                            searchType: searchType
                        }
                    });
                }

                break;
            case SEARCH_TYPE.authorSearch:     // author
                if (self.searchAuthor) {
                    $sessionStorage.searchQuery = self.searchAuthor;
                    ArticleManagerService.getArticlesByFullNameAuthor(self.searchAuthor, true);
                    $rootScope.$state.go('app.articles-results', {
                        newSearch: true,
                        search: {
                            searchType: searchType
                        }
                    });
                }
                break;
        }

        //todo: per doc: http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state

    }

    self.switchSearch = function(searchT) {
        searchType = searchT;
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