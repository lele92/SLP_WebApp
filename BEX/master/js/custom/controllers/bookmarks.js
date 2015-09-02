myApp.controller('BookmarksController',['BookmarksManagerService','$rootScope', function(BookmarksManagerService, $rootScope){
	"use strict";
	var self = this;

	self.bookmarks = BookmarksManagerService.getBookmarks();
	self.numBookmarks = self.bookmarks.length;


	self.removeAllBookmarks = function() {
		BookmarksManagerService.deleteAllBookmarks();
	}

}]);