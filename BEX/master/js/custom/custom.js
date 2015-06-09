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

}]);

/* costanti per le tipologie di risultati */
myApp
    .constant("ARTICLES_RESULTS", {
        searchResults:0,
        authorResults:1,
        singleArticleResults:2
    })
    .constant("SEARCH_TYPE", {
        abstractSearch: 0,
        titleSearch: 1,
        authorSearch: 2
    })
;

myApp.config(["$stateProvider","ARTICLES_RESULTS","SEARCH_TYPE", function($stateProvider, ARTICLES_RESULTS, SEARCH_TYPE) {
  /* specific routes here (see file config.js) */
  $stateProvider
      .state('app.home-search', {
        url: '/homeSearch',
        title: 'Search',
        templateUrl: getMyBasepath('home-search.html'),
        controller: 'HomeSearchController',
        controllerAs: 'HomeSearchCtrl'
      })
      .state('app.articles-results', {
        url: '/searchResults',
        title: 'Search results',
        params: {
            type: ARTICLES_RESULTS.searchResults,
            newSearch: false
        },
        templateUrl: getMyBasepath('articles-results.html'),
        controller: 'ArticlesResultsController',
        controllerAs: 'ArticlesResultsCtrl'
      })
      .state('app.articles-author', {
          url: '/articles/author?givenName&familyName',
          title: 'Author\'s articles',
          params: {
              type: ARTICLES_RESULTS.authorResults
          },
          templateUrl: getMyBasepath('articles-results.html'),
          controller: 'ArticlesResultsController',
          controllerAs: 'ArticlesResultsCtrl'
      })
      .state('app.articles-article', {
          url: '/articles/article?title',
          title: 'Article',
          params: {
              type: ARTICLES_RESULTS.singleArticleResults
          },
          templateUrl: getMyBasepath('articles-results.html'),
          controller: 'ArticlesResultsController',
          controllerAs: 'ArticlesResultsCtrl'
      })
}]);

// Set here the base of the relative path
// for all app views
function getMyBasepath(uri) {
  return 'app/views/appViews/' + uri;
}