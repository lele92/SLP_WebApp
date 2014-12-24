/**=========================================================
 * module: request-articles.js
 * servizio per ottenere i risultati di ricerca
 =========================================================*/

'use strict';

myApp
    .factory('RequestArticlesService', function($http) {
        var searchString = "";    // testo per la ricerca
        var acceptHead = 'application/rdf+json';
        var endpoint = "http://www.semanticlancet.eu/abstractfinder/";

        return {
            searchArticles: function(searchStr) {
                searchString = searchStr;
                var config = {
                    method: "GET",
                    params: {'query': searchString},
                    headers: {'Accept': acceptHead},
                    url: endpoint
                }
                //guide http://nathanleclaire.com/blog/2014/01/04/5-smooth-angularjs-application-tips/
                return $http(config);
            },

            getSearchString: function() {
                return searchString;
            }
        }
    });
