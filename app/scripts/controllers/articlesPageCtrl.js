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
          getArticleInfo(self.articles[key]);
        }
        console.log(self.articles);
      },

      /* error */
      function(errResponse) {
        console.error("Error while fetching articles. "+errResponse.status+": "+errResponse.statusText)
      }
    );

    //todo: valutare se lasciarla qui questa funzione
    /*per ottenere il titolo di un determinato articolo*/
    var getArticleInfo = function(article) {

      ArticleInfoService.getArticleInfo(article).then(
        /* success */
        function(response) {
          var articleInfo = response.data.results.bindings[0];
          console.log(articleInfo);
          article.title = articleInfo.title.value;
          article.abstract = articleInfo.abstractTxt.value;
          article.authorsListURI = articleInfo.authorsList.value;
          article.publicationYear = articleInfo.publicationYear.value;
          article.link = articleInfo.htmlItem.value;


          /* per ottenere gli autori */
          //todo: attenzione, un po' fragile come cosa: se cambiano i nomi delle proprietà, salta tutto!
          ArticleInfoService.getArticleAuthors(article).then(
            function(response){
              var responseAuthors = response.data.results.bindings;
              for (var key in responseAuthors) {
                responseAuthors[key].authorName = responseAuthors[key].givenName.value + " " + responseAuthors[key].familyName.value
              }
              article.authors = responseAuthors;
            },

            //todo: da gestire
            function(errResponse){}
          );

          ArticleInfoService.getIncomingCitations(article).then(
            function(response){
                article.incomingCitations = response.data.results.bindings;
            },

            //todo: da gestire
            function(errResponse){}
          );
        },

        //todo: caso da gestire, se non riesco a recuperare le info
        /* error */
        function(errResponse) {
          console.error("Error while fetching articles. "+errResponse.status+": "+errResponse.statusText)
        }
      );


    }


  });
