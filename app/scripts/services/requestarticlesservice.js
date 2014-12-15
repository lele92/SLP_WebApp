'use strict';

/**
 * @ngdoc service
 * @name slpWebApp.RequestArticlesService
 * @description
 * servizio per richiedere al server gli articoli relativi al testo di ricerca
 * Factory in the slpWebApp.
 */
angular.module('slpWebApp')
  .factory('RequestArticlesService', function($http) {
    var textForRequest = "";    // testo per la ricerca

    return {
      /* todo: DA CAMBIARE. funzione stub, in realtà non faccio ancora nessuna richiesta a nessun server, prendo i risultati da un .json
       * bisognerà usare textForRequest per fare la richiesta all'AbstractFinder*/
      getArticles: function() {
        return $http.get('data/expResultsStub.json');
      },

      setText: function(txt) {
        textForRequest = txt;
      },

      getText: function() {
        return textForRequest;
      }
    }
  });
