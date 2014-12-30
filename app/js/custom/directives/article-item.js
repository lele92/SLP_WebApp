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
            //biblioFilters: '=' //@todo DA VALUTARE usare un solo oggetto per passare tutti i filtri da applicare alla bibliografia
            yearFilter: '@' //@guide attributo per passare il filtro per anno di pubblicazione
        },
        link: function($scope) {
            //todo da completare
        }
    };

});
