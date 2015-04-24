// To run this code, edit file 
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// ----------------------------------- 

var myApp = angular.module('SLP_WebApp', ['angle','ngDialog']); //todo: dipendenza dei filtri da mettere in app.init.js
myApp.run(function($log,$rootScope, $state, $stateParams) {

  //guide: https://github.com/angular-ui/ui-router/wiki/Quick-Reference#note-about-using-state-within-a-template
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

});

//todo: valutare se spostare config, potrebbe aver senso creare una directory
myApp.config(function($stateProvider /* ... */) {
  /* specific routes here (see file config.js) */
  $stateProvider
      .state('app.home-search', {
        url: '/homeSearch',
        title: 'Search',
        templateUrl: getMyBasepath('home-search.html'),
        controller: 'HomeSearchController',
        controllerAs: 'HomeSearchCtrl'
          //guide: https://docs.angularjs.org/api/ng/function/angular.extend
          //guide: https://github.com/angular-ui/ui-router/wiki#resolve

            //todo: valutare se e come usarlo
          /*resolve: angular.extend(
           resolveFor(), {

           }
         )*/
      })
      .state('app.articles-results', {
        url: '/articles',
        title: 'Articles',
        templateUrl: getMyBasepath('articles-results.html'),
        controller: 'ArticlesResultsController',
        controllerAs: 'ArticlesResultsCtrl'
      })
});

// Set here the base of the relative path
// for all app views
function getMyBasepath(uri) {
  return 'app/views/appViews/' + uri;
}