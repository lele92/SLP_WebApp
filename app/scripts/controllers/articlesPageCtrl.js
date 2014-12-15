'use strict';

/**
 * @ngdoc function
 * @name slpWebApp.controller:ArticlesCtrl
 * @description
 * # ArticlesCtrl
 * Controller of the slpWebApp
 */
angular.module('slpWebApp')
  .controller('ArticlesCtrl', function (RequestArticlesService, ArticleInfoService) {
    var self = this;
    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    self.articles = [];

      // todo: vedi libro p.90
    RequestArticlesService.getArticles().then(
      /* success */
      function(response) {
        self.articles = response.data.results.bindings;
        for (var key in self.articles) {
          getArticleTitle(self.articles[key]);
        }
        console.log(self.articles);
      },

      /* error */
      function(errResponse) {
        console.error("Error while fetching articles. "+errResponse.status+": "+errResponse.statusText)
      }
    );

    //todo: valutare se lasciarla qui questa funzione
    /*per ottenere il titolo di un determinato article*/
    var getArticleTitle = function(article) {

      ArticleInfoService.getArticleInfo(article).then(
        /* success */
        function(response) {
          var articleInfo = response.data.results.bindings[0];
          console.log(articleInfo);
          article.title = articleInfo.title.value;
          article.abstract = articleInfo.abstractTxt.value;
        },

        //todo: caso da gestire, se non riesco a recuperare il titolo di un articolo
        /* error */
        function(errResponse) {
          console.error("Error while fetching articles. "+errResponse.status+": "+errResponse.statusText)
        }
      );
    }


  });
