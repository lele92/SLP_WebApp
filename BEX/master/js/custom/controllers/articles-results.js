myApp.controller('ArticlesResultsController', function($rootScope, ngDialog, ArticleManagerService, FiltersManagerService, RequestArticlesService, StatesManagerService, $scope, $timeout) {
    var self = this;
    self.articles = ArticleManagerService.getArticles(); //prende gli articoli da mostrare nella view
    self.resultsStates = ArticleManagerService.getResultsStates();

    self.publicationYearFil =  FiltersManagerService.getStartingPublicationYearF();     // prende il filtro dell'anno da applicare agli articoli mostrati nella view
    self.orderByFil = FiltersManagerService.getOrderBy();                               // prende l'ordinamento da applicare alla bibliografia
    self.sortFil = FiltersManagerService.getSort();                                     // prende il sort da applicare alla bibliografia
    self.onlySelfcitationsFil = FiltersManagerService.getOnlySelfCitationsF();          // prende il filtro per le autocitazioni
    self.characterizationsFil = FiltersManagerService.getCharacterizationsF();          // prende il filtro per i colori
    self.authorsFil = FiltersManagerService.getAuthorsF();                              // prende il filtro per gli autori

    self.isRequestPending = RequestArticlesService.isRequestPending();                  // I -> è in corso la richiesta all'abstractFinder?
    self.isRetrievingArticlesInfo = ArticleManagerService.isRetrievingArticlesInfo();   // II -> è in corso la richiesta delle info sugli articoli? (questa richiesta parte solo all'arrivo della risposta della richiesta I)
    self.articlesNum = {value: self.articles.length};           // numero di articoli (risultati di ricerca)
    self.completedArticles = {value: 0};                        // numero di articoli completati ( = le cui info generiche sono disponibili)
    self.completedPercent = {value: 0};
    self.states = StatesManagerService.getStates();
    self.currentState = "Results";

    var requestPendingDialog;

    /* order option vars */
    self.publicationYear = "publicationYear";
    self.title = "title";
    self.globalCitations = "globalCountValue";
    self.totCitActs = "totCitActs";

    self.orderByV = self.publicationYear;
    self.sortByV = true;                      // true-> decrescente, false->crescente

    // se non si stanno richiedendo info e non ci sono articoli da mostrare (di una precedente ricerca) allora mostra un dialog di avviso
    if (!self.isRequestPending && ArticleManagerService.getArticlesResultsState() == self.resultsStates.NOT_AVAILABLE) {
         ngDialog.open({
            template: "app/templates/dialog-empty-results.html",
            controller: function($rootScope, $scope) {
                $scope.goToHomeSearch = function() {
                    $rootScope.$state.go('app.home-search');
                    ngDialog.close();
                }
            }
        });
    }

    self.getSearchText = function() {
        return RequestArticlesService.getSearchString();
    }

    self.restoreArticles = function(stateIndex, lastBreadcrumb) {
        if (!lastBreadcrumb) {
            ArticleManagerService.setArticlesResults(stateIndex);
        }

    }


    //@guide http://stackoverflow.com/questions/15380140/service-variable-not-updating-in-controller
    //@guide http://stsc3000.github.io/blog/2013/10/26/a-tale-of-frankenstein-and-binding-to-service-values-in-angular-dot-js/
    $scope.$watchCollection(function() { return self.articles},
        function() {
            //console.log('ARTICOLI AGGIORNATI');
            self.articlesNum.value = ArticleManagerService.getArticlesNum(); //aggiorno il numero degli articoli
            //todo: implementazione da raffinare
        }, true); //todo:valutare se lasciare questo true

    //@guide: per essere aggiornato sullo stato della richiesta all'abstract finder
    $scope.$watch(RequestArticlesService.isRequestPending,
        function() {
            self.isRequestPending = RequestArticlesService.isRequestPending();
            // se c'è una richiesta in sospeso visualizzo la dialog
            if (self.isRequestPending) {
                //console.log("1.1 - PENDING REQUEST");
                requestPendingDialog = ngDialog.open({
                    template: "app/templates/dialog-retrieving-results.html",
                    closeByEscape: false,
                    showClose: false,
                    closeByDocument: false
                    //todo: cancellare righe commentate
                    //controller: function($scope, RequestArticlesService) {
                    //    $scope.$watch(RequestArticlesService.isRequestPending(),
                    //    function() {
                    //        console.log("-------------------")
                    //        console.log(RequestArticlesService.isRequestPending())
                    //        console.log("-------------------")
                    //    })
                    //}
                });
            } else {
                //console.log("1.2 - REQUEST NOT PENDING");
                self.articlesNum.value = ArticleManagerService.getArticlesNum();
                if (requestPendingDialog) {
                    $timeout(requestPendingDialog.close, 500) //uso timeout per risolvere un problema di ngDialog (e anche per non flashare l'utente)
                }

                //se dall'abs finder non ci sono risultati mostro una notifica
                if (ArticleManagerService.getArticlesResultsState() == self.resultsStates.NO_RESULTS) {
                    self.articlesNum.value = 0;
                    ngDialog.open({
                        template: "app/templates/dialog-no-results.html",
                        closeByEscape: true,
                        showClose: true,
                        closeByDocument: true,
                        controller: function($rootScope, $scope) {
                            $scope.goToHomeSearch = function() {
                                $rootScope.$state.go('app.home-search');
                                ngDialog.close();
                            }
                        }
                    });
                }

                //todo: per adesso non mi viene una soluzione migliore
                //se dall'abs finder ci sono risultati
                if (ArticleManagerService.getArticlesResultsState() == self.resultsStates.RESULTS) {
                    self.articlesNum.value = ArticleManagerService.getArticlesNum();
                    //todo:cancellare righe commentate
                    //loadingInfoDialog = ngDialog.open({
                    //    template: "app/templates/dialog-loading-info.html",
                    //    closeByEscape: false,
                    //    showClose: false,
                    //    closeByDocument: false,
                    //    data: {
                    //        articlesNum: self.articlesNum,
                    //        completedArticles: self.completedArticles
                    //    }
                    //})
                }

            }
        });

    //@guide: per essere aggiornato sullo stato della richiesta delle info a fuseki
    $scope.$watch(ArticleManagerService.isRetrievingArticlesInfo,
        function() {
            self.isRetrievingArticlesInfo = ArticleManagerService.isRetrievingArticlesInfo();
            self.articlesNum.value = ArticleManagerService.getArticlesNum(); //aggiorno il numero degli articoli
            if (self.isRetrievingArticlesInfo) {
               // console.log("2.1 - RETRIEVING ARTICLES INFO");
            } else {
               // console.log("2.3 - ARTICLES INFO RETRIEVED");
            }
        });

    //@guide: per essere aggiornato sul numero di articoli completati ( = le cui info generiche sono disponibili)
    $scope.$watch(ArticleManagerService.getCompletedArticles,
        function() {
            self.completedArticles.value = ArticleManagerService.getCompletedArticles();
            self.completedPercent.value = ( self.completedArticles.value / self.articlesNum.value) * 100;
            //console.log("2.2 - completed articles: "+ self.completedArticles.value);
        });

    $scope.$watchCollection(StatesManagerService.getStates,
        function() {
            //console.log('STATES AGGIORNATI');
        }, true); //todo:valutare se lasciare questo true

    self.logResults = function() {
        console.log(self.articles);
    }
})