/**=========================================================
 * module: filters-manager.js
 * servizio per gestire i valori dei filtri impostati per le citazioni.
 * una collezione di variabili accedibili con getters e setters,
 * per permettere ad article-results (legge i filtri) e filter-offsidebar (imposta i filtri) di comunicare.
 =========================================================*/
'use strict';

myApp
    .factory('CitationsFiltersManagerService', ["ArticlesInfoService", "$stateParams", "ORDER_BY", function(ArticlesInfoService, $stateParams, ORDER_BY) {
        var filterActivated = { value: false}               //true se c'è almeno un filtro attivo, false altrimenti
        /* default vars filtri */
        var startingPublicationYear =  { value: 1950};         // anno di partenza per filtri. è un oggetto perchè sto valutando di aggiungere altre property e perchè lo trovo più conveniente
        var selfcitations = { value: false, exclude:true};            // inizialmente mostro tutte le citazioni e quando il filtro viene attivato, di default vengono escluse le autocitazioni
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
        };                      //todo: richiederlo in modo dinamico come con gli autori
        var authors = {value: [], enabled:false}            // lista degli autori per il filtro autori, di default non ce n'è nessuno (non ci posso mettere 930 autori!)...con enabled si decide se (in biblioFilters) gli items devono essere filtrati
        var allAuthors = { value: [] };                //tutti gli autori

        /* vars order by */
        var defaultOrderByValue = ORDER_BY.publicationYear;    // l'ordinamento di default è per anno di pubblicazione
        var defaultSort = true;                      // true-> decrescente, false->crescente
        var orderBy = { value: defaultOrderByValue};    // angular.copy(defaultOrderBy, orderBy); orderBy inzializzato al default; deep copy, non assegnazione per riferimento
        var sort = { value: defaultSort};

        //todo: da testare
        var isEmpty = function(obj) {

            // null and undefined are "empty"
            if (obj == null) return true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        }

        return {
            /* getters e setters per i filtri */
            getFilterActivatedBool: function() {
                return filterActivated;
            },

            setFilterActivated: function(newFilterActivated) {
                filterActivated.value = newFilterActivated;
            },

            getStartingPublicationYearF: function() {
                return startingPublicationYear;
            },

            setStartingPublicationYear: function(newStartingYear) {
                startingPublicationYear.value = newStartingYear;
            },

            // per la lista degli autori filtrati
            getAuthorsF: function() {

                return authors;
            },

            // per impostare la lista degli autori filtrati
            setAuthors: function(newAuthors) {

                authors.value = newAuthors;
                //console.log(authors.value);
            },

            setAuthorsEnabled: function(newAuthorsEnabled) {
                authors.enabled = newAuthorsEnabled;
                //console.log(authors.value);
            },

            //questo è per ottenre tutti gli autori (usato nel typeahead
            //todo: probabilmente da eliminare, ora tutti gli autori sono aggiunti nel rootscope in HomeSearchController
            getAllArticlesAuthors: function() {
                if (isEmpty(allAuthors.value)) {
                    ArticlesInfoService.getAllAuthors().then(
                        function (response) {
                            var authorsFullName = response.data.results.bindings;

                            for (var i in authorsFullName) {
                                allAuthors.value.push(authorsFullName[i].fullName.value);
                            }
                        },
                        //todo caso da gestire meglio
                        function (errResponse) {
                            //ngDialog.open({template: "app/templates/dialog-error.html"});
                            console.error("Error while fetching authors. " + errResponse.status + ": " + errResponse.statusText)
                        }
                    );
                }

                return allAuthors; //non è un problema questo return, è un riferimento
            },

            //da invocare quando che si effettua il drilldown per avere dettagli su un articolo (e quindi anche i dettagli bibliografici)
            //@guide aggiunge un autore alla lista di autori per il filtro
            //addAuthor: function(newAuthor) {
            //
            //    var existing = false // impostato a true se in articlesAuthors c'è già l'autore che si sta cercando di aggiungere ( newAuthors[i] )
            //    for (var j in articlesAuthors) {
            //        if (newAuthor == articlesAuthors.value[j]) {
            //            existing = true;
            //            break;
            //        }
            //    }
            //
            //    if (!existing) {
            //        articlesAuthors.value[newAuthor] = {checked: true};
            //    }
            //},



            getSelfCitationsF: function() {
                return selfcitations;
            },

            setSelfCitations: function(newSelfcitations, newExclude) {
                selfcitations.value = newSelfcitations;
                selfcitations.exclude = newExclude;
            },

            getCharacterizationsF: function() {
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
]);
