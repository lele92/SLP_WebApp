/**=========================================================
 * module: info-articles.js
 * servizio per reperire le informazioni relative agli articoli
 =========================================================*/
'use strict';

myApp
    .factory('ArticlesInfoService', ["$http", "$interpolate", function($http,$interpolate) {
        var endpoint = "http://two.eelst.cs.unibo.it:8181/data/query"
        //endpoint = "http://localhost:8181/data/query"; //todo: endpoint locale
        var prefixes = $('#prefixes').text();

        /* per costruire la query; query presa dallo script nell'html alla quale vengono sostituite le espressioni con ctx */
        var buildQueryURL = function(queryId,ctx) {
            var queryText = $(queryId).text();
            var query = prefixes + $interpolate(queryText)(ctx);
            var encodedquery = encodeURIComponent(query);

            return endpoint+"?format=json&query="+encodedquery;
        }

        return {
            //@guide per le info generali su un articolo
            getArticleGeneralInfo: function(workURI) {
                var expr = {work: workURI};
                var queryURL = buildQueryURL('#query_articleInfo',expr);

                return $http.get(queryURL);
            },

            //@guide per le info citazionali di un articolo (di quelli mostrati nei risultati di ricerca) con expression = expressionURI
            requestCitationsInfo: function(expressionURI) {
                var expr = {citedExpression: expressionURI};
                var queryURL = buildQueryURL('#query_citationsInfo',expr);

                return $http.get(queryURL);
            },

            //@guide per le info generiche sugli articoli che citano un articolo con expression = expressionURI
            requestCitingArticles: function(expressionURI) {
                var expr = {citedExpression: expressionURI};
                var queryURL = buildQueryURL('#query_citingArticles',expr);

                return $http.get(queryURL);
            },

            //@guide per la lista di autori di un articolo
            getArticleAuthors: function(authorsListURI) {
                var expr = {authorsList: authorsListURI};
                var queryURL = buildQueryURL('#query_articleAuthors',expr);

                return $http.get(queryURL);
            },


            getArticleCitationsInfo: function(expressionURI) {
                var expr = {expression: expressionURI};
                var queryURL = buildQueryURL('#query_incomingCitationsActs',expr);

                return $http.get(queryURL);
            },



            //@guide per le info generiche sugli articoli citati da un certo articolo
            requestBiblioInfo: function(expressionURI) {
                var expr = {expression: expressionURI};
                var queryURL = buildQueryURL('#query_citedArticles',expr);

                return $http.get(queryURL);
            },

            //@guide per le info aggiuntive sugli articoli citati da un certo articolo: numero di citazioni e colore (da articolo citante ad articolo citato)
            getCitationActsInfo: function(citingExp, citedExp) {
                var expr = {artExpression: citingExp,
                            citedExpression: citedExp};
                var queryURL = buildQueryURL('#query_citationActsInfo',expr);

                return $http.get(queryURL);

            },

            //@guide per le info aggiuntive sugli articoli citati da un certo articolo: numero di citazioni e colore (da articolo citante ad articolo citato)
            getCitationActsInfoNotGrouped: function(citingExp, citedExp) {
                var expr = {artExpression: citingExp,
                    citedExpression: citedExp};
                var queryURL = buildQueryURL('#query_citationActsInfoNotGrouped',expr);

                return $http.get(queryURL);

            },

            //@guide per ottenere tutti gli autori
            getAllAuthors: function() {
                var queryText = $("#query_allAuthors").text();
                var query = prefixes + queryText;
                var encodedquery = encodeURIComponent(query);

                return $http.get(endpoint+"?format=json&query="+encodedquery);
            },

            //@guide per ottenere un singolo articolo
            getArticle: function(expressionURI) {
                var expr = {expression: expressionURI};
                var queryURL = buildQueryURL('#query_singleArticle',expr);

                return $http.get(queryURL);
            },

            //@guide per ottenere work degli articoli a partire da un certo titolo
            requestArticlesByTitle: function(articleTitle) {
                var expr = {title: articleTitle};
                var queryURL = buildQueryURL('#query_articlesWork_fromTitle',expr);

                return $http.get(queryURL);
            }
        }
    }]);
