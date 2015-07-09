// To run this code, edit file 
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// -----------------------------------

var myApp = angular.module('SLP_WebApp', ['angle']);
myApp.run([ "$log","$rootScope", "$state", "$stateParams", function($log,$rootScope, $state, $stateParams) {

  //guide: https://github.com/angular-ui/ui-router/wiki/Quick-Reference#note-about-using-state-within-a-template
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.offsidebarOverlap = false;

}]);

/* costanti per le tipologie di risultati */
myApp
    .constant("SEARCH_TYPE", {
        abstractSearch: "abstractSearch",
        titleSearch: "titleSearch",
        authorSearch: "authorSearch",
        singleArticle: "singleArticle",
		singleArticleDoi: "singleArticleDoi"
    })
	.constant("ORDER_BY", {
		publicationYear : "publicationYear",
		title : "title",
		globalCitations : "globalCountValue",
		totCitActs : "totCitActs"
	})
	.constant("ARTICLE_TYPES", {
		JournalArticle:"Journal Article",
		ConferencePaper:"Conference Paper",
		JournalReviewArticle:"Journal Review Article",
		JournalEditorial:"Journal Editorial",
		Letter:"Letter",
		Article:"Article"
	})
;

myApp.config(["$stateProvider","SEARCH_TYPE", function($stateProvider, SEARCH_TYPE) {
  $stateProvider
      .state('app.home-search', {
        url: '/homeSearch',
        title: 'Search',
        templateUrl: getMyBasepath('home-search.html'),
        controller: 'HomeSearchController',
        controllerAs: 'HomeSearchCtrl'
      })
      .state('app.articles-results', {
        url: '/searchResults?searchType&searchQuery',
        title: 'Search results',
        params: {
            searchType: undefined,          // tipologia di ricerca (abstract, titolo, autore)
            newSearch: false,               // se newSearch=true vengono rimpiazzati i risultati di ricerca in LocalStorage e vengono rimossi tutti gli states
            searchQuery: undefined          // query di ricerca (abstract, titolo, nome autore)

        },
        templateUrl: getMyBasepath('articles-results.html'),
        controller: 'ArticlesResultsController',
        controllerAs: 'ArticlesResultsCtrl',
        onEnter: ["StatesManagerService","$stateParams", function(StatesManagerService,$stateParams){
            StatesManagerService.setState("app.articles-results",$stateParams);
        }]
      })
      //.state('app.articles-author', {
      //    url: '/articles/author?givenName&familyName',
      //    title: 'Author\'s articles',
      //    templateUrl: getMyBasepath('articles-results.html'),
      //    controller: 'ArticlesResultsController',
      //    controllerAs: 'ArticlesResultsCtrl'
      //})
      .state('app.articles-article', {
          url: '/articles/articleByTitle?title',
          title: 'Article',
          params: {
              searchType: SEARCH_TYPE.singleArticle            // tipologia di ricerca (abstract, titolo, autore)
          },
          templateUrl: getMyBasepath('articles-results.html'),
          controller: 'ArticlesResultsController',
          controllerAs: 'ArticlesResultsCtrl',
          onEnter: ["StatesManagerService","$stateParams", function(StatesManagerService,$stateParams){
              StatesManagerService.setState("app.articles-article",$stateParams);
          }]
      })
	  .state('app.articles-article-doi', {
		  url: '/articles/articleByDoi?doi',
		  title: 'Article',
		  params: {
			  searchType: SEARCH_TYPE.singleArticleDoi            // tipologia di ricerca (abstract, titolo, autore)
		  },
		  templateUrl: getMyBasepath('articles-results.html'),
		  controller: 'ArticlesResultsController',
		  controllerAs: 'ArticlesResultsCtrl',
		  onEnter: ["StatesManagerService","$stateParams", function(StatesManagerService,$stateParams){
			  StatesManagerService.setState("app.articles-article-doi",$stateParams);
		  }]
	  })
      .state('app.bookmarks', {
          url: '/bookmarks',
          title: 'Bookmarks',
          templateUrl: getMyBasepath('bookmarks.html'),
          controller: 'BookmarksController',
          controllerAs: 'BookmarksCtrl'
      })
      .state('app.settings', {
          url: '/settings',
          title: 'Settings',
          templateUrl: getMyBasepath('settings.html'),
          controller: 'SettingsController',
          controllerAs: 'SettingsCtrl'
      })
      .state('app.about', {
          url: '/about',
          title: 'About',
          templateUrl: getMyBasepath('about.html'),
          controller: 'AboutController',
          controllerAs: 'AboutCtrl'
      })
      .state('app.stateTest', {
          url: '/test?param0',
          title: 'test',
          templateUrl: getMyBasepath('testView.html'),
          controller: 'testController',
          controllerAs: 'testCtrl'
      })


}]);

// Set here the base of the relative path
// for all app views
function getMyBasepath(uri) {
  return 'app/views/appViews/' + uri;
}