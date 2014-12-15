'use strict';

describe('Service: RequestArticlesService', function () {

  // load the service's module
  beforeEach(module('slpWebApp'));

  // instantiate service
  var RequestArticlesService;
  beforeEach(inject(function (_RequestArticlesService_) {
    RequestArticlesService = _RequestArticlesService_;
  }));

  it('should do something', function () {
    expect(!!RequestArticlesService).toBe(true);
  });

});
