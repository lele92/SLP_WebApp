/**=========================================================
 * module: states-manager.js
 * servizio per gestire salvataggio e recupero delle informazioni realtive agli articoli mostrati in ogni state
 =========================================================*/

'use strict';

myApp
    .factory('StatesManagerService', ["ARTICLES_RESULTS", "$sessionStorage", '$rootScope', function(ARTICLES_RESULTS, $sessionStorage, $rootScope) {
        var states = [];
        var lastState = {state: undefined, params: undefined};

        if ($sessionStorage.states) {
            states = $sessionStorage.states;
        } else {
            $sessionStorage.states = states;
        }

        if ($sessionStorage.lastState ) {
            lastState = $sessionStorage.lastState;
        } else {
            $sessionStorage.lastState = lastState;
        }

        /* single state example:
        * {
        *   Type: SearchResults/AuthorArticles/SingleArticle
        *   details: SearchString/AuthorName/articleTitle
        *   articles: []
        * }
        * */

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if (toState.name == "app.articles-results" || toState.name == "app.articles-author" || toState.name == "app.articles-article") {
                console.log("aggiorno last state!", toState, toParams);
                lastState.state = toState;
                lastState.params = toParams;
            }
        })

        return {

            /* salva uno nuovo stato */
            saveState: function(stateType, details) {
                if (details) {
                    lastState.type = stateType;
                    lastState.details = details;
                    if (lastState.state && lastState.state.name == "app.articles-results" && lastState.params.newSearch == true) {
                        lastState.params.newSearch = false;
                    }
                    var newState = angular.copy(lastState);
                    states.push(newState);
                }
            },

            /* recupera uno stato ed elimina tutti i successivi */
            restoreState: function(index) {
                for (var i=states.length-1; i>index; i--) {
                    states.pop();
                }

                return states[index];
            },

            getStates: function() {
                return states;
            },

            removeAllStates: function() {
                states.length = 0;
            },

            /* per recuperare l'indice di un certo stato; ritorna -1 se non trovato */
            getStateIndex: function(type, details) {
                var index = -1;
                for (var key in states) {
                    if (states[key].type == type && states[key].details == details) {
                        index = key;
                        break;
                    }
                }

                return index;
            },

            getLastState: function() {
                return lastState;
            }


        }
    }]);