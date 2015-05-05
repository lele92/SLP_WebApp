/**=========================================================
 * Module: nestable.js
 * Initializes the nestable plugin
 =========================================================*/

App.directive('nestable', ["$timeout", function($timeout) {
  return {
    restrict: 'A',
    scope: {
      'nestableControl': '='
    },
    controller: ["$scope", "$element", function($scope, $element) {
      var options = $element.data();
      
      $timeout(function(){
        $element.nestable(options);
      });

      if ( $scope.nestableControl ) {
        var nest = $scope.nestableControl;
        nest.serialize = function() { return $element.nestable('serialize'); };
        nest.expandAll = runMethod('expandAll');
        nest.collapseAll = runMethod('collapseAll');

        $element.on('change', function(){
          if ( typeof nest.onchange === 'function')
            $timeout(function() {
              nest.onchange.apply(arguments);
            });
        });
      }
      
      function runMethod(name) {
        return function() {
          $element.nestable(name);
        };
      }
    }]
  };

}]);
