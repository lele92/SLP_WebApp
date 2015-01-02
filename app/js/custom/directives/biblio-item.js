/**=========================================================
 * Module: biblio-item.js
 * elemento per le informazioni su un singolo elemento di una bibliografia
 =========================================================*/

myApp.directive('biblioItem', function() {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'app/templates/biblio-item.html', //todo: path relativo
        scope: {
            itemData: "=",
            citingArticleAuthors: "="
        },
        link: function(scope, element, attributes) {
            /* se un autore di un biblio-item é anche autore dell'articolo citante, allora ritorn true, altrimenti false */
            scope.isSharedAuthor = function(author) {
                for (var i in scope.citingArticleAuthors) {
                    if (scope.citingArticleAuthors[i].fullName === author.fullName) {
                        return true;
                    }
                }

                return false;
            }

        }
    };

});
