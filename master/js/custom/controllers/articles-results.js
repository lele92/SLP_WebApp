myApp.controller('ArticlesResultsController', function($rootScope, ArticleManagerService,$scope) {
    var self = this;

    self.articles = ArticleManagerService.getArticles();

    //importante: articles deve essere tra apici, dannazione! ho perso 3 ore prima di capirlo!
    //@guide http://stackoverflow.com/questions/15380140/service-variable-not-updating-in-controller
    //@guide http://stsc3000.github.io/blog/2013/10/26/a-tale-of-frankenstein-and-binding-to-service-values-in-angular-dot-js/
    $scope.$watchCollection('articles',
        function() {
            //todo: implementazione da raffinare
            //todo:idea qui si potrebbe aggiungere l'apertura di una dialog per avvisare che i risultati sono stati aggiornati
            self.articles = ArticleManagerService.getArticles();
        },
        true); //todo:valutare se lasciare questo true
})