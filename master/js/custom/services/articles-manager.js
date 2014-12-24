/**=========================================================
 * module: articles-manager.js
 * servizio per gestire gli articoli
 =========================================================*/
'use strict';

myApp
    .factory('ArticleManagerService', function(RequestArticlesService, ArticlesInfoService, $rootScope) {
        var articlesResults = [];

        return {
            getArticles: function() {
                //fixme: attenzione! si sta passando un riferimento ad articlesResults
                return articlesResults;
            },

            /* per richiedere i risultati della ricerca */
            requestArticles: function(searchString) {

                return RequestArticlesService.searchArticles(searchString).then(
                    // success
                    function(response) {
                        articlesResults.length = 0; //svuota l'array degli articoli, attenzione! non usare articlesResults = [] perchè crea un altro array
                        //todo non è una bella soluzione usare così le proprietà della risposta, valutare alternative
                        var resSet = "http://stanbol.apache.org/ontology/entityhub/query#QueryResultSet";
                        var results = "http://stanbol.apache.org/ontology/entityhub/query#queryResult";
                        var tmpRes = response.data[resSet][results];

                        //per ogni articolo, partendo dal work, richiedo tutte le informazioni generali
                        /* @guide: perchè faccio tante chiamate ajax e non una sola?
                         * perchè una query monolitica potrebbe richiedere molto tempo di caricamento, usando un for invece, appena arriva
                         * un articolo, lo aggiungo subito e vedo i risultati aggiornati nella viewe (grazie al watchCollection)
                         */
                        for (var key in tmpRes) {

                            ArticlesInfoService.getArticleGeneralInfo(tmpRes[key].value).then(
                                //@guide http://stackoverflow.com/questions/939032/jquery-pass-more-parameters-into-callback
                                function(response) {
                                    var articleData = response.data.results.bindings[0];

                                    //todo: qui si potrebbe risolvere con un chaining delle chiamate ajax
                                    ArticlesInfoService.getArticleAuthors(articleData.authorsList.value).then(
                                        function(response) {
                                            articleData.authors = response.data.results.bindings;
                                        },
                                        //todo caso da gestire meglio
                                        function(errResponse) {
                                            console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                                        }
                                    );
                                    articlesResults.push(articleData);


                                },

                                //todo caso da gestire meglio
                                function(errResponse) {
                                    console.error("Error while fetching articles. "+errResponse.status+": "+errResponse.statusText)
                                }
                            );
                        }
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
