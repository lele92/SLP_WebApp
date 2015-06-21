if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

// APP START
// ----------------------------------- 

var App = angular.module('angle', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ngSanitize',
    'ngResource',
    'tmh.dynamicLocale',
    'ui.utils'
  ]);

App.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', 'ArticlesInfoService', function ($rootScope, $state, $stateParams, $window, $templateCache, ArticlesInfoService) {
  // Set reference to access them from any scope
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$storage = $window.localStorage;

  // Uncomment this to disable template cache
  /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (typeof(toState) !== 'undefined'){
        $templateCache.remove(toState.templateUrl);
      }
  });*/

  // Scope Globals
  // ----------------------------------- 
  $rootScope.app = {
    name: 'BEX',
    description: 'Web App to search and browse the contents of Semantic Lancet Triplestore',
    year: ((new Date()).getFullYear()),
    layout: {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null
    },
    useFullLayout: false,
    hiddenFooter: false,
    viewAnimation: 'ng-fadeInUp'
  };

    $rootScope.authors = [];
    /*richiedo tutti gli autori*/
    ArticlesInfoService.getAllAuthors().then(
        function (response) {
            $rootScope.authors = [];
            var authorsFullName = response.data.results.bindings;

            for (var i in authorsFullName) {
                $rootScope.authors.push(authorsFullName[i].fullName.value);
            }
        },
        //todo caso da gestire meglio
        function (errResponse) {
            $rootScope.authors = [];
            //ngDialog.open({template: "app/templates/dialog-error.html"});
            console.error("Error while fetching authors. " + errResponse.status + ": " + errResponse.statusText)
        }
    );

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

}]);
