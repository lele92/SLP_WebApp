/**=========================================================
 * Module: article-item.js
 * elemento per le informazioni su un singolo articolo
 =========================================================*/

myApp.directive('articleItem', ["ngDialog", "ArticleManagerService", function(ngDialog, ArticleManagerService) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'app/templates/article-item.html', //todo: path relativo
        scope: {
            articleData: '=',
            articleIndex: '@',
            yearFilter: '=',                //@guide attributo per passare il filtro per anno di pubblicazione
            orderFilter: '=',               //@guide attributo per passare l'ordinamento da usare
            sortFilter: '=',                //@guide attributo per passare il sort da usare
            onlySelfcitationFilter: '=',    //@guide attributo per passare il filtro per le autocitazioni
            characterizationsFilter: '=',   //@guide attributo per passare il filtro per i colori delle citazioni
            authorsFilter: '='              //@guide attributo per passare il filtro per gli autori
        },
        link: function($scope, $element, $attributes) {
            $scope.articleIsCollapsed = true;
            var detailsAlreadyRequested = false; //todo: da cambiare: questa info deve stare in ArticleManagerService

            //todo: cambiare nome a questa funzione, fa pena
            $scope.toggleArticleDetails = function(expression, articleAuthors) {
                $scope.articleIsCollapsed = !$scope.articleIsCollapsed;
                //@guide è qui che chiedo le ulteriori info sull'articolo: nel momento in cui lui si dichiara interessato e vuole approfondire
                // se il panel non è collassato (vuol dire che pochi attimi fa era collassato, lo stato cambia qui sopra) e se le info non sono già state richieste
                if (!$scope.articleIsCollapsed && !detailsAlreadyRequested) {
                    detailsAlreadyRequested = !detailsAlreadyRequested
                    ArticleManagerService.getCitationsInfo(expression, articleAuthors);
                    ArticleManagerService.getBiblioInfo(expression, articleAuthors);
                }
            }

            $scope.availableIssue = function(articleData) {
                return articleData.hasOwnProperty("issueNumber") && articleData.hasOwnProperty("volumeNumber");
            }

            $scope.showCitDetails = function() {
                ngDialog.open({
                    template: "app/templates/dialog-citations-details.html",
                    controller: "CitationDetailsDialogController",
                    className: "ngdialog-theme-default-custom",
                    data: {
                        articleData: $scope.articleData,
                        citDonutChartId: "donut_chart",
                        citStackedChartId: "stackedColumn_chart"
                    }
                });
            }

            /* per visualizzare tutti gli articoli di un autore */
            $scope.exploreAuthor = function(givenName, familyName) {
                ArticleManagerService.getArticlesByAuthor(givenName, familyName);
            }

            //$scope.getUniqueCitingItems = function(citingItems) {
            //    var prevExp = "";
            //    var tmpExp = "";
            //    var data = [];
            //    console.log(citingItems);
            //
            //    for (var key in citingItems) {
            //        var tmpItem = citingItems[key];
            //        tmpExp = tmpItem.citingExp.value;
            //
            //        if (tmpExp !== prevExp) {
            //            data.push(tmpItem)
            //        }
            //
            //        prevExp = tmpExp;
            //    }
            //
            //    console.log(data);
            //}
        }
    };

}]);
