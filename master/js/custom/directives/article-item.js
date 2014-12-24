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
            articleId: '@'
        },
        link: function($scope) {

        }
    };

});
