// To run this code, edit file 
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// -----------------------------------

var myApp = angular.module('SLP_WebApp', ['angle']);
//myApp.config(["$locationProvider", function($locationProvider) {
//	$locationProvider.html5Mode(true);
//}]);
myApp.run([ "$log","$rootScope", "$state", "$stateParams", function($log,$rootScope, $state, $stateParams) {

  //guide: https://github.com/angular-ui/ui-router/wiki/Quick-Reference#note-about-using-state-within-a-template
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.offsidebarOverlap = false;
	$rootScope.colorsMap = {
	    "http://purl.org/spar/cito/citesForInformation": {
	        color: "#1693A5" ,
	        toString: "cites for information",
	        value: "http://purl.org/spar/cito/citesForInformation" },
	    "http://purl.org/spar/cito/citesAsMetadataDocument": {
	        color: "#2f9e68",
	        toString: "cites as metadata document",
	        value: "http://purl.org/spar/cito/citesAsMetadataDocument" },
	    "http://purl.org/spar/cito/citesAsDataSource": {
	        color: "#1B6E72",
	        toString: "cites as data source",
	        value: "http://purl.org/spar/cito/citesAsDataSource" },
	    "http://purl.org/spar/cito/citesAsAuthority": {
	        color: "#6B8E23",
	        toString: "cites as authority",
	        value: "http://purl.org/spar/cito/citesAsAuthority" },
	    "http://purl.org/spar/cito/obtainsSupportFrom": {
	        color: "#663399",
	        toString: "obtains support from",
	        value: "http://purl.org/spar/cito/obtainsSupportFrom" },
	    "http://purl.org/spar/cito/includesExcerptFrom": {
	        color: "#2E8B57",
	        toString: "includes excerpt from",
	        value: "http://purl.org/spar/cito/includesExcerptFrom" },
	    "http://purl.org/spar/cito/confirms": {
	        color: "#D8BFD8",
	        toString: "confirms",
	        value: "http://purl.org/spar/cito/confirms" },
	    "http://purl.org/spar/cito/containsAssertionFrom": {
	        color: "#FF6347",
	        toString: "contains assertion from",
	        value: "http://purl.org/spar/cito/containsAssertionFrom" },
	    "http://purl.org/spar/cito/derides": {
	        color: "#CD5C5C",
	        toString: "derides",
	        value: "http://purl.org/spar/cito/derides" },
	    "http://purl.org/spar/cito/includesQuotationFrom": {
	        color: "#DAA520",
	        toString: "includes quotation from",
	        value: "http://purl.org/spar/cito/includesQuotationFrom" },
	    "http://purl.org/spar/cito/citesAsRelated": {
	        color: "#483D8B",
	        toString: "cites as related",
	        value: "http://purl.org/spar/cito/citesAsRelated" },
	    "http://purl.org/spar/cito/usesMethodIn": {
	        color: "#8B0000",
	        toString: "uses method in",
	        value: "http://purl.org/spar/cito/usesMethodIn" },
	    "http://purl.org/spar/cito/documents": {
	        color: "#008B8B",
	        toString: "documents",
	        value: "http://purl.org/spar/cito/documents" },
	    "http://purl.org/spar/cito/describes": {
	        color: "#698296",
	        toString: "describes",
	        value: "http://purl.org/spar/cito/describes" },
	    "http://purl.org/spar/cito/usesConclusionsFrom": {
	        color: "#efca95",
	        toString: "uses conclusions from",
	        value: "http://purl.org/spar/cito/usesConclusionsFrom" },
	    "http://purl.org/spar/cito/repliesTo": {
	        color: "#698296",
	        toString: "replies to",
	        value: "http://purl.org/spar/cito/repliesTo" },
	    "http://purl.org/spar/cito/qualifies": {
	        color: "#653838",
	        toString: "qualifies",
	        value: "http://purl.org/spar/cito/qualifies" },
	    "http://purl.org/spar/cito/corrects": {
	        color: "#7aa33e",
	        toString: "corrects",
	        value: "http://purl.org/spar/cito/corrects" },
	    "http://purl.org/spar/cito/agreesWith": {
	        color: "#6a5ca4",
	        toString: "agrees with",
	        value: "http://purl.org/spar/cito/agreesWith" },
	    "http://purl.org/spar/cito/citesAsEvidence": {
	        color: "#946D67",
	        toString: "cites as evidence",
	        value: "http://purl.org/spar/cito/citesAsEvidence" },
	    "http://purl.org/spar/cito/usesDataFrom": {
	        color: "#b559a2",
	        toString: "uses data from",
	        value: "http://purl.org/spar/cito/usesDataFrom" },
	    "http://purl.org/spar/cito/parodies": {
	        color: "#C71E3F",
	        toString: "parodies",
	        value: "http://purl.org/spar/cito/parodies" },
	    "http://purl.org/spar/cito/critiques": {
	        color: "#3d6e4e",
	        toString: "critiques",
	        value: "http://purl.org/spar/cito/critiques" },
	    "http://purl.org/spar/cito/compiles": {
	        color: "#ac4987",
	        toString: "compiles",
	        value: "http://purl.org/spar/cito/compiles" },
	    "http://purl.org/spar/cito/speculatesOn": {
	        color: "#896fc2",
	        toString: "speculates on",
	        value: "http://purl.org/spar/cito/speculatesOn" },
	    "http://purl.org/spar/cito/extends": {
	        color: "#613e49",
	        toString: "extends",
	        value: "http://purl.org/spar/cito/extends" },
	    "http://purl.org/spar/cito/citesAsSourceDocument": {
	        color: "#c4c5c9",
	        toString: "cites as source document",
	        value: "http://purl.org/spar/cito/citesAsSourceDocument" },
	    "http://purl.org/spar/cito/updates": {
	        color: "#f29598",
	        toString: "updates",
	        value: "http://purl.org/spar/cito/updates" },
	    "http://purl.org/spar/cito/discusses": {
	        color: "#1b3b14",
	        toString: "discusses",
	        value: "http://purl.org/spar/cito/discusses" },
	    "http://purl.org/spar/cito/citesAsPotentialSolution": {
	        color: "#2a2073",
	        toString: "cites as potential solution",
	        value: "http://purl.org/spar/cito/citesAsPotentialSolution" },
	    "http://purl.org/spar/cito/obtainsBackgroundFrom": {
	        color: "#2c51af",
	        toString: "obtains background from",
	        value: "http://purl.org/spar/cito/obtainsBackgroundFrom" },
	    "http://purl.org/spar/cito/reviews": {
	        color: "#302006",
	        toString: "reviews",
	        value: "http://purl.org/spar/cito/reviews" },
	    "http://purl.org/spar/cito/supports": {
	        color: "#7d7b58",
	        toString: "supports",
	        value: "http://purl.org/spar/cito/supports" },
	    "http://purl.org/spar/cito/citesAsRecommendedReading": {
	        color: "#cc370e",
	        toString: "cites as recommended reading",
	        value: "http://purl.org/spar/cito/citesAsRecommendedReading" },
	    "http://purl.org/spar/cito/credits": {
	        color: "#d3ccf0",
	        toString: "credits",
	        value: "http://purl.org/spar/cito/credits" },
	    "http://purl.org/spar/cito/disagreesWith": {
	        color: "#e89ec8",
	        toString: "disagrees with",
	        value: "http://purl.org/spar/cito/disagreesWith" },
	    "http://purl.org/spar/cito/plagiarizes": {
	        color: "#312673",
	        toString: "plagiarizes",
	        value: "http://purl.org/spar/cito/plagiarizes" }
	};
	$rootScope.inheritUrlParams = false;
	$rootScope.paramsTokensDelimiter = ";"
}]);

/* costanti per le tipologie di risultati */
myApp
    .constant("SEARCH_TYPE", {
        abstractSearch: "abstractSearch",
        titleSearch: "titleSearch",
        authorSearch: "authorSearch",
        //singleArticle: "singleArticle",
		singleArticleDoi: "singleArticleDoi"
    })
	.constant("ORDER_BY", {
		publicationYear : "publicationYear",
		title : "title",
		globalCitations : "globalCitations",
		totCitActs : "totCitActs"
	})
	.constant("SORT", {
		desc : true,
		asc : false
	})
	.constant("ARTICLE_TYPES", {
		JournalArticle:"Journal Article",
		ConferencePaper:"Conference Paper",
		JournalReviewArticle:"Journal Review Article",
		JournalEditorial:"Journal Editorial",
		Letter:"Letter",
		Article:"Article"
	})
    .constant("FILTERS_TYPE", {
        Articles_types:"type",
        Articles_afterYear:"afterYear",
        Citations_afterYear:"afterYear",
        Citations_selfCitations:"self citations",
        Citations_authors:"authors",
        Citations_functions:"functions"
    })
	.constant("ARTICLES_REFINEMENTS_PARAMS", "&orderBy&sort&afterYear&type")
;

myApp.config(["$stateProvider","SEARCH_TYPE","ARTICLES_REFINEMENTS_PARAMS", function($stateProvider, SEARCH_TYPE, ARTICLES_REFINEMENTS_PARAMS) {
  $stateProvider
      .state('app.home-search', {
        url: '/homeSearch',
        title: 'Search',
        templateUrl: getMyBasepath('home-search.html'),
        controller: 'HomeSearchController',
        controllerAs: 'HomeSearchCtrl'
      })
      .state('app.articles-results', {
        url: '/articles/?abstract&author&title'+ARTICLES_REFINEMENTS_PARAMS,
        params: {
            newSearch: false,               // se newSearch=true vengono rimpiazzati i risultati di ricerca in LocalStorage e vengono rimossi tutti gli states
            searchQuery: undefined,          // query di ricerca (abstract, titolo, nome autore)
			searchType: undefined
        },
        templateUrl: getMyBasepath('articles-results.html'),
        controller: 'ArticlesResultsController',
        controllerAs: 'ArticlesResultsCtrl',
        onEnter: ["StatesManagerService","$stateParams","ArticlesFiltersManager", function(StatesManagerService,$stateParams,ArticlesFiltersManager){

	        //todo: da rifattorizzare, si può fare di meglio
	        //todo: il parametro searchType è da eliminare
            if (oneSearchParam($stateParams)) {
                if ($stateParams.abstract) {
	                $stateParams.searchType = SEARCH_TYPE.abstractSearch;
	                $stateParams.searchQuery = $stateParams['abstract']
                } else if ($stateParams.author) {
		            $stateParams.searchType = SEARCH_TYPE.authorSearch;
	                $stateParams.searchQuery = $stateParams['author']
	            } else if ($stateParams.title) {
		            $stateParams.searchType = SEARCH_TYPE.titleSearch;
	                $stateParams.searchQuery = $stateParams['title']
	            }
            } else {
	            //todo: notificare che la modalità di ricerca è unica
            }

            function oneSearchParam(params) {
                //todo: da implementare
                return true;
            }
            StatesManagerService.setState("app.articles-results",$stateParams);


        }],
		reloadOnSearch: false
      })
      //.state ('app.author', {
	   //   abstract: true,
		//  url: '/author',
	   //   controller: function() {console.log("baaaaaaaaaaaaaang")},
		//  templateUrl: getMyBasepath('articles-results.html')
      //})
	  .state ('app.author-articles', {
		  url: '/author/:authorId/articles/?'+ARTICLES_REFINEMENTS_PARAMS,
		  title: 'Author articles',
		  params: {
			  newSearch: false,               // se newSearch=true vengono rimpiazzati i risultati di ricerca in LocalStorage e vengono rimossi tutti gli states
			  searchQuery: undefined,          // query di ricerca (abstract, titolo, nome autore)
			  searchType: SEARCH_TYPE.authorSearch
		  },
		  templateUrl: getMyBasepath('articles-results.html'),
		  controller: 'ArticlesResultsController',
		  controllerAs: 'ArticlesResultsCtrl',
		  onEnter: ["ArticlesFiltersManager","StatesManagerService","$stateParams", function(ArticlesFiltersManager,StatesManagerService,$stateParams){

			  $stateParams.searchQuery = $stateParams.authorId;
			  StatesManagerService.setState("app.author-articles",$stateParams);
		  }],
	      reloadOnSearch: false
	  })
      //.state('app.articles-author', {
      //    url: '/articles/author?givenName&familyName',
      //    title: 'Author\'s articles',
      //    templateUrl: getMyBasepath('articles-results.html'),
      //    controller: 'ArticlesResultsController',
      //    controllerAs: 'ArticlesResultsCtrl'
      //})
      //.state('app.articles-article', {
      //    url: '/articles/articleByTitle?title',
      //    title: 'Article',
      //    params: {
      //        searchType: SEARCH_TYPE.singleArticle            // tipologia di ricerca (abstract, titolo, autore)
      //    },
      //    templateUrl: getMyBasepath('articles-results.html'),
      //    controller: 'ArticlesResultsController',
      //    controllerAs: 'ArticlesResultsCtrl',
      //    onEnter: ["StatesManagerService","$stateParams", function(StatesManagerService,$stateParams){
      //        StatesManagerService.setState("app.articles-article",$stateParams);
      //    }]
      //})
	  .state('app.article-doi', {
		  url: '/article/?doi',
		  title: 'Article',
		  params: {
              title: "", //non lo setto a null o undefined per un problema di ui-router che li converte in stringa "null" e "undefined", strano...
			  searchType: SEARCH_TYPE.singleArticleDoi            // tipologia di ricerca (abstract, titolo, autore)
		  },
		  templateUrl: getMyBasepath('articles-results.html'),
		  controller: 'ArticlesResultsController',
		  controllerAs: 'ArticlesResultsCtrl',
		  onEnter: ["StatesManagerService","$stateParams", function(StatesManagerService,$stateParams){
			  StatesManagerService.setState("app.article-doi",$stateParams);
		  }],
		  reloadOnSearch: false
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
          url: '/test/articles/:searchType/:searchQuery?param0&param1',
          title: 'test',
          templateUrl: getMyBasepath('testView.html'),
          controller: 'testController',
          controllerAs: 'testCtrl',
          reloadOnSearch: false
      })


}]);

// Set here the base of the relative path
// for all app views
function getMyBasepath(uri) {
  return 'app/views/appViews/' + uri;
}