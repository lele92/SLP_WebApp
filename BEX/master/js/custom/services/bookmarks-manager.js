myApp
	.factory('BookmarksManagerService',['$localStorage',function($localStorage){
		var bookmarks = {};

		if ($localStorage.bookmarks) {
			bookmarks = $localStorage.bookmarks;
		} else {
			$localStorage.bookmarks = bookmarks;
		}

		return{
			saveBookmark: function(articleData) {
				articleData.bookmark = true;
				bookmarks[articleData.doi.value] = articleData;
				console.log(bookmarks);
			},

			deleteBookmark: function(doi) {
				if (bookmarks[doi]) {
					bookmarks[doi].bookmark = false; //necessario per togliere il bookmark anche in articlesResults
					delete bookmarks[doi];
				}
			},

			getBookmark: function(doi) {
				if (bookmarks[doi]){
					return bookmarks[doi];
				}

				return null;
			},

			getBookmarks: function() {
				return bookmarks;
			},

			deleteAllBookmarks: function() {
				bookmarks.length = 0;
			},

			isBookmarked: function(doi) {
				if (bookmarks[doi]) {
					return true;
				}

				return false;
			},

			replaceBookmark: function(articleData) {
				articleData.bookmark = true;
				bookmarks[articleData.doi.value] = articleData;
			}
		}
	}])