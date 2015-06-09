/**=========================================================
 * Module: citing-item.js
 * elemento per le informazioni su un singolo articolo citante
 =========================================================*/

myApp.directive('citingItem', ["ngDialog", "ArticleManagerService","$rootScope", function( ngDialog, ArticleManagerService, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'app/templates/citing-item.html', //todo: path relativo
        scope: {
            itemData: "=",
            citedArticleAuthors: "="
        },
        link: function(scope, element, attributes) {
            scope.$storage = {}; //todo: da rivedere: definisco storage per aggirare un possibile bug della direttiva panel-tools, vedere anche generateId()

            scope.emphasizeInTxtRefPointer = function(sentenceTxt, irpTxt) {
                var empSentence = sentenceTxt.replace(irpTxt, "<span class='irp'><b>"+irpTxt+"</b></span>")
                return empSentence;
            }

            scope.generateId = function($index){
                var elemId = "motivation_"+$index+Math.floor((Math.random() * 100000) + 1);
                var data = angular.fromJson(scope.$storage["panelState"]);
                if(!data) {
                    data = {};
                }
                data[elemId] = true;
                scope.$storage["panelState"] = angular.toJson(data);
                return elemId;
            }

            /* per avere maggiori info sul corrente elemento citante */
            scope.exploreCitingItem = function() {
                ngDialog.closeAll();
                //var strBreadCrumb = "["+scope.itemData.publicationYear+"] "+scope.itemData.title.value.substr(0,40)+"...";
                $rootScope.$state.go('app.articles-article', {
                        title: scope.itemData.title.value
                    }
                );
            }

            /* per visualizzare tutti gli articoli di un autore */
            scope.exploreAuthor = function(givenName, familyName) {
                ngDialog.closeAll();
                $rootScope.$state.go('app.articles-author', {
                        givenName: givenName,
                        familyName: familyName
                    }
                );
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

