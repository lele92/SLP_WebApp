/**=========================================================
 * module: info-articles.js
 * servizio per reperire le informazioni relative agli articoli
 =========================================================*/
'use strict';

myApp
    .factory('ArticlesInfoService', function($http,$interpolate) {
        var endpoint = "http://localhost:8181/data/query";
        var prefixes = $('#prefixes').text();

        return {
            getArticleGeneralInfo: function(workURI) {
                var q = $('#query_articleInfo').text();
                var expr = {work: workURI};
                var queryURL = this.buildQueryURL(q,expr);

                return $http.get(queryURL);
            },

            getArticleAuthors: function(authorsListURI) {
                var q = $('#query_articleAuthors').text();
                var expr = {authorsList: authorsListURI};
                var queryURL = this.buildQueryURL(q,expr);

                return $http.get(queryURL);
            },

            //fixme: da spostare fuori dalla api
            /* per costruire la query; query presa dallo script nell'hrml alla quale vengono sostituite le espressioni con ctx */
            buildQueryURL: function(queryElement,ctx) {
                var query = prefixes + $interpolate(queryElement)(ctx);
                var encodedquery = encodeURIComponent(query);

                return endpoint+"?format=json&query="+encodedquery;
            }
        }


    });
