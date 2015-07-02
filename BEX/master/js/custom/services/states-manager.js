/**=========================================================
 * module: states-manager.js
 * servizio per gestire salvataggio e recupero delle informazioni realtive agli articoli mostrati in ogni state
 =========================================================*/

'use strict';

myApp
    .factory('StatesManagerService', ["$sessionStorage", '$rootScope', function($sessionStorage, $rootScope) {
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

		//todo: da eliminare (possibilmente)
		//$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
         //   if (toState.name == "app.articles-results" || toState.name == "app.articles-article") {
         //       lastState.name = toState.name;
         //       lastState.params = toParams;
         //   }
		//})

        return {
	        setState: function(name,params) {
		        lastState.name = name;
		        lastState.params = params;
	        },

            /* salva uno nuovo stato */
            saveState: function(stateType, details) {
                if (details) {
                    lastState.details = details;
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

            getState: function(index) {
              return states[index];
            },

            removeAllStates: function() {
                states.length = 0;
            },

            /* per recuperare l'indice di un certo stato; ritorna -1 se non trovato */
	        //todo: da rivedere i parametri
            getStateIndex: function(type, details) {
                var index = -1;
                for (var key in states) {
                    if (states[key].params.searchType == type && states[key].details == details) {
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