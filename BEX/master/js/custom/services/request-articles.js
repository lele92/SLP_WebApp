/**=========================================================
 * module: request-articles.js
 * servizio per ottenere i risultati di ricerca
 =========================================================*/

'use strict';

myApp
    .factory('RequestArticlesService', ["$http",'$rootScope', function($http,$rootScope) {
        var searchString = "";    // testo per la ricerca
        var acceptHead = 'application/rdf+json';
        var endpoint = 'http://www.semanticlancet.eu/abstractfinder/';
        var pendingRequest = false;

        return {
            setCompletedRequest: function() {
                pendingRequest = false;
            },

            isRequestPending: function() {
                return pendingRequest;
            },

            setPendingRequest: function() {
                pendingRequest = true;
            },

            searchArticles: function(searchStr) {
                pendingRequest = true;
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

            setSearchString: function(str) {
                searchString = str
            },

            getSearchString: function() {
                return searchString;
            }
        }
    }]);
