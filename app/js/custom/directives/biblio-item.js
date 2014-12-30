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
            itemData: "="
        },
        link: function($scope) {
            //todo da completare
        }
    };

});
