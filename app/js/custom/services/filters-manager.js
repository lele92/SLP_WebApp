/**=========================================================
 * module: filters-manager.js
 * servizio per gestire i valori dei filtri impostati nella offsidebar.
 * una collezione di variabili accedibili con getters e setters,
 * per permettere ad article-results (legge i filtri) e filter-offsidebar (imposta i filtri) di comunicare.
 =========================================================*/
'use strict';

myApp
    .factory('FiltersManagerService', function() {
        var startingPublicationYear =  { value: 0}  //anno di partenza per filtri. è un oggetto perchè sto valutando di aggiungere altre property

        return {
            getStartingPublicationYear: function() {
                return startingPublicationYear;
            },

            setStartingPublicationYear: function(newStartingYear) {
                //angular.copy(newStartingYear, startingPublicationYear);
                startingPublicationYear.value = newStartingYear;
            }

        }
    }
);
