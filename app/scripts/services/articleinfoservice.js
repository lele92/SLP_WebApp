'use strict';

/**
 * @ngdoc service
 * @name slpWebApp.ArticleInfoService
 * @description
 * # ArticleInfoService
 * Factory in the slpWebApp.
 */
angular.module('slpWebApp')
  .factory('ArticleInfoService', function ($http, $interpolate) {
    // todo: variabili da spostare da un'altra parte
    //var endpointURL= "http://two.eelst.cs.unibo.it:8181/data/query";
    var endpointURL = "http://localhost:8181/data/query";
    var prefixes=  $('#prefixes').text();


    // Public API here
    return {
      getArticleInfo: function (article) {
        //todo: da rifattorizzare: in ogni funzione per le query vengono seguiti gli stessi step: delegare ad una funzione apposita (valutare come: funzione anonima, prototype...)
        //todo query da rivedere: serve a prendere tutte le info che mostro nell'accordion relative ad un articolo (di cui ho l'expression)
        var query = prefixes + $interpolate($('#query_articleInfo').text())({expression: article.exp.value});


        var encodedquery = encodeURIComponent(query);
        var queryUrl = endpointURL+"?format=json&query="+encodedquery;

        return $http.get(queryUrl);
      },

      getArticleAuthors: function(article) {
        var query = prefixes + $interpolate($('#query_articleAuthors').text())({authorsList: article.authorsListURI});

        var encodedquery = encodeURIComponent(query);
        var queryUrl = endpointURL+"?format=json&query="+encodedquery;

        return $http.get(queryUrl);
      },

      getIncomingCitations: function(article) {
        var query = prefixes + $interpolate($('#query_incomingCitations').text())({expression: article.exp.value});

        var encodedquery = encodeURIComponent(query);
        var queryUrl = endpointURL+"?format=json&query="+encodedquery;

        return $http.get(queryUrl);
      }
    };
  });
