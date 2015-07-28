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



}]);
