/**=========================================================
 * module: articles-manager.js
 * servizio per gestire gli articoli
 =========================================================*/
'use strict';

myApp
    .factory('ArticleManagerService', function(RequestArticlesService, ArticlesInfoService, $rootScope) {
        var articlesResults = [];
        var mockResults = [
            //{
            //    "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000168"
            //} ,
            {
                "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826811000813"
            }
            //{
            //    "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000223"
            //} ,
            //{
            //    "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826811000187"
            //} ,
            //{
            //    "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000168"
            //} ,
            //{
            //    "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000193"
            //} ,
            //{
            //    "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000272"
            //} ,
            //{
            //    "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000284"
            //} ,
            //{
            //    "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826805000338"
            //} ,
            //{
            //    "value": "http://www.semanticlancet.eu/resource/1-s2.0-S1570826812000388"
            //}
        ];

        return {
            getArticles: function() {
                //fixme: attenzione! si sta passando un riferimento ad articlesResults
                return articlesResults;
            },



            /* per richiedere i risultati della ricerca */
            requestArticles: function(searchString) {
                /* per la lista degli autori di un certo item della bibliografia */
                //I param: elemento bibliografia, II param: array autori articolo citante; II param serve per capire se si tratta di autocitazione
                var getBiblioItemAuthors = function(biblioItem, citingArticleAuthors) {
                    ArticlesInfoService.getArticleAuthors(biblioItem.authorsList.value).then(
                        function (response) {
                            biblioItem.authors = response.data.results.bindings;
                            for (var i in biblioItem.authors) {
                                biblioItem.authors[i].fullName = biblioItem.authors[i].fullName.value;
                            }

                            setSelfcitationInfo(biblioItem, citingArticleAuthors);
                        },
                        //todo caso da gestire meglio
                        function (errResponse) {
                            console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                        }
                    );
                };

                /* utility per convertire la stringa in int */
                var stringToInt = function(obj) {
                    //se obj è una stringa lo converte in numero; so già che è una stringa, ma non si sa mai...
                    if (angular.isString(obj)) {
                        return parseInt(obj);
                    }

                    return obj;
                };

                /* calcola il numero di atti citazionali da un articolo ad un altro */
                var countNumCitActs = function(citActsInfo) {
                    var count = 0;
                    for (var i in citActsInfo) {
                        count += citActsInfo[i].numCitActs;
                    }

                    return count;
                }

                /* per le info sui citacion acts di un certo item X della bibliografia:  per ogni elemento della bibliografia, quante volte X è citato dal citingEntity per un certo motivo*/
                var getBiblioItemCitActsInfo = function(citingEntity, biblioItem) {
                    //I param: citing entity - II param: cited entity
                    ArticlesInfoService.getCitationActsInfo(citingEntity.value, biblioItem.citedExpression.value).then(
                        function (response) {
                            biblioItem.citActsInfo = response.data.results.bindings;
                            var tmpCitActsInfo;
                            for (var j in biblioItem.citActsInfo) {
                                tmpCitActsInfo = biblioItem.citActsInfo[j];
                                tmpCitActsInfo.color = tmpCitActsInfo.color.value;
                                tmpCitActsInfo.numCitActs = stringToInt(tmpCitActsInfo.numCitActs.value);
                            }
                            biblioItem.totCitActs = countNumCitActs(biblioItem.citActsInfo);
                        },
                        //todo caso da gestire meglio
                        function (errResponse) {
                            console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                        }
                    );
                };

                /* cerca autori in comune tra l'articolo citante e il citato:
                 * - se ce n'è almeno uno allora si tratta di una autocitazione
                  * - il nome di ogni autore condiviso viene aggiunto ad un array: verrà poi usato per evidenziare gli autori condivisi nell'elemento bibliografico*/
                var setSelfcitationInfo = function(biblioItem, citingArticleAuthors) {
                    //fixme: potenziale problema di sincronizzazione: vengono confrontati gli autori dell'elemento bibliografico con gli autori dell'articolo citante,
                    // ma questi ultimi sono il risultato di una chiamata asincrona, quindi in teoria potrebbero non essere ancora disponibili quando si effettuano i controlli
                    // per il momento se si verifica un caso del genere non faccio nessun confronto e notifico il problema, per questo il seguente if
                    // prima idea per risolvere: se non ci sono i citingArticleAuthors, chiederli qui
                    if(citingArticleAuthors !== undefined && biblioItem.authors !== undefined) {
                        biblioItem.sharedAuthors = [];
                        biblioItem.isSelfcitation = false;
                        var tmpAuthor;

                        for (var bIndex in biblioItem.authors) {
                            tmpAuthor = biblioItem.authors[bIndex];

                            for (var index in citingArticleAuthors) {

                                if (citingArticleAuthors[index].fullName === tmpAuthor.fullName) {
                                    biblioItem.isSelfcitation = true; //si, lo reimposto a true più volte, non dovrebbe essere un problema
                                    biblioItem.sharedAuthors.push(tmpAuthor.fullName);
                                }
                            }
                        }
                    } else {
                        alert("Non è stato possibile stabilire se '"+biblioItem.title+"' sia una autocitazione");
                    }


                }

                return RequestArticlesService.searchArticles(searchString).then(
                    // success
                    function(response) {
                        articlesResults.length = 0; //svuota l'array degli articoli, attenzione! non usare articlesResults = [] perchè crea un altro array
                        //todo non è una bella soluzione usare così le proprietà della risposta, valutare alternative
                        var resSet = "http://stanbol.apache.org/ontology/entityhub/query#QueryResultSet";
                        var results = "http://stanbol.apache.org/ontology/entityhub/query#queryResult";
                        //var tmpRes = response.data[resSet][results]; //contiene gli uri dei work //todo da scommentare
                        var tmpRes = mockResults;  //todo da eliminare
                        //@guide per ogni articolo, partendo dal work, richiedo tutte le informazioni generali + info bibliografiche
                        /* @guide: perchè faccio tante chiamate ajax e non una sola?
                         * perchè una query monolitica potrebbe richiedere molto tempo di caricamento, usando un for invece, appena arriva
                         * un articolo, lo aggiungo subito e vedo i risultati aggiornati nella view (grazie al watchCollection)
                         */
                        for (var key in tmpRes) {

                            //@guide richiedo le info generali sull'articolo interrogando l'abstract finder e fuseki
                            ArticlesInfoService.getArticleGeneralInfo(tmpRes[key].value).then(

                                //@guide http://stackoverflow.com/questions/939032/jquery-pass-more-parameters-into-callback
                                function (response) {
                                    var articleData = response.data.results.bindings[0];
                                    articleData.publicationYear.value = stringToInt(articleData.publicationYear.value);

                                    articlesResults.push(articleData); //aggiungo l'articolo, questo farà da trigger per il watchCollection nel controller degli articolo e la view si aggiornerà per magia

                                    //@guide richiedo la lista degli autori
                                    //todo: qui si potrebbe risolvere con un chaining delle chiamate ajax
                                    ArticlesInfoService.getArticleAuthors(articleData.authorsList.value).then(
                                        function (response) {
                                            articleData.authors = response.data.results.bindings;
                                            for (var i in articleData.authors) {
                                                articleData.authors[i].fullName = articleData.authors[i].fullName.value;
                                            }

                                        },
                                        //todo caso da gestire meglio
                                        function (errResponse) {
                                            console.error("Error while fetching articles. " + errResponse.status + ": " + errResponse.statusText)
                                        }
                                    );

                                    //@guide richiedo le info sulle citazioni (in entrata)
                                    //todo: da valutare: per adesso le info sulle citazioni le richiedo qui
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

                                    //@guide richiedo le info sulla bibliografia
                                    /* @guide  parto prima dai cito:cites di un articolo (unici per definizione) in modo da interrogare il dataset
                                     * una sola volta per ottenere le info generiche; in seguito chiedo le info sui citation acts (quanti e di che tipo)
                                      * relativi ad ogni citazione; così facendo mi risparmio di fare interrogazioni inutili per avere info che già ho (ad esempio titolo e autori).
                                       * le info le richiedo una sola volta per ogni cito:cites invece che più volte per ogni citation acts*/
                                    ArticlesInfoService.getBiblioInfo(articleData.expression.value).then(
                                        function(response){
                                            articleData.biblioInfo = response.data.results.bindings;

                                            //@guide per ogni elemento della bibliografia recupero gli autori e le info sui citation acts
                                            //fixme trovare un modo alternativo, altrimenti si fanno troppe chiamate ajax e query a fuseki
                                            //idea: info sulla bibliografia potrebbero essere richieste al drill down come nel caso delle ulteriori info sulle citazioni
                                            for (var i in articleData.biblioInfo) {
                                                //faccio i seguenti riassegnamenti per facilitare filtri e ordinamenti dei risultati in bibliografia
                                                // così le properties non sono più oggetti ma stringhe o numeri
                                                //todo: ristrutturazione del'oggetto da eseguire in una funzione
                                                articleData.biblioInfo[i].title = articleData.biblioInfo[i].title.value;
                                                articleData.biblioInfo[i].publicationYear = stringToInt(articleData.biblioInfo[i].publicationYear.value);
                                                articleData.biblioInfo[i].globalCountDate = articleData.biblioInfo[i].globalCountDate.value;
                                                articleData.biblioInfo[i].globalCountValue = stringToInt(articleData.biblioInfo[i].globalCountValue.value);


                                                //metodi utili anche per avere uno scope isolato e non avere problemi con l'indice nelle callback
                                                //@guide autori dell'articolo citato
                                                getBiblioItemAuthors(articleData.biblioInfo[i], articleData.authors);

                                                //@guide info sugli atti citazioni per ogni cito:cites (quante volte un citing entity cita un cited entity per un certo motivo (colore) )
                                                getBiblioItemCitActsInfo(articleData.expression, articleData.biblioInfo[i]);
                                            }
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
            },

            //importante! se si modifica articlesResults, non riassegnare altrimenti tutti i $watch non vanno più! modificare usando angular.copy
            //@guide https://docs.angularjs.org/api/ng/function/angular.copy
            //@guide http://stackoverflow.com/questions/17995229/changed-value-on-angularjs-service-not-triggering-watch-within-directive
            /* per aggiornare gli articoli */
            setArticles: function(newArticles) {
                angular.copy(newArticles, articlesResults);
            },

            /* aggiunge un articol oalla lista di articoli */
            addArticle: function(newArticle) {
                articlesResults.push(newArticle);
            }
        }
    });
