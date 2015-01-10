/**=========================================================
 * Module: citing-item.js
 * elemento per le informazioni su un singolo articolo citante
 =========================================================*/

myApp.directive('citingItem', function( $modal) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'app/templates/citing-item.html', //todo: path relativo
        scope: {
            itemData: "=",
            citedArticleAuthors: "="
        },
        link: function(scope, element, attributes) {
            /* se un autore di un citing-item é anche autore dell'articolo citato, allora ritorna true, altrimenti false */
            scope.isSharedAuthor = function(author) {
                for (var i in scope.citedArticleAuthors) {
                    if (scope.citedArticleAuthors[i].fullName === author.fullName) {
                        return true;
                    }
                }

                return false;
            }

            scope.open = function() {
                var modalInstance = $modal.open({
                    templateUrl: '/app/templates/dialog-abstract.html',
                    controller: ModalInstanceCtrl,
                    size: 'lg'
                });
            }

            var ModalInstanceCtrl = function ($scope, $modalInstance) {

                $scope.close = function () {
                    $modalInstance.close('closed');
                };

                $scope.absText = scope.itemData.abstractTxt.value;
                $scope.title = scope.itemData.title.value;
            };
        }
    };

});

