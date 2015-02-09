/**=========================================================
 * module: articles-manager.js
 * servizio per gestire gli articoli
 =========================================================*/
'use strict';

myApp
    .factory('ArticleManagerService', function(RequestArticlesService, FiltersManagerService,  ArticlesInfoService, StatesManagerService, AuthorInfoService, ngDialog, $rootScope, $interval) {
        var articlesResults = [];
        var mockResults = [

            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826806000230" //cit
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826809000225" //cit
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826808000838" //cit
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826808000413" //cit
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S157082680500017X" //cit
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000144" //cit
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000132" //cit
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826807000169" //cit
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000041" //todo: questo è un caso di errore in bibliografia
            },

            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000168"
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826803000027"
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826811000813"
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826803000088"
            },
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000223"
            } ,
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826811000187"
            } ,
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000168"
            } ,
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000193"
            } ,
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000272"
            } ,
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000284"
            } ,
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000338"
            } ,
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826812000388"
            }
        ];
        var colorsMap = {
            "http://purl.org/spar/cito/citesForInformation": { toString: "cites for information", value: "http://purl.org/spar/cito/citesForInformation" },
            "http://purl.org/spar/cito/citesAsMetadataDocument": { toString: "cites as metadata document", value: "http://purl.org/spar/cito/citesAsMetadataDocument" },
            "http://purl.org/spar/cito/citesAsDataSource": { toString: "cites as data source", value: "http://purl.org/spar/cito/citesAsDataSource" },
            "http://purl.org/spar/cito/citesAsAuthority": { toString: "cites as authority", value: "http://purl.org/spar/cito/citesAsAuthority" },
            "http://purl.org/spar/cito/obtainsSupportFrom": { toString: "obtains support from", value: "http://purl.org/spar/cito/obtainsSupportFrom" },
            "http://purl.org/spar/cito/includesExcerptFrom": { toString: "includes excerpt from", value: "http://purl.org/spar/cito/includesExcerptFrom" },
            "http://purl.org/spar/cito/confirms": { toString: "confirms", value: "http://purl.org/spar/cito/confirms" },
            "http://purl.org/spar/cito/containsAssertionFrom": { toString: "contains assertion from", value: "http://purl.org/spar/cito/containsAssertionFrom" },
            "http://purl.org/spar/cito/derides": { toString: "derides", value: "http://purl.org/spar/cito/derides" },
            "http://purl.org/spar/cito/includesQuotationFrom": { toString: "includes quotation from", value: "http://purl.org/spar/cito/includesQuotationFrom" },
            "http://purl.org/spar/cito/citesAsRelated": { toString: "cites as related", value: "http://purl.org/spar/cito/citesAsRelated" },
            "http://purl.org/spar/cito/usesMethodIn": { toString: "uses method in", value: "http://purl.org/spar/cito/usesMethodIn" },
            "http://purl.org/spar/cito/documents": { toString: "documents", value: "http://purl.org/spar/cito/documents" },
            "http://purl.org/spar/cito/describes": { toString: "describes", value: "http://purl.org/spar/cito/describes" },
            "http://purl.org/spar/cito/usesConclusionsFrom": { toString: "uses conclusions from", value: "http://purl.org/spar/cito/usesConclusionsFrom" },
            "http://purl.org/spar/cito/repliesTo": { toString: "replies to", value: "http://purl.org/spar/cito/repliesTo" },
            "http://purl.org/spar/cito/qualifies": { toString: "qualifies", value: "http://purl.org/spar/cito/qualifies" },
            "http://purl.org/spar/cito/corrects": { toString: "corrects", value: "http://purl.org/spar/cito/corrects" },
            "http://purl.org/spar/cito/agreesWith": { toString: "agrees with", value: "http://purl.org/spar/cito/agreesWith" },
            "http://purl.org/spar/cito/citesAsEvidence": { toString: "cites as evidence", value: "http://purl.org/spar/cito/citesAsEvidence" },
            "http://purl.org/spar/cito/usesDataFrom": { toString: "uses data from", value: "http://purl.org/spar/cito/usesDataFrom" },
            "http://purl.org/spar/cito/parodies": { toString: "parodies", value: "http://purl.org/spar/cito/parodies" },
            "http://purl.org/spar/cito/critiques": { toString: "critiques", value: "http://purl.org/spar/cito/critiques" },
            "http://purl.org/spar/cito/compiles": { toString: "compiles", value: "http://purl.org/spar/cito/compiles" },
            "http://purl.org/spar/cito/speculatesOn": { toString: "speculates on", value: "http://purl.org/spar/cito/speculatesOn" },
            "http://purl.org/spar/cito/extends": { toString: "extends", value: "http://purl.org/spar/cito/extends" },
            "http://purl.org/spar/cito/citesAsSourceDocument": { toString: "cites as source document", value: "http://purl.org/spar/cito/citesAsSourceDocument" },
            "http://purl.org/spar/cito/updates": { toString: "updates", value: "http://purl.org/spar/cito/updates" },
            "http://purl.org/spar/cito/discusses": { toString: "discusses", value: "http://purl.org/spar/cito/discusses" },
            "http://purl.org/spar/cito/citesAsPotentialSolution": { toString: "cites as potential solution", value: "http://purl.org/spar/cito/citesAsPotentialSolution" },
            "http://purl.org/spar/cito/obtainsBackgroundFrom": { toString: "obtains background from", value: "http://purl.org/spar/cito/obtainsBackgroundFrom" },
            "http://purl.org/spar/cito/reviews": { toString: "reviews", value: "http://purl.org/spar/cito/reviews" },
            "http://purl.org/spar/cito/supports": { toString: "supports", value: "http://purl.org/spar/cito/supports" },
            "http://purl.org/spar/cito/citesAsRecommendedReading": { toString: "cites as recommended reading", value: "http://purl.org/spar/cito/citesAsRecommendedReading" },
            "http://purl.org/spar/cito/credits": { toString: "credits", value: "http://purl.org/spar/cito/credits" },
            "http://purl.org/spar/cito/disagreesWith": { toString: "disagrees with", value: "http://purl.org/spar/cito/disagreesWith" },
            "http://purl.org/spar/cito/plagiarizes": { toString: "plagiarizes", value: "http://purl.org/spar/cito/plagiarizes" }
        };
        var isRetrievingArticlesInfo = false;               // indica se è in atto un'interrogazione a fuseki per avere le info sugli articoli (risultati di ricerca)
        var articlesNum = 0;                                // numero totale di articoli di cui richiedere le info
        var completedArticles = articlesResults.length;     // numero di richieste completate = numero di articoli nella lista degli articoli...semplice
        //todo: non è la migliore delle soluzioni, valutare alternative
        var resultsStates = {                                      // stati dei risultati
            "NOT_AVAILABLE" : 0,    // non disponibili, non ancora richiesti: non è ancora partita una richiesta o arrivata una risposta dall'abstract finder
            "RESULTS" : 1,          // sono presenti dei risultati
            "NO_RESULTS" : 2        // non sono presenti risultati
        }
        var articlesResultsState = resultsStates.NOT_AVAILABLE;    // in che stato si trovano i risultati di ricerca


        /* utility per convertire la stringa in int */
        var stringToInt = function(str) {
            //se obj è una stringa lo converte in numero; so già che è una stringa, ma non si sa mai...
            if (angular.isString(str)) {
                return parseInt(str);
            }

            return str;
        };

        /* calcola il numero di atti citazionali da un articolo ad un altro */
        var countNumCitActs = function(citActsInfo) {
            var count = 0;
            for (var i in citActsInfo) {
                count += citActsInfo[i].numCitActs;
            }

            return count;
        }

        /* converte uri colore citazione in stringa facilmente leggibile */
        var mapColorToString = function(colorURI) {
            return colorsMap[colorURI].toString;
        }

        /* per raggruppare gli atti citazionali per colore */
        var groupCitActsInfo = function(citActsInfo) {
            var groupedCitActInfo = [];

            for (var key in citActsInfo) {
                citActsInfo[key].colorURI = citActsInfo[key].color.value;
                citActsInfo[key].color = mapColorToString(citActsInfo[key].color.value);
            }

            citActsInfo.sort(function compare(a,b) {
                if (a.color < b.color)
                    return -1;
                if (a.color > b.color)
                    return 1;
                return 0;
            });

            var tmpInfo;
            var prev = {color: ""};

            for (var i=0; i<citActsInfo.length; i++) {
                var tmpInfo = citActsInfo[i];
                if ( tmpInfo.color !== prev.color) {
                    groupedCitActInfo.push({
                        colorURI: tmpInfo.colorURI,
                        color: tmpInfo.color,
                        numCitActs: 1,
                        inTextRefPointers: [{
                            irpTxt: tmpInfo.irpTxt.value,
                            sentenceTxt: tmpInfo.sentenceTxt.value
                        }]
                    });
                } else {
                    groupedCitActInfo[groupedCitActInfo.length-1].numCitActs++;
                    groupedCitActInfo[groupedCitActInfo.length-1].inTextRefPointers.push({
                        irpTxt: tmpInfo.irpTxt.value,
                        sentenceTxt: tmpInfo.sentenceTxt.value
                    });
                }

                prev = tmpInfo;
            }
            return groupedCitActInfo;
        }

        /* per le info sui citation acts di un certo item X della bibliografia:  per ogni elemento della bibliografia, quante volte X è citato dal citingEntity per un certo motivo*/
        var getBiblioItemCitActsInfo = function(citingEntityExpression, biblioItem) {
            //I param: citing entity - II param: cited entity
            ArticlesInfoService.getCitationActsInfoNotGrouped(citingEntityExpression, biblioItem.citedExpression.value).then(
                function (response) {
                    var citActsInfoNotGrouped = response.data.results.bindings;
                    console.log("############");
                    console.log(citActsInfoNotGrouped);
                    console.log("############");
                    biblioItem.citActsInfo = groupCitActsInfo(citActsInfoNotGrouped);
                    biblioItem.totCitActs = countNumCitActs(biblioItem.citActsInfo);
                },
                //todo caso da gestire meglio
                function (errResponse) {
                    console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                }
            );
        }

        var noData = function(res) {
            return res.data == "";
        }

        /* cerca autori in comune tra l'articolo dei risultati di ricerca e il citato/citante:
         * - se ce n'è almeno uno allora si tratta di una autocitazione
         * - il nome di ogni autore condiviso viene aggiunto ad un array: verrà poi usato per evidenziare gli autori condivisi nel subItem*/
        var setSelfcitationInfo = function(subItem, citingArticleAuthors) {
            //fixme: potenziale problema di sincronizzazione: vengono confrontati gli autori del subItem con gli autori dell'articolo citante,
            // ma questi ultimi sono il risultato di una chiamata asincrona, quindi in teoria potrebbero non essere ancora disponibili quando si effettuano i controlli
            // per il momento se si verifica un caso del genere non faccio nessun confronto e notifico il problema, per questo il seguente if
            // prima idea per risolvere: se non ci sono i citingArticleAuthors, chiederli qui
            if(citingArticleAuthors !== undefined && subItem.authors !== undefined) {
                subItem.sharedAuthors = [];
                subItem.isSelfcitation = false;
                var tmpAuthor;

                for (var bIndex in subItem.authors) {
                    tmpAuthor = subItem.authors[bIndex];

                    for (var index in citingArticleAuthors) {

                        if (citingArticleAuthors[index].fullName === tmpAuthor.fullName) {
                            subItem.isSelfcitation = true; //si, lo reimposto a true più volte, non dovrebbe essere un problema
                            subItem.sharedAuthors.push(tmpAuthor.fullName);
                        }
                    }
                }
            } else {
                alert("Non è stato possibile stabilire se '"+subItem.title+"' sia una autocitazione");
            }
        }

        /* per recuperare gli autori di un articolo dei risultati di ricerca */
        var getArticleAuthors = function(article) {
            ArticlesInfoService.getArticleAuthors(article.authorsList.value).then(
                function (response) {
                    article.authors = response.data.results.bindings;
                    for (var i in article.authors) {
                        article.authors[i].fullName = article.authors[i].fullName.value;
                    }

                },
                //todo caso da gestire meglio
                function (errResponse) {
                    console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                }
            );
        }

        /* per la lista degli autori di un certo subItem
        * subItem: articolo citato o citante dall'/l' articolo dei risultati di ricerca*/
        //I param: subItem, II param: array autori articolo citante/citato, III param: true se gli autori vanno aggiunti alla lista degli autori per i filtri; II param serve per capire se si tratta di autocitazione
        var getSubItemAuthors = function(subItem, resultArticleAuthors, addToFilterAuthors) {
            ArticlesInfoService.getArticleAuthors(subItem.authorsList.value).then(
                function (response) {
                    subItem.authors = response.data.results.bindings;
                    for (var i in subItem.authors) {
                        subItem.authors[i].fullName = subItem.authors[i].fullName.value;

                        //per aggiungere l'autore alla lista degli autori per il filtro
                        //if (addToFilterAuthors) {
                        //    FiltersManagerService.addAuthor( subItem.authors[i].fullName);
                        //}
                    }

                    setSelfcitationInfo(subItem, resultArticleAuthors);
                },
                //todo caso da gestire meglio
                function (errResponse) {
                    console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                }
            );
        };

        var getInTextRefPointers = function(color, citingExp, citationsInfo) {
            var inTxtRefPointers = [];

            for (var key in citationsInfo) {
                if (citationsInfo[key].citingExp.value == citingExp && citationsInfo[key].color == color) {
                    inTxtRefPointers.push({
                        irpTxt: citationsInfo[key].irpTxt,
                        sentenceTxt: citationsInfo[key].sentenceTxt
                    });
                }
            }

            return inTxtRefPointers;
        }

        var setCitingArticleMotivations = function(citingArticle, citationsInfo) {
            //todo: questa funzione si può scrivere meglio, lo so....

            citingArticle.motivations = [];

            var colorsDuplicate = [];
            var tmpColor;
            var prev = "";
            var tmpC;
            var colors = [];

            // prendo tutti i colori per citing article cita
            for (var key in citationsInfo) {
                //se l'expression (citing entity) del citation act che sto considerando == l'expression dell'articolo di cui voglio sapere i motivi citazionali
                if (citationsInfo[key].citingExp.value == citingArticle.citingExp.value) {
                    colorsDuplicate.push(citationsInfo[key].color); //allora lo aggiungo alla lista
                }

            }
            colorsDuplicate.sort();


            // creo una lista di motivations con i colori unici
            for (var i=0; i<colorsDuplicate.length; i++) {
                tmpC = colorsDuplicate[i];
                if ( tmpC !== prev) {
                    citingArticle.motivations.push({
                        colorStr: tmpC,
                        inTextRefPointers : getInTextRefPointers(tmpC, citingArticle.citingExp.value, citationsInfo)
                    });
                }

                prev = tmpC;
            }

            console.log(citingArticle.motivations);
        }

        /* per ottenere le info sugli articoli citanti, presi singolarmente */
        // expression: expression del citedArticle
        // citedArticleAuthors: lista degli autori dell'articolo citato, mi serve per vedere se ce ne sono di condivisi
        // citationsInfo: oggetto { citingExpression, annoPubCitingArticle, colore, irpTxt, sentenceTxt } per ogni citazione verso l'articolo citato, quindi con expression potenzialmente duplicati
        var getCitingArticles = function(citedArticle, expression, citedArticleAuthors, citationsInfo) {
            //todo controllare che articlesResults sia definito

            return ArticlesInfoService.requestCitingArticles(expression).then(
                // success
                function(response) {
                    citedArticle.citingArticles = response.data.results.bindings;

                    //per ogni articolo citante
                    for (var j in citedArticle.citingArticles) {
                        var citingArticle = citedArticle.citingArticles[j];
                        citingArticle.publicationYear = parseInt(citingArticle.publicationYear.value);

                        getSubItemAuthors(citingArticle, citedArticleAuthors, false);  //prendo gli autori e controllo se ce ne sono di condivisi con l'articolo citato
                        setCitingArticleMotivations(citingArticle, citationsInfo);           //per ogni articolo prendo i motivi per cui cita
                    }
                },

                // error
                //todo caso da gestire meglio
                function(errResponse) {
                    console.error("Error while fetching articles. "+errResponse.status+": "+errResponse.statusText);
                }
            );
        }

        var getSingleArticleInfo = function(artExpression) {
            return ArticlesInfoService.getArticle(artExpression).then(
                function(response) {
                    var art = response.data.results.bindings[0];
                    articlesResults.length = 0;

                    art.publicationYear = stringToInt(art.publicationYear.value);
                    art.title = art.title.value;
                    art.globalCountValue = stringToInt(art.globalCountValue.value);
                    articlesResults.push(art); //aggiungo l'articolo, questo farà da trigger per il watchCollection nel controller degli articolo e la view si aggiornerà per magia (si aggiorna comunque perchè articles è passato per riferimento, ma con il watch aggiungo del comportamento )
                    articlesNum = 1;
                    completedArticles = 1;

                    //@guide richiedo la lista degli autori
                    getArticleAuthors(art);

                    //@guide richiedo le info sulle citazioni (in entrata)
                    ArticlesInfoService.getArticleCitationsInfo(art.expression.value).then(
                        function (response) {
                            art.inCitActs = response.data.results.bindings[0].numCitActs.value; //numero di citation acts
                            art.inNumCites = response.data.results.bindings[0].numCites.value;  //numero di cites (<= numero di citation acts), citazioni uniche
                        },
                        //todo caso da gestire meglio
                        function (errResponse) {
                            console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                        }
                    );
                },

                //todo caso da gestire meglio
                function (errResponse) {
                    console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                }
            );


        }

        var openErrorDialog = function() {
            ngDialog.open({
                template: "app/templates/dialog-error.html",
                controller: function($rootScope, $scope) {
                }
            });
        }


        return {
            getArticles: function() {
                return articlesResults;
            },

            getColorsMap: function() {
              return colorsMap;
            },

            isRetrievingArticlesInfo: function() {
              return isRetrievingArticlesInfo;
            },

            setCompletedRetrievingArticlesInfo: function() {
              isRetrievingArticlesInfo = false;
            },

            getArticlesNum: function() {
                return articlesNum;
            },

            getCompletedArticles: function() {
                return completedArticles = articlesResults.length;
            },

            getResultsStates: function() {
                return resultsStates;
            },

            getArticlesResultsState: function() {
                return articlesResultsState;
            },

            getCitationsInfo: function(expression, citedArticleAuthors) {
                //todo controllare che articlesResults sia definito

                return ArticlesInfoService.requestCitationsInfo(expression).then(
                    // success
                    function(response) {
                        var res = response.data.results.bindings;

                        for (var j in res) {
                            res[j].color = colorsMap[res[j].color.value].toString;
                            res[j].citingPubYear = parseInt(res[j].citingPubYear.value);
                            res[j].irpTxt = res[j].irpTxt.value;
                            res[j].sentenceTxt = res[j].sentenceTxt.value;
                        }

                        //chiede i citing articles per un cited article
                        for (var key in articlesResults) {
                            var tmpArt = articlesResults[key];
                            if (tmpArt.expression.value == expression) {
                                tmpArt.citationsInfo = res;                                           // qui aggiungo le info citazioniali (anni, colori, etc...)
                                getCitingArticles(tmpArt, expression, citedArticleAuthors, res);      // qui aggiungo le info sugli articoli citanti
                                break; //almeno non me lo scorro tutto
                            }
                        }
                    },

                    // error
                    //todo caso da gestire meglio
                    function(errResponse) {

                        console.error("Error while fetching articles. "+errResponse.status+": "+errResponse.statusText)
                    }
                );
            },

            getBiblioInfo: function(citingArticleExpression, citingArticleAuthors) {
                //@guide richiedo le info sulla bibliografia
                /* @guide  parto prima dai cito:cites di un articolo (unici per definizione) in modo da interrogare il dataset
                 * una sola volta per ottenere le info generiche; in seguito chiedo le info sui citation acts (quanti e di che tipo)
                 * relativi ad ogni citazione; così facendo mi risparmio di fare interrogazioni inutili per avere info che già ho (ad esempio titolo e autori).
                 * le info le richiedo una sola volta per ogni cito:cites invece che più volte per ogni citation acts*/
                ArticlesInfoService.requestBiblioInfo(citingArticleExpression).then(
                    function(response){
                        var res = response.data.results.bindings;

                        //@guide per ogni elemento della bibliografia recupero gli autori e le info sui citation acts
                        for (var i in res) {
                            //faccio i seguenti riassegnamenti per facilitare filtri e ordinamenti dei risultati in bibliografia
                            // così le properties non sono più oggetti ma stringhe o numeri
                            //todo: ristrutturazione del'oggetto da eseguire in una funzione
                            res[i].title = res[i].title.value;
                            res[i].publicationYear = stringToInt(res[i].publicationYear.value);
                            res[i].globalCountDate = res[i].globalCountDate.value;
                            res[i].globalCountValue = stringToInt(res[i].globalCountValue.value);


                            //metodi utili anche per avere uno scope isolato e non avere problemi con l'indice nelle callback
                            //@guide autori dell'articolo citato
                            getSubItemAuthors(res[i], citingArticleAuthors, true);

                            //@guide info sugli atti citazioni per ogni cito:cites (quante volte un citing entity cita un cited entity per un certo motivo (colore) )
                            getBiblioItemCitActsInfo(citingArticleExpression, res[i]);
                        }

                        for (var key in articlesResults) {
                            var tmpArt = articlesResults[key];
                            if (tmpArt.expression.value == citingArticleExpression) {
                                tmpArt.biblioInfo = res;
                                break; //almeno non me lo scorro tutto
                            }
                        }
                    },

                    //todo caso da gestire meglio
                    function (errResponse) {
                        console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                    }
                );
            },

            /* per richiedere i risultati della ricerca */
            //todo: cambiare nome in qualcosa tipo "getArticlesResult": per motivi di astrazione per i controller
            requestArticles: function(searchString) {

                return RequestArticlesService.searchArticles(searchString).then(
                    // success
                    function(response) {
                        StatesManagerService.removeAllStates(); //svuota la lista degli stati
                        StatesManagerService.addEmptyState("Results for '"+searchString+"'");
                        console.log(StatesManagerService.getStates());
                        articlesResults.length = 0; //svuota l'array degli articoli, attenzione! non usare articlesResults = [] perchè crea un altro array

                        var resSet = "http://stanbol.apache.org/ontology/entityhub/query#QueryResultSet";
                        var results = "http://stanbol.apache.org/ontology/entityhub/query#queryResult";
                        var tmpRes = null; //conterrà gli uri dei work dei risultati (se ci sono risultati)
//                        response = []; //todo: da eliminare, barbatrucco per passare il controllo

                        //todo: righe da scommentare
                        if (noData(response)) {
                            articlesResultsState = resultsStates.NO_RESULTS;           // non ci sono risultati
                            console.log("NO RESULTS!");
                            tmpRes = [];

                            RequestArticlesService.setCompletedRequest();       // la richiesta all'abstract finder è conclusa e lo notifico
                        } else {
                            articlesResultsState = resultsStates.RESULTS;              // ci sono risultati
                            console.log("RESULTS!");
                            tmpRes = response.data[resSet][results]; //contiene gli uri dei work todo: da scommentare
//                            tmpRes = mockResults;  //todo da eliminare
                            articlesNum = tmpRes.length;                        // numero totale di articoli di cui richiedere le info
                            completedArticles = articlesResults.length;         // numero di richieste completate = numero di articoli nella lista degli articoli (inizialmente zero)...semplice

                            RequestArticlesService.setCompletedRequest();       //la richiesta all'abstract finder è conclusa e lo notifico

                            //@guide per ogni articolo, partendo dal work, richiedo tutte le informazioni generali + info bibliografiche
                            /* @guide: perchè faccio tante chiamate ajax e non una sola?
                             * perchè una query monolitica potrebbe richiedere molto tempo di caricamento, usando un for invece, appena arriva
                             * un articolo, lo aggiungo subito e vedo i risultati aggiornati nella view (grazie al watchCollection)
                             */
                            isRetrievingArticlesInfo = true; //si notifica che stanno per iniziare le interrogazioni per ottenere le info sugli articoli
                            for (var key in tmpRes) {

                                //@guide richiedo le info generali sull'articolo interrogando fuseki
                                ArticlesInfoService.getArticleGeneralInfo(tmpRes[key].value).then(

                                    // http://stackoverflow.com/questions/939032/jquery-pass-more-parameters-into-callback
                                    function (response) {
                                        var articleData = response.data.results.bindings[0];
                                        articleData.publicationYear = stringToInt(articleData.publicationYear.value);
                                        articleData.title = articleData.title.value;
                                        articleData.globalCountValue = stringToInt(articleData.globalCountValue.value);
                                        articlesResults.push(articleData); //aggiungo l'articolo, questo farà da trigger per il watchCollection nel controller degli articolo e la view si aggiornerà per magia (si aggiorna comunque perchè articlese è passato per riferimento, ma con il watch aggiungo del comportamento )

                                        // se sono state richieste le info per tutti gli articoli
                                        if (articlesResults.length == tmpRes.length) {
                                            isRetrievingArticlesInfo = false;
                                        }
                                        //@guide richiedo la lista degli autori
                                        getArticleAuthors(articleData);

                                        //@guide richiedo le info sulle citazioni (in entrata)
                                        ArticlesInfoService.getArticleCitationsInfo(articleData.expression.value).then(
                                            function (response) {
                                                articleData.inCitActs = response.data.results.bindings[0].numCitActs.value; //numero di citation acts
                                                articleData.inNumCites = response.data.results.bindings[0].numCites.value;  //numero di cites (<= numero di citation acts), citazioni uniche
                                            },
                                            //todo caso da gestire meglio
                                            function (errResponse) {
                                                console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                                            }
                                        );


                                    },

                                    //todo caso da gestire meglio
                                    function (errResponse) {
                                        console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                                    }
                                );

                            }

                        }

                    },

                    // error
                    //todo caso da gestire meglio
                    function(errResponse) {
                        RequestArticlesService.setCompletedRequest(); //la richiesta è conclusa, c'è stato un errore, ma è conclusa
                        openErrorDialog();
                    }
                );
            },

            //questa è invocata in biblioItem per visualizzare le info su un solo articolo
            singleArticleInfo: function(artExpression, stateVal) {
                //todo da rivedere
                var resultsCopy = angular.copy(articlesResults);                // creo una deep copy dei risultati
                StatesManagerService.saveCurrentStateArticles(resultsCopy);     // salvo i risultati correnti A ( prima di modificare articlesResults ) nello stato creato precedentemente
                StatesManagerService.addEmptyState(stateVal);                  // creo un nuovo stato vuoto che andrà ad accogliere i risultati B (che sto per chiedere) nel momento in cui si passerà ad un' altro stato C

                getSingleArticleInfo(artExpression);          // richiedo l'articolo da mostrare
                console.log(">>> STATES:");
                console.log(StatesManagerService.getStates());

            },

            setArticlesResults: function(stateIndex) {
                var restoredState = StatesManagerService.restoreState(stateIndex);
                console.log("------------");
                console.log(restoredState);
                console.log("------------");
                angular.copy(restoredState.articles, articlesResults);
                articlesNum = articlesResults.length;
                completedArticles = articlesResults.length;
                console.log(">>> STATES:");
                console.log(StatesManagerService.getStates());

            },

            /* per richiedere un singolo articolo */
            getSingleArticle: function(articleTitle) {
                RequestArticlesService.setPendingRequest(); //todo: in futuro questo dovrà essere evitato

                return ArticlesInfoService.requestSingleArticle(articleTitle).then(
                    // success
                    function(response) {
                        StatesManagerService.removeAllStates(); //svuota la lista degli stati
                        StatesManagerService.addEmptyState("Article: '"+articleTitle+"'");
                        console.log(StatesManagerService.getStates());
                        articlesResults.length = 0; //svuota l'array degli articoli, attenzione! non usare articlesResults = [] perchè crea un altro array

                        if (response.data.results.bindings.length == 0) {
                            articlesResultsState = resultsStates.NO_RESULTS;           // non ci sono risultati
                            console.log("NO RESULTS!");

                            RequestArticlesService.setCompletedRequest();
                        } else {
                            articlesResultsState = resultsStates.RESULTS;              // ci sono risultati
                            console.log("RESULTS!");
                            articlesNum = 1;                        // numero totale di articoli di cui richiedere le info
                            completedArticles = 1;         // numero di richieste completate = numero di articoli nella lista degli articoli

                            RequestArticlesService.setCompletedRequest();

                            var articleData = response.data.results.bindings[0];
                            articleData.publicationYear = stringToInt(articleData.publicationYear.value);
                            articleData.title = articleData.title.value;
                            articleData.globalCountValue = stringToInt(articleData.globalCountValue.value);

                            articlesResults.push(articleData);

                            //@guide richiedo la lista degli autori
                            getArticleAuthors(articleData);

                            //@guide richiedo le info sulle citazioni (in entrata)
                            ArticlesInfoService.getArticleCitationsInfo(articleData.expression.value).then(
                                function (response) {
                                    articleData.inCitActs = response.data.results.bindings[0].numCitActs.value; //numero di citation acts
                                    articleData.inNumCites = response.data.results.bindings[0].numCites.value;  //numero di cites (<= numero di citation acts), citazioni uniche
                                },
                                //todo caso da gestire meglio
                                function (errResponse) {
                                    console.error("Error while fetching article. " + errResponse.status + ": " + errResponse.statusText);
                                }
                            );
                        }

                    },

                    // error
                    //todo caso da gestire meglio
                    function(errResponse) {
                        RequestArticlesService.setCompletedRequest(); //la richiesta è conclusa, c'è stato un errore, ma è conclusa
                        openErrorDialog();
                    }
                );
            },

            getAuthorArticles: function(givenName, familyName) {
                AuthorInfoService.requestAuthorArticles(familyName, givenName).then(
                    // success
                    function(response) {
                        var resultsCopy = angular.copy(articlesResults);                // creo una deep copy dei risultati
                        StatesManagerService.saveCurrentStateArticles(resultsCopy);     // salvo i risultati correnti A ( prima di modificare articlesResults ) nello stato creato precedentemente (l'ultimo creato con addEmptyState)
                        StatesManagerService.addEmptyState(givenName+" "+familyName);
                        console.log(StatesManagerService.getStates());
                        articlesResults.length = 0; //svuota l'array degli articoli, attenzione! non usare articlesResults = [] perchè crea un altro array
                        var tmpRes = response.data.results.bindings;
                        articlesNum = tmpRes.length;                        // numero totale di articoli di cui richiedere le info
                        completedArticles = articlesResults.length;         // numero di richieste completate = numero di articoli nella lista degli articoli (inizialmente zero)...semplice

                        //@guide per ogni articolo, partendo dal work, richiedo tutte le informazioni generali + info bibliografiche
                        /* @guide: perchè faccio tante chiamate ajax e non una sola?
                         * perchè una query monolitica potrebbe richiedere molto tempo di caricamento, usando un for invece, appena arriva
                         * un articolo, lo aggiungo subito e vedo i risultati aggiornati nella view (grazie al watchCollection)
                         */
                        isRetrievingArticlesInfo = true; //si notifica che stanno per iniziare le interrogazioni per ottenere le info sugli articoli
                        for (var key in tmpRes) {
                            //@guide richiedo le info generali sull'articolo interrogando fuseki
                            ArticlesInfoService.getArticleGeneralInfo(tmpRes[key].work.value).then(

                                // http://stackoverflow.com/questions/939032/jquery-pass-more-parameters-into-callback
                                function (response) {
                                    var articleData = response.data.results.bindings[0];
                                    articleData.publicationYear = stringToInt(articleData.publicationYear.value);
                                    articleData.title = articleData.title.value;
                                    articleData.globalCountValue = stringToInt(articleData.globalCountValue.value);
                                    articlesResults.push(articleData); //aggiungo l'articolo, questo farà da trigger per il watchCollection nel controller degli articolo e la view si aggiornerà per magia (si aggiorna comunque perchè articles è passato per riferimento, ma con il watch aggiungo del comportamento )

                                    // se sono state richieste le info per tutti gli articoli
                                    if (articlesResults.length == tmpRes.length) {
                                        isRetrievingArticlesInfo = false;
                                    }
                                    //@guide richiedo la lista degli autori
                                    getArticleAuthors(articleData);

                                    //@guide richiedo le info sulle citazioni (in entrata)
                                    ArticlesInfoService.getArticleCitationsInfo(articleData.expression.value).then(
                                        function (response) {
                                            articleData.inCitActs = response.data.results.bindings[0].numCitActs.value; //numero di citation acts
                                            articleData.inNumCites = response.data.results.bindings[0].numCites.value;  //numero di cites (<= numero di citation acts), citazioni uniche
                                        },
                                        //todo caso da gestire meglio
                                        function (errResponse) {
                                            console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                                        }
                                    );


                                },

                                //todo caso da gestire meglio
                                function (errResponse) {
                                    console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                                }
                            );
                        }
                    },

                    // error
                    //todo caso da gestire meglio
                    function(errResponse) {
                        console.error("Error while fetching articles. "+errResponse.status+": "+errResponse.statusText)
                    }
                );
            }



            //importante! se si modifica articlesResults, non riassegnare altrimenti tutti i $watch non vanno più! modificare usando angular.copy
            //@guide https://docs.angularjs.org/api/ng/function/angular.copy
            //@guide http://stackoverflow.com/questions/17995229/changed-value-on-angularjs-service-not-triggering-watch-within-directive
            /* per aggiornare gli articoli */
            //setArticles: function(newArticles) {
            //    angular.copy(newArticles, articlesResults);
            //},
            //
            ///* aggiunge un articol oalla lista di articoli */
            //addArticle: function(newArticle) {
            //    articlesResults.push(newArticle);
            //}
        }
    });