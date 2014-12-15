'use strict';

/**
 * @ngdoc service
 * @name slpWebApp.ArticleInfoService
 * @description
 * # ArticleInfoService
 * Factory in the slpWebApp.
 */
angular.module('slpWebApp')
  .factory('ArticleInfoService', function ($http) {
    // todo: variabili da spostare da un'altra parte
    var endpointURL= "http://two.eelst.cs.unibo.it:8181/data/query";
    var prefixes= "prefix fabio: <http://purl.org/spar/fabio/>\
                    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
                    prefix core: <http://purl.org/vocab/frbr/core#>\
                    prefix co: <http://purl.org/co/>\
                    prefix foaf: <http://xmlns.com/foaf/0.1/>\
                    prefix pro: <http://purl.org/spar/pro/>\
                    prefix dcterms: <http://purl.org/dc/terms/>\
                    prefix c4o: <http://purl.org/spar/c4o/>\
                    prefix cito: <http://purl.org/spar/cito/>\
                    prefix prism: <http://prismstandard.org/namespaces/basic/2.0/>\
                    prefix sro: <http://salt.semanticauthoring.org/ontologies/sro#>\
                    prefix biro: <http://purl.org/spar/biro>\
                    prefix oa: <http://www.w3.org/ns/oa#>";


    // Public API here
    return {
      getArticleInfo: function (article) {
        /*var query = prefixes + "select ?title " +
          "where {" +
          "<"+article.exp.value+"> a fabio:Expression;" +
          "dcterms:title ?title." +
          "}";*/

        //todo query da rivedere: serve a prendere tutte le info che mostro nell'accordion relative ad un articolo (di cui ho l'expression)
        var query = prefixes + "select ?title ?doi ?abstractTxt ?publicationYear ?absText ?htmlItem ?authorsList ?globalCountSource ?globalCountValue ?globalCountDate\
            where {\
        \
           <"+article.exp.value+"> a fabio:Expression;\
           core:part [ a sro:Abstract;\
                        c4o:hasContent ?abstractTxt];\
                dcterms:title ?title;\
                core:embodiment ?man;\
                prism:doi ?doi;\
                fabio:hasPublicationYear ?publicationYear;\
                c4o:hasGlobalCitationFrequency [ a c4o:GlobalCitationCount;\
                                                    c4o:hasGlobalCountSource ?globalCountSource;\
                                                    c4o:hasGlobalCountValue ?globalCountValue;\
                                                    c4o:hasGlobalCountDate ?globalCountDate];\
                core:realizationOf [ a fabio:Work;\
                                        core:creator ?authorsList ].\
        \
            ?authorsList a co:List.\
        \
            ?man a fabio:Manifestation, fabio:WebPage;\
                dcterms:format <http://purl.org/NET/mediatypes/text/html>;\
                core:exemplar ?htmlItem.\
        }";

        var encodedquery = encodeURIComponent(query);
        var queryUrl = endpointURL+"?format=json&query="+encodedquery;

        return $http.get(queryUrl);
      }
    };
  });
