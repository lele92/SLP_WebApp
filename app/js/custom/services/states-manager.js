/**=========================================================
 * module: states-manager.js
 * servizio per gestire salvataggio e recupero delle liste di risultati di ricerca
 =========================================================*/

'use strict';

myApp
    .factory('StatesManagerService', function() {
        var statesLists = [];

        return {
            saveCurrentStateArticles: function(articles) {
                statesLists[statesLists.length-1].articles = articles;
            },

            /* invocata nel passaggio da uno stato A ad uno stato B.
            * aggiunge uno stato vuoto (senza lista dei risultati) per B.
            * la lista dei risultati di B verrà aggiunta al passaggio a C*/
            addEmptyState: function(stateVal) {
                statesLists.push({
                    stateValue: stateVal
                });
            },

            getStates: function() {
                return statesLists;
            },

            restoreState: function(stateIndex) {
                for (var i=statesLists.length-1; i>stateIndex; i--) {
                    statesLists.pop();
                }

                return statesLists[stateIndex];
            },

            removeAllStates: function() {
                statesLists.length = 0;
            }


        }
    });