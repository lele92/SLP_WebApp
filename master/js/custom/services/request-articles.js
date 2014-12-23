/**=========================================================
 * module: request-articles.js
 * servizio per ottenere i risultati di ricerca
 =========================================================*/

'use strict';

myApp
    .factory('RequestArticlesService', function($http) {
        var self = this;
        var textForRequest = "";    // testo per la ricerca

        return {

            /* todo: DA CAMBIARE. funzione stub, in realtà non faccio ancora nessuna richiesta a nessun server, prendo i risultati da un .json
             * bisognerà usare textForRequest per fare la richiesta all'AbstractFinder*/
            searchArticles: function() {
                //guide http://nathanleclaire.com/blog/2014/01/04/5-smooth-angularjs-application-tips/
                return $http.get('server/expResultsStub.json');
            },

            setSearchText: function(txt) {
                textForRequest = txt;
            },

            getSearchText: function() {
                return textForRequest;
            }
        }
    });
