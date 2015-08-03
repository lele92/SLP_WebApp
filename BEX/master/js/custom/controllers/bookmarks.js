myApp.controller('BookmarksController',['BookmarksManagerService', function(BookmarksManagerService){
	"use strict";

	var self = this;

	self.bookmarks = BookmarksManagerService.getBookmarks();
	self.numBookmarks = Object.keys(self.bookmarks).length;

	self.removeAllBookmarks = function() {
		BookmarksManagerService.deleteAllBookmarks();
	}

}]);