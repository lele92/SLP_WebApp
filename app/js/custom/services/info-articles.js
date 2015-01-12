/**=========================================================
 * module: info-articles.js
 * servizio per reperire le informazioni relative agli articoli
 =========================================================*/
'use strict';

myApp
    .factory('ArticlesInfoService', function($http,$interpolate) {
        var endpoint = "http://two.eelst.cs.unibo.it:8181/data/query"
        endpoint = "http://localhost:8181/data/query"; //todo: endpoint locale
        var prefixes = $('#prefixes').text();

        return {
            //@guide per le info generali su un articolo
            getArticleGeneralInfo: function(workURI) {
                var expr = {work: workURI};
                var queryURL = this.buildQueryURL('#query_articleInfo',expr);

                return $http.get(queryURL);
            },

            //@guide per le info citazionali di un articolo (di quelli mostrati nei risultati di ricerca) con expression = expressionURI
            requestCitationsInfo: function(expressionURI) {
                var expr = {citedExpression: expressionURI};
                var queryURL = this.buildQueryURL('#query_citationsInfo',expr);

                return $http.get(queryURL);
            },

            //@guide per le info generiche sugli articoli che citano un articolo con expression = expressionURI
            requestCitingArticles: function(expressionURI) {
                var expr = {citedExpression: expressionURI};
                var queryURL = this.buildQueryURL('#query_citingArticles',expr);

                return $http.get(queryURL);
            },

            //@guide per la lista di autori di un articolo
            getArticleAuthors: function(authorsListURI) {
                var expr = {authorsList: authorsListURI};
                var queryURL = this.buildQueryURL('#query_articleAuthors',expr);

                return $http.get(queryURL);
            },


            getArticleCitationsInfo: function(expressionURI) {
                var expr = {expression: expressionURI};
                var queryURL = this.buildQueryURL('#query_incomingCitationsActs',expr);

                return $http.get(queryURL);
            },

            //@guide per le info generiche sugli articoli citati da un certo articolo
            requestBiblioInfo: function(expressionURI) {
                var expr = {expression: expressionURI};
                var queryURL = this.buildQueryURL('#query_citedArticles',expr);

                return $http.get(queryURL);
            },

            //@guide per le info aggiuntive sugli articoli citati da un certo articolo: numero di citazioni e colore
            getCitationActsInfo: function(citingExp, citedExp) {
                var expr = {artExpression: citingExp,
                            citedExpression: citedExp};
                var queryURL = this.buildQueryURL('#query_citationActsInfo',expr);

                return $http.get(queryURL);

            },

            //@guide per ottenere tutti gli autori
            getAllAuthors: function() {
                var queryText = $("#query_allAuthors").text();
                var query = prefixes + queryText;
                var encodedquery = encodeURIComponent(query);

                return $http.get(endpoint+"?format=json&query="+encodedquery);
            },

            //fixme: da spostare fuori dalla api
            /* per costruire la query; query presa dallo script nell'html alla quale vengono sostituite le espressioni con ctx */
            buildQueryURL: function(queryId,ctx) {
                var queryText = $(queryId).text();
                var query = prefixes + $interpolate(queryText)(ctx);
                var encodedquery = encodeURIComponent(query);

                return endpoint+"?format=json&query="+encodedquery;
            }
        }
    });
