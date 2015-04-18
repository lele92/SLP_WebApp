/**=========================================================
 * module: info-authors.js
 * servizio per reperire varie informazioni relative agli autori
 =========================================================*/
'use strict';


myApp
    .factory('AuthorInfoService', function($http,$interpolate) {
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
            requestAuthorArticles: function(familyN, givenN) {
                var expr = {authorFamilyName: familyN, authorGivenName: givenN};
                var queryURL = buildQueryURL('#query_authorArticles',expr);

                return $http.get(queryURL);
            }
        }
    });