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
            chartId: "@",
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

            /* per ottenere i dati sulle citazioni nel formato richiesto per il rendering del donut chart */
            var parseData = function(citActsInfo, totCitActs) {
                var data = [];
                for (var key in citActsInfo) {
                    data.push({
                        y: citActsInfo[key].numCitActs,
                        indexLabel: citActsInfo[key].color,
                        toolTipContent: "{indexLabel}: {y}"///"+totCitActs
                    });
                }
                return data;
            }

            /* invocata all'hover del mouse */
            scope.renderChart = function(citActsInfo, totCitActs) {
                // parsing dei dati da visualizzare
                var citData = parseData(citActsInfo, totCitActs);
                console.log(citData);
                // configura il donut
                var chart = new CanvasJS.Chart(attributes.chartId,
                    {
                        height: 150,
                        width: 350,
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




        }
    };

});
