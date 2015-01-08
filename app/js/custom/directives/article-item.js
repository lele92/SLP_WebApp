/**=========================================================
 * Module: article-item.js
 * elemento per le informazioni su un singolo articolo
 =========================================================*/

myApp.directive('articleItem', function(ngDialog, ArticleManagerService) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'app/templates/article-item.html', //todo: path relativo
        scope: {
            articleData: '=',
            articleIndex: '@',
            //biblioFilters: '='            //@todo DA VALUTARE usare un solo oggetto per passare tutti i filtri da applicare alla bibliografia
            yearFilter: '=',                //@guide attributo per passare il filtro per anno di pubblicazione
            orderFilter: '=',               //@guide attributo per passare l'ordinamento da usare
            sortFilter: '=',                //@guide attributo per passare il sort da usare
            onlySelfcitationFilter: '=',    //@guide attributo per passare il filtro per le autocitazioni
            characterizationsFilter: '='    //@guide attributo per passare il filtro per i colori delle citazioni
        },
        link: function($scope, $element, $attributes) {
            $scope.articleIsCollapsed = true;
            var detailsAlreadyFetched = false; //todo: da cambiare: questa info deve stare in ArticleManagerService
            var citDonutChartId;
            var citStackedChartId;

            /* quante cit di tipo color ci sono state nell'anno year */
            var calcNumCites = function(year, color, citInfo) {
                var tmpObj;
                var num = 0;
                //per ogni articolo citante
                for (var key in citInfo) {
                    tmpObj = citInfo[key]
                    // se il citing article è stato pubblicato nell'anno year e ha citato per il motivo color
                    if (tmpObj.citingPubYear == year && tmpObj.color == color) {
                        num++; //allora incremento il numero di citazioni di tipo color per quell'anno
                    }
                }

                return num;
            }

            /* per ogni anno Y in years, quante volte c'è una citazione di tipo color per l'anno Y in citInfo*/
            var calcDataPoints = function(years, color, citInfo) {
                var datapoints = [];
                var year;

                for (var i=0; i < years.length; i++) {
                    year = years[i];
                    var dataPoint = {
                        label: year,
                        y: calcNumCites(year, color, citInfo) //quante cit di tipo color ci sono state nell'anno year
                    }

                    datapoints.push(dataPoint);
                }

                return datapoints;
            }



            /* per ottenere i dati sulle citazioni nel formato richiesto per il donut chart */
            var parseDataForDonutChart = function(citInfo) {
                //algoritmo semplice ma spettacolare
                var colorsDuplicate = [];
                var data = [];
                var tmpLbl;
                var prev = "";

                for (var key in citInfo) {
                    colorsDuplicate.push(citInfo[key].color);
                }
                colorsDuplicate.sort();

                for (var i=0; i<colorsDuplicate.length; i++) {
                    tmpLbl = colorsDuplicate[i];
                    if ( tmpLbl !== prev) {
                        data.push({
                            indexLabel: tmpLbl,
                            y: 1,
                            toolTipContent: "{indexLabel}: {y}"
                        });
                    } else {
                        data[data.length-1].y++;
                    }

                    prev = tmpLbl;
                }

                return data;
            }

            /* per ottenere i dati sulle citazioni nel formato richiesto per lo stacked column chart */
            var parseDataForStackedColumnChart = function(citInfo) {

                var colors = [];
                var colorsDuplicate = [];
                var tmpColor;
                var prev = "";

                //estraggo tutti i colori
                for (var key in citInfo) {
                    colorsDuplicate.push(citInfo[key].color);
                }
                colorsDuplicate.sort(); //ordino

                //elimino i duplicati
                for (var i=0; i < colorsDuplicate.length; i++) {
                    tmpColor = colorsDuplicate[i];
                    if (tmpColor !== prev) {
                        colors.push(tmpColor);
                    }
                    prev = tmpColor;
                }

                var years = [];
                var yearsDuplicate = [];
                var tmpYear;
                var prevYear = 0;

                //estraggo tutti gli anni
                for (var key in citInfo) {
                    yearsDuplicate.push(citInfo[key].citingPubYear);
                }
                yearsDuplicate.sort(function(a, b){return a-b}); //ordino


                //elimino i duplicati
                for (var i=0; i < yearsDuplicate.length; i++) {
                    tmpYear = yearsDuplicate[i];
                    if (tmpYear !== prevYear) {
                        years.push(tmpYear);
                    }
                    prevYear = tmpYear;
                }

                console.log(years)

                // ho valori per l'asse x (years) e label (colors)

                var data = [];

                // per ogni colore vado a calcolare quante citazioni di quel tipo ci sono state ogni anno (anno di pubblicazione dell'articolo citante)
                for (var key in colors) {
                    var dataItem = {
                        type: "stackedColumn",
                        name: colors[key],
                        showInLegend: true,
                        dataPoints: calcDataPoints(years, colors[key], citInfo)
                    }

                    data.push(dataItem);
                }

                return data;
            }

            $scope.generateDonutDivId = function(doi) {
                return citDonutChartId = doi+"_citDonut"
            }

            $scope.generateStackedDivId = function(doi) {
                return citStackedChartId = doi+"_citStacked"
            }

            $scope.toggleArticleDetails = function(expression) {
                $scope.articleIsCollapsed = !$scope.articleIsCollapsed;

                // se il panel non è collassato (vuol dire che pochi attimi fa era collassato, lo stato cambia qui sopra) e se le info non sono già state richieste
                if (!$scope.articleIsCollapsed && !detailsAlreadyFetched) {
                    ArticleManagerService.getCitationsInfo(expression);
                }
            }

            $scope.renderCitStackedChart = function(citationsInfo) {
                // parsing dei dati da visualizzare
                var citData = parseDataForStackedColumnChart(citationsInfo);
                citData.push({}); //mia soluzione per risolvere un bug della libreria: aggiungendo un oggetto vuoto, i colori rispondono come dovrebbero nel caso di un solo tipo di citazione
                console.log(citData);

                //configura il column stacked chart
                var chart = new CanvasJS.Chart(citStackedChartId,
                    {
                        axisY: { title: "cit"},
                        toolTip: { shared: "true"},
                        legend: {
                            fontSize: 20,
                            fontFamily: "sans-serif"
                        },
                        //height: 170,
                        //width: 350,
                        //backgroundColor: "#EBECED",
                        data: citData
                    });

                // visualizza il donut
                chart.render();
            }

            $scope.renderCitDonutChart = function(citationsInfo) {
                // parsing dei dati da visualizzare
                var citData = parseDataForDonutChart(citationsInfo);

                //configura il donut
                var chart = new CanvasJS.Chart(citDonutChartId,
                    {
                        //height: 170,
                        //width: 350,
                        //backgroundColor: "#EBECED",
                        data: [
                            {
                                type: "doughnut",
                                startAngle:  -90,
                                indexLabelFontSize: 12,
                                dataPoints: citData
                            }
                        ]
                    });

                // visualizza il donut
                chart.render();
            }

            $scope.showCitDetails = function() {
                ngDialog.open({
                            template: "app/templates/dialog-citations-details.html"
                        });
            }
        }
    };

});
