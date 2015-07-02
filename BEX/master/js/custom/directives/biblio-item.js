/**=========================================================
 * Module: biblio-item.js
 * elemento per le informazioni su un singolo elemento di una bibliografia
 =========================================================*/

myApp.directive('biblioItem', ["ngDialog","$modal", "ArticleManagerService", "$rootScope","SEARCH_TYPE", function(ngDialog, $modal, ArticleManagerService, $rootScope, SEARCH_TYPE) {
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

                $rootScope.$state.go('app.articles-article', {
                        title: scope.itemData.title
                    }
                );

            }

            /* per visualizzare tutti gli articoli di un autore */
            scope.exploreAuthor = function(givenName, familyName) {
                $rootScope.$state.go('app.articles-results', {
                    newSearch: false,                                // è una nuova ricerca, quindi cancella tutti gli states e salva in sessionStorage i risultati
                    searchType: SEARCH_TYPE.authorSearch,           // è una ricerca per autore
                    searchQuery: givenName+" "+familyName        // nome dell'autore
                });
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
                ngDialog.open({
                    template: "/app/templates/dialog-abstract.html",
                    className: "ngdialog-theme-default-custom",
                    data: {
                        absText: scope.itemData.abstractTxt.value,
                        title: scope.itemData.title
                    }
                });
            }

            scope.openMotivationsDialog = function() {
                ngDialog.open({
                    template: "/app/templates/dialog-motivations.html",
                    controller: ModalMotivationsCtrl,
                    className: "ngdialog-theme-default-custom",
                    data: {
                        citActsInfo: scope.itemData.citActsInfo,
                        title: scope.itemData.title
                    }
                });
            }

            var ModalBiblioCtrl = function ($scope, $modalInstance) {

                $scope.close = function () {
                    $modalInstance.close('closed');
                };

                $scope.absText = scope.itemData.abstractTxt.value;
                $scope.title = scope.itemData.title;
            }

            var ModalMotivationsCtrl = ["$scope", function ($scope) {
                $scope.$storage = {}; //todo: da rivedere: definisco storage per aggirare un possibile bug della direttiva panel-tools, vedere anche generateId()

                $scope.empInTxtRefPointer = function(sentenceTxt, irpTxt) {
                    var empSentence = sentenceTxt.replace(irpTxt, "<span class='irp'><b>"+irpTxt+"</b></span>")
                    return empSentence;
                };

                $scope.generateId = function($index){
                    var elemId = "motivation_"+$index+Math.floor((Math.random() * 100000) + 1);
                    var data = angular.fromJson($scope.$storage["panelState"]);
                    if(!data) {
                        data = {};
                    }
                    data[elemId] = true;
                    $scope.$storage["panelState"] = angular.toJson(data);
                    return elemId;
                }
            }];




        }
    };

}]);
