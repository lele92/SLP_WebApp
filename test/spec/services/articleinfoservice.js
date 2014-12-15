'use strict';

describe('Service: ArticleInfoService', function () {

  // load the service's module
  beforeEach(module('slpWebApp'));

  // instantiate service
  var ArticleInfoService;
  beforeEach(inject(function (_ArticleInfoService_) {
    ArticleInfoService = _ArticleInfoService_;
  }));

  it('should do something', function () {
    expect(!!ArticleInfoService).toBe(true);
  });

});
