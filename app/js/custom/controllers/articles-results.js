myApp.controller('ArticlesResultsController', function($rootScope, ArticleManagerService, FiltersManagerService, RequestArticlesService, $scope) {
    var self = this;
    self.articles = ArticleManagerService.getArticles(); //prende gli articoli da mostrare nella view

    self.publicationYearFil =  FiltersManagerService.getStartingPublicationYear();  // prende il filtro dell'anno da applicare agli articoli mostrati nella view
    self.orderByFil = FiltersManagerService.getOrderBy();                           // prende l'ordinamento da applicare alla bibliografia
    self.sortFil = FiltersManagerService.getSort();                                 // prende il sort da applicare alla bibliografia
    self.onlySelfcitationsFil = FiltersManagerService.getOnlySelfCitations();           // prende il filtro per le autocitazioni
    self.characterizationsFil = FiltersManagerService.getCharacterizations();

    self.isRequestPending = RequestArticlesService.isRequestPending();                  // I -> è in corso la richiesta all'abstractFinder?
    self.isRetrievingArticlesInfo = ArticleManagerService.isRetrievingArticlesInfo();   // II -> è in corso la richiesta delle info sugli articoli? (questa richiesta parte solo all'arrivo della risposta della richiesta I)
    self.articlesNum = 0;           // numero di articoli (risultati di ricerca)
    self.completedArticles = 0;     // numero di articoli completati ( = le cui info generiche sono disponibili)
    self.completedPercent = 0;
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
            console.log("I -> Stato richiesta degli articolo modificato: "+self.isRequestPending);
        });

    //@guide: per essere aggiornato sullo stato della richiesta delle info a fuseki
    $scope.$watch(ArticleManagerService.isRetrievingArticlesInfo,
        function() {
            self.isRetrievingArticlesInfo = ArticleManagerService.isRetrievingArticlesInfo();
            self.articlesNum = ArticleManagerService.getArticlesNum(); //aggiorno il numero degli articoli
            console.log("II -> Stato richiesta delle info modificato: "+ self.isRetrievingArticlesInfo);
        });

    //@guide: per essere aggiornato sul numero di articoli completati ( = le cui info generiche sono disponibili)
    $scope.$watch(ArticleManagerService.getCompletedArticles,
        function() {
            self.completedArticles = ArticleManagerService.getCompletedArticles();
            self.completedPercent = ( self.completedArticles / self.articlesNum) * 100;
            console.log("Aggiornato numero di articoli completati: "+ self.completedArticles);
        });

    self.logResults = function() {
        console.log(self.articles);
    }
})