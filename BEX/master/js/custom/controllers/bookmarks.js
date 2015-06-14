myApp.controller('BookmarksController',['BookmarksManagerService', function(BookmarksManagerService){
	"use strict";

	var self = this;

	self.bookmarks = BookmarksManagerService.getBookmarks();

}]);