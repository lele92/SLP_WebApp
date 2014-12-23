/**=========================================================
 * module: articles-manager.js
 * servizio per gestire gli articoli
 =========================================================*/
'use strict';

myApp
    .factory('ArticleManagerService', function(RequestArticlesService, $rootScope) {
        var articlesResults = [];

        return {
            getArticles: function() {
                //fixme: attenzione! si sta passando un riferimento ad articlesResults, se viene cambiato è un casino
                return articlesResults;
            },

            requestArticles: function() {
                return RequestArticlesService.searchArticles().then(
                    // success
                    function(response) {
                        angular.copy(response.data.results.bindings, articlesResults);
                    },

                    // error
                    //todo caso da gestire meglio
                    function(errResponse) {
                        console.error("Error while fetching articles. "+errResponse.status+": "+errResponse.statusText)
                    }
                );
            },

            //importante! se si modifica articlesResults, non riassegnare altrimenti tutti i $watch non vanno più! modificare usando angular.copy
            //@guide https://docs.angularjs.org/api/ng/function/angular.copy
            /* per aggiornare gli articoli */
            setArticles: function(newArticles) {
                angular.copy(newArticles, articlesResults);
            },

            /* aggiunge un articol oalla lista di articoli */
            addArticle: function(newArticle) {
                articlesResults.push(newArticle);
            }
        }
    });
