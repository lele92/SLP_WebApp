'use strict';

describe('Controller: ArticlesAccordionCtrl', function () {

  // load the controller's module
  beforeEach(module('slpWebApp'));

  var ArticlesaccordionctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticlesaccordionctrlCtrl = $controller('ArticlesAccordionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
