/**=========================================================
 * module: filters-manager.js
 * servizio per gestire i valori dei filtri impostati nella offsidebar.
 * una collezione di variabili accedibili con getters e setters,
 * per permettere ad article-results (legge i filtri) e filter-offsidebar (imposta i filtri) di comunicare.
 =========================================================*/
'use strict';

myApp
    .factory('FiltersManagerService', function() {
        /* default vars filtri */
        var startingPublicationYear =  { value: 0};     // anno di partenza per filtri. è un oggetto perchè sto valutando di aggiungere altre property e perchè lo trovo più conveniente
        var onlySelfcitations = { value: false};        // inizialmente mostro tutte le citazioni
        var characterizations = { value:
            {
                "http://purl.org/spar/cito/citesForInformation": {
                    toString: "cites For Information",
                    valueURI: "http://purl.org/spar/cito/citesForInformation",
                    checked: true
                },
                "http://purl.org/spar/cito/citesAsMetadataDocument": {
                    toString: "cites As Metadata Document",
                    valueURI: "http://purl.org/spar/cito/citesAsMetadataDocument",
                    checked: true
                },
                "http://purl.org/spar/cito/citesAsDataSource": {
                    toString: "cites As Data Source",
                    valueURI: "http://purl.org/spar/cito/citesAsDataSource",
                    checked: true
                },
                "http://purl.org/spar/cito/citesAsAuthority": {
                    toString: "cites As Authority",
                    valueURI: "http://purl.org/spar/cito/citesAsAuthority",
                    checked: true
                },
                "http://purl.org/spar/cito/obtainsSupportFrom": {
                    toString: "obtains Support From",
                    valueURI: "http://purl.org/spar/cito/obtainsSupportFrom",
                    checked: true
                },
                "http://purl.org/spar/cito/includesExcerptFrom": {
                    toString: "includes Excerpt From",
                    valueURI: "http://purl.org/spar/cito/includesExcerptFrom",
                    checked: true
                },
                "http://purl.org/spar/cito/confirms": {
                    toString: "confirms",
                    valueURI: "http://purl.org/spar/cito/confirms",
                    checked: true
                },
                "http://purl.org/spar/cito/containsAssertionFrom": {
                    toString: "contains Assertion From",
                    valueURI: "http://purl.org/spar/cito/containsAssertionFrom",
                    checked: true
                },
                "http://purl.org/spar/cito/derides": {
                    toString: "derides",
                    valueURI: "http://purl.org/spar/cito/derides",
                    checked: true
                },
                "http://purl.org/spar/cito/includesQuotationFrom": {
                    toString: "includes Quotation From",
                    valueURI: "http://purl.org/spar/cito/includesQuotationFrom",
                    checked: true
                },
                "http://purl.org/spar/cito/citesAsRelated": {
                    toString: "cites As Related",
                    valueURI: "http://purl.org/spar/cito/citesAsRelated",
                    checked: true
                },
                "http://purl.org/spar/cito/usesMethodIn": {
                    toString: "uses Method In",
                    valueURI: "http://purl.org/spar/cito/usesMethodIn",
                    checked: true
                },
                "http://purl.org/spar/cito/documents": {
                    toString: "documents",
                    valueURI: "http://purl.org/spar/cito/documents",
                    checked: true
                },
                "http://purl.org/spar/cito/describes": {
                    toString: "describes",
                    valueURI: "http://purl.org/spar/cito/describes",
                    checked: true
                },
                "http://purl.org/spar/cito/usesConclusionsFrom": {
                    toString: "uses Conclusions From",
                    valueURI: "http://purl.org/spar/cito/usesConclusionsFrom",
                    checked: true
                },
                "http://purl.org/spar/cito/repliesTo": {
                    toString: "replies To",
                    valueURI: "http://purl.org/spar/cito/repliesTo",
                    checked: true
                },
                "http://purl.org/spar/cito/qualifies": {
                    toString: "qualifies",
                    valueURI: "http://purl.org/spar/cito/qualifies",
                    checked: true
                },
                "http://purl.org/spar/cito/corrects": {
                    toString: "corrects",
                    valueURI: "http://purl.org/spar/cito/corrects",
                    checked: true
                },
                "http://purl.org/spar/cito/agreesWith": {
                    toString: "agrees With",
                    valueURI: "http://purl.org/spar/cito/agreesWith",
                    checked: true
                },
                "http://purl.org/spar/cito/citesAsEvidence": {
                    toString: "cites As Evidence",
                    valueURI: "http://purl.org/spar/cito/citesAsEvidence",
                    checked: true
                },
                "http://purl.org/spar/cito/usesDataFrom": {
                    toString: "uses Data From",
                    valueURI: "http://purl.org/spar/cito/usesDataFrom",
                    checked: true
                },
                "http://purl.org/spar/cito/parodies": {
                    toString: "parodies",
                    valueURI: "http://purl.org/spar/cito/parodies",
                    checked: true
                },
                "http://purl.org/spar/cito/critiques": {
                    toString: "critiques",
                    valueURI: "http://purl.org/spar/cito/critiques",
                    checked: true
                },
                "http://purl.org/spar/cito/compiles": {
                    toString: "compiles",
                    valueURI: "http://purl.org/spar/cito/compiles",
                    checked: true
                },
                "http://purl.org/spar/cito/speculatesOn": {
                    toString: "speculates On",
                    valueURI: "http://purl.org/spar/cito/speculatesOn",
                    checked: true
                },
                "http://purl.org/spar/cito/extends": {
                    toString: "extends",
                    valueURI: "http://purl.org/spar/cito/extends",
                    checked: true
                },
                "http://purl.org/spar/cito/citesAsSourceDocument": {
                    toString: "cites As Source Document",
                    valueURI: "http://purl.org/spar/cito/citesAsSourceDocument",
                    checked: true
                },
                "http://purl.org/spar/cito/updates": {
                    toString: "updates",
                    valueURI: "http://purl.org/spar/cito/updates",
                    checked: true
                },
                "http://purl.org/spar/cito/discusses": {
                    toString: "discusses",
                    valueURI: "http://purl.org/spar/cito/discusses",
                    checked: true
                },
                "http://purl.org/spar/cito/citesAsPotentialSolution": {
                    toString: "cites As Potential Solution",
                    valueURI: "http://purl.org/spar/cito/citesAsPotentialSolution",
                    checked: true
                },
                "http://purl.org/spar/cito/obtainsBackgroundFrom": {
                    toString: "obtains Background From",
                    valueURI: "http://purl.org/spar/cito/obtainsBackgroundFrom",
                    checked: true
                },
                "http://purl.org/spar/cito/reviews": {
                    toString: "reviews",
                    valueURI: "http://purl.org/spar/cito/reviews",
                    checked: true
                },
                "http://purl.org/spar/cito/supports": {
                    toString: "supports",
                    valueURI: "http://purl.org/spar/cito/supports",
                    checked: true
                },
                "http://purl.org/spar/cito/citesAsRecommendedReading": {
                    toString: "cites As Recommended Reading",
                    valueURI: "http://purl.org/spar/cito/citesAsRecommendedReading",
                    checked: true
                },
                "http://purl.org/spar/cito/credits": {
                    toString: "credits",
                    valueURI: "http://purl.org/spar/cito/credits",
                    checked: true
                },
                "http://purl.org/spar/cito/disagreesWith": {
                    toString: "disagrees With",
                    valueURI: "http://purl.org/spar/cito/disagreesWith",
                    checked: true
                },
                "http://purl.org/spar/cito/plagiarizes": {
                    toString: "plagiarizes",
                    valueURI: "http://purl.org/spar/cito/plagiarizes",
                    checked: true
                }
            }
        }; //todo: valutare di strutturarlo in modo diverso

        var filterActivated = { value: false} //true se c'è almeno un filtro attivo, false altrimenti

        /* vars order by */
        var defaultOrderByValue = "publicationYear";    // l'ordinamento di default è per anno di pubblicazione
        var defaultSort = true;                      // true-> decrescente, false->crescente
        var orderBy = { value: defaultOrderByValue};    // angular.copy(defaultOrderBy, orderBy); orderBy inzializzato al default; deep copy, non assegnazione per riferimento
        var sort = { value: defaultSort};

        return {
            /* getters e setters per i filtri */
            getFilterActivated: function() {
                return filterActivated;
            },

            setFilterActivated: function(newFilterActivated) {
                filterActivated.value = newFilterActivated;
            },

            getStartingPublicationYear: function() {
                return startingPublicationYear;
            },

            setStartingPublicationYear: function(newStartingYear) {
                startingPublicationYear.value = newStartingYear;
            },

            getOnlySelfCitations: function() {
                return onlySelfcitations;
            },

            setOnlySelfCitations: function(newOnlySelfcitations) {
                onlySelfcitations.value = newOnlySelfcitations;
            },

            getCharacterizations: function() {
                return characterizations;
            },

            setCharacterizations: function(newCharacterizations) {
                characterizations = newCharacterizations;
            },


            /* getters e setters per l'ordinamento dei risultati */ //todo: da valutare: conviene creare un altro servizio solo per l'ordinamento?

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
