/**=========================================================
 * Module: biblio-item.js
 * elemento per le informazioni su un singolo elemento di una bibliografia
 =========================================================*/

myApp.directive('biblioItem', ["$modal", "ArticleManagerService", "$rootScope", function($modal, ArticleManagerService, $rootScope) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'app/templates/biblio-item.html', //todo: path relativo
        scope: {
            chartId: "@",
            itemData: "=",
            citingArticleAuthors: "="
        },
        link: function(scope, element, attributes) {

            var colorsMap = $rootScope.colorsMap;

            /* per avere maggiori info sul corrente elemento bibliografico */
            scope.exploreBiblioItem = function() {
                var strBreadCrumb = "["+scope.itemData.publicationYear+"] "+scope.itemData.title.substr(0,40)+"...";
                ArticleManagerService.singleArticleInfo(scope.itemData.articleExpression.value, strBreadCrumb);

            }

            /* per visualizzare tutti gli articoli di un autore */
            scope.exploreAuthor = function(givenName, familyName) {
                ArticleManagerService.getArticlesByAuthor(givenName, familyName);
            }


            /* se un autore di un biblio-item é anche autore dell'articolo citante, allora ritorna true, altrimenti false */
            scope.isSharedAuthor = function(author) {
                for (var i in scope.citingArticleAuthors) {
                    if (scope.citingArticleAuthors[i].fullName === author.fullName) {
                        return true;
                    }
                }

                return false;
            }

            /* per ottenere i dati sulle citazioni nel formato richiesto per il rendering del donut chart */
            var parseData = function(citActsInfo, totCitActs) {
                var data = [];
                for (var key in citActsInfo) {
                    data.push({
                        y: citActsInfo[key].numCitActs,
                        indexLabel: citActsInfo[key].color,
                        toolTipContent: "{indexLabel}: {y}",///"+totCitActs,
                        color: colorsMap[citActsInfo[key]["colorURI"]]['color']
                    });
                }
                return data;
            }

            /* invocata all'hover del mouse */
            scope.renderChart = function(citActsInfo, totCitActs) {
                // parsing dei dati da visualizzare
                var citData = parseData(citActsInfo, totCitActs);
                //console.log(citData);
                // configura il donut
                var chart = new CanvasJS.Chart(attributes.chartId,
                    {
                        //height: 170,
                        //width: 350,
                        //backgroundColor: "#EBECED",
                        animationEnabled: true,
                        animationDuration: 1000,
                        data: [
                            {
                                type: "doughnut",
                                startAngle:  -90,
                                indexLabelFontSize: 12,
                                dataPoints: citData
                                //dataPoints: [
                                //    { label: "Germany",       y: 16.6},
                                //    { label: "France",        y: 12.8},
                                //    { label: "United Kingdom",y: 12.3},
                                //    { label: "Italy",         y: 11.9},
                                //    { label: "Spain",         y: 9.0},
                                //    { label: "Poland",        y: 7.7},
                                //    { label: "Other (21 Countries)",y: 29.7}
                                //]
                            }
                        ]
                    });

                // visualizza il donut
                chart.render();
            }

            scope.openAbstractDialog = function() {
                var modalInstanceA = $modal.open({
                    templateUrl: '/app/templates/dialog-abstract.html',
                    controller: ModalBiblioCtrl,
                    size: 'lg'
                });
            }

            scope.openMotivationsDialog = function() {
                var modalInstanceB = $modal.open({
                    templateUrl: '/app/templates/dialog-motivations.html',
                    controller: ModalMotivationsCtrl,
                    size: 'lg'
                });
            }

            var ModalBiblioCtrl = function ($scope, $modalInstance) {

                $scope.close = function () {
                    $modalInstance.close('closed');
                };

                $scope.absText = scope.itemData.abstractTxt.value;
                $scope.title = scope.itemData.title;
            }

            var ModalMotivationsCtrl = function ($scope, $modalInstance) {

                $scope.close = function () {
                    $modalInstance.close('closed');
                };

                $scope.citActsInfo = scope.itemData.citActsInfo;
                $scope.title = scope.itemData.title;
            }




        }
    };

}]);
