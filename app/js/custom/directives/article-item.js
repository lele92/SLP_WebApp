/**=========================================================
 * Module: article-item.js
 * elemento per le informazioni su un singolo articolo
 =========================================================*/

myApp.directive('articleItem', function() {
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
        link: function(attrs, $scope) {
            //console.log(attrs);
        }
    };

});
