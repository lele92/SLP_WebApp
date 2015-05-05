/**=========================================================
 * Module: citing-item.js
 * elemento per le informazioni su un singolo articolo citante
 =========================================================*/

myApp.directive('citingItem', ["ngDialog", "ArticleManagerService", function( ngDialog, ArticleManagerService) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'app/templates/citing-item.html', //todo: path relativo
        scope: {
            itemData: "=",
            citedArticleAuthors: "="
        },
        link: function(scope, element, attributes) {
            scope.emphasizeInTxtRefPointer = function(sentenceTxt, irpTxt) {
                //todo da implementare
                return sentenceTxt;
            }

            /* per avere maggiori info sul corrente elemento citante */
            scope.exploreCitingItem = function() {
                ngDialog.closeAll();
                var strBreadCrumb = "["+scope.itemData.publicationYear+"] "+scope.itemData.title.value.substr(0,40)+"...";
                ArticleManagerService.singleArticleInfo(scope.itemData.articleExpression.value, strBreadCrumb);
            }

            /* per visualizzare tutti gli articoli di un autore */
            scope.exploreAuthor = function(givenName, familyName) {
                ngDialog.closeAll();
                ArticleManagerService.getArticlesByAuthor(givenName, familyName);
            }

            /* se un autore di un citing-item é anche autore dell'articolo citato, allora ritorna true, altrimenti false */
            scope.isSharedAuthor = function(author) {
                for (var i in scope.citedArticleAuthors) {
                    if (scope.citedArticleAuthors[i].fullName === author.fullName) {
                        return true;
                    }
                }

                return false;
            }
        }
    };

}]);

