/**=========================================================
 * Module: article-item.js
 * elemento per le informazioni su un singolo articolo
 =========================================================*/

myApp.directive('articleItem', function() {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'app/views/article-item.html', //todo: path relativo
        scope: {
            testData: '=',
            articleId: '@'
        }
    };

});
