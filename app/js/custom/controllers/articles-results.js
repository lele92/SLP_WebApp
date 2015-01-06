myApp.controller('ArticlesResultsController', function($rootScope, ngDialog, ArticleManagerService, FiltersManagerService, RequestArticlesService, $scope) {
    var self = this;
    self.articles = ArticleManagerService.getArticles(); //prende gli articoli da mostrare nella view
    self.states = ArticleManagerService.getStates();

    self.publicationYearFil =  FiltersManagerService.getStartingPublicationYear();  // prende il filtro dell'anno da applicare agli articoli mostrati nella view
    self.orderByFil = FiltersManagerService.getOrderBy();                           // prende l'ordinamento da applicare alla bibliografia
    self.sortFil = FiltersManagerService.getSort();                                 // prende il sort da applicare alla bibliografia
    self.onlySelfcitationsFil = FiltersManagerService.getOnlySelfCitations();           // prende il filtro per le autocitazioni
    self.characterizationsFil = FiltersManagerService.getCharacterizations();

    self.isRequestPending = RequestArticlesService.isRequestPending();                  // I -> è in corso la richiesta all'abstractFinder?
    self.isRetrievingArticlesInfo = ArticleManagerService.isRetrievingArticlesInfo();   // II -> è in corso la richiesta delle info sugli articoli? (questa richiesta parte solo all'arrivo della risposta della richiesta I)
    self.articlesNum = self.articles.length;           // numero di articoli (risultati di ricerca)
    self.completedArticles = 0;     // numero di articoli completati ( = le cui info generiche sono disponibili)
    self.completedPercent = 0;

    var requestPendingDialog;
    var loadingInfoDialog;

    // se non si stanno richiedendo info e non ci sono articoli da mostrare (di una precedente ricerca) allora mostra un dialog di avviso
    if (!self.isRequestPending && ArticleManagerService.getArticlesResultsState() == self.states.NOT_AVAILABLE) {
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


    //importante: articles deve essere tra apici, dannazione! ho perso 3 ore prima di capirlo!
    //@guide http://stackoverflow.com/questions/15380140/service-variable-not-updating-in-controller
    //@guide http://stsc3000.github.io/blog/2013/10/26/a-tale-of-frankenstein-and-binding-to-service-values-in-angular-dot-js/
    $scope.$watchCollection('articles',
        function() {
            console.log('articoli aggiornati');
            //todo: implementazione da raffinare
            //todo:idea qui si potrebbe aggiungere l'apertura di una dialog per avvisare che i risultati sono stati aggiornati
            self.articles = ArticleManagerService.getArticles();
        },
        true); //todo:valutare se lasciare questo true

    //@guide: per essere aggiornato sullo stato della richiesta all'abstract finder
    $scope.$watch(RequestArticlesService.isRequestPending,
        function() {
            self.isRequestPending = RequestArticlesService.isRequestPending();
            // se c'è una richiesta in sospeso visualizzo la dialog
            if (self.isRequestPending) {
                console.log("1.1 - PENDING REQUEST");
                requestPendingDialog = ngDialog.open({
                    template: "app/templates/dialog-retrieving-results.html",
                    closeByEscape: false,
                    showClose: false,
                    closeByDocument: false
                });
            } else {
                console.log("1.2 - REQUEST NOT PENDING");
                if (requestPendingDialog) {
                    requestPendingDialog.close();
                }

                if (ArticleManagerService.getArticlesResultsState() == self.states.NO_RESULTS) {
                    ngDialog.open({
                        template: "app/templates/dialog-no-results.html",
                        closeByEscape: true,
                        showClose: true,
                        closeByDocument: true
                    });
                }

            }
        });

    //@guide: per essere aggiornato sullo stato della richiesta delle info a fuseki
    $scope.$watch(ArticleManagerService.isRetrievingArticlesInfo,
        function() {
            self.isRetrievingArticlesInfo = ArticleManagerService.isRetrievingArticlesInfo();
            self.articlesNum = ArticleManagerService.getArticlesNum(); //aggiorno il numero degli articoli
            //fixme: problema con la dialog di caricamento info
            //if (self.isRetrievingArticlesInfo) {
            //    console.log("2.1 - RETRIEVING ARTICLES INFO");
            //    loadingInfoDialog = ngDialog.open({
            //        template: "app/templates/dialog-loading-info.html",
            //        closeByEscape: false,
            //        showClose: false,
            //        closeByDocument: false
            //    });
            //} else {
            //    console.log("2.3 - ARTICLES INFO RETRIEVED");
            //    if (loadingInfoDialog) {
            //        console.log("baaaaaang");
            //        loadingInfoDialog.close();
            //        //loadingInfoDialog.close();
            //    }
            //}
        });

    //@guide: per essere aggiornato sul numero di articoli completati ( = le cui info generiche sono disponibili)
    $scope.$watch(ArticleManagerService.getCompletedArticles,
        function() {
            self.completedArticles = ArticleManagerService.getCompletedArticles();
            self.completedPercent = ( self.completedArticles / self.articlesNum) * 100;
            console.log("2.2 - completed articles: "+ self.completedArticles);
        });

    self.logResults = function() {
        console.log(self.articles);
    }
})