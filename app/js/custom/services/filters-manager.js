/**=========================================================
 * module: filters-manager.js
 * servizio per gestire i valori dei filtri impostati nella offsidebar.
 * una collezione di variabili accedibili con getters e setters,
 * per permettere ad article-results (legge i filtri) e filter-offsidebar (imposta i filtri) di comunicare.
 =========================================================*/
'use strict';

myApp
    .factory('FiltersManagerService', function() {
        /* vars filtri */
        var startingPublicationYear =  { value: 0};     // anno di partenza per filtri. è un oggetto perchè sto valutando di aggiungere altre property e perchè lo trovo più conveniente

        /* vars order by */
        var defaultOrderByValue = "publicationYear";    // l'ordinamento di default è per anno di pubblicazione
        var defaultSort = "true";                      // true-> decrescente, false->crescente
        var orderBy = { value: defaultOrderByValue};    // angular.copy(defaultOrderBy, orderBy); orderBy inzializzato al default; deep copy, non assegnazione per riferimento
        var sort = { value: defaultSort};

        return {
            getStartingPublicationYear: function() {
                return startingPublicationYear;
            },

            setStartingPublicationYear: function(newStartingYear) {
                //angular.copy(newStartingYear, startingPublicationYear);
                startingPublicationYear.value = newStartingYear;
            },


            /* getters e setters particolari: per l'ordinamento dei risultati */ //todo: da valutare: conviene creare un altro servizio solo per l'ordinamento?

            getOrderBy: function() {
                return orderBy;
            },

            setOrderBy: function(newOrderBy) {
                orderBy.value = newOrderBy;
            },

            getSort: function() {
                return sort;
            },

            setSort: function(newSort) {
                sort.value = newSort;
            },

            restoreDefaultOrderBy: function() {
               // orderBy = angular.copy(defaultOrderBy, orderBy); //deep copy, non assegnazione per riferimento
            }

        }
    }
);
