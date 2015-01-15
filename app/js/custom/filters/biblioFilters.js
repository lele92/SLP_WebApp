myApp
    .filter('afterYear', function () {
        return function (items, year) {

            // i seguenti check sono fatti per motivi di stabilità ed efficienza (todo: meglio se i filtri vengono usati nei controller)
            if (!angular.isUndefined(items) && !angular.isUndefined(year) && angular.isArray(items) ) {
                var filtered = [];
                var item;
                for (var i=0; i<items.length; i++) {
                    item = items[i]
                    if (item.publicationYear >= year) {
                        filtered.push(item);
                    }
                }
                return filtered;
            }

            return items; //se le condizioni dell'if non sono verificate, ritorno l'input (potrebbe essere undefined) originale
        };
    })
    .filter('onlySelfcitation', function () {
        return function (items, onlySelfcitation) {
            if (onlySelfcitation == false) {
                return items;
            } else {
                if (!angular.isUndefined(items) && !angular.isUndefined(onlySelfcitation)) {
                    var filtered = [];
                    var item;
                    for (var i=0; i<items.length; i++) {
                        item = items[i]
                        if (item.isSelfcitation == true) {
                            filtered.push(item);
                        }
                    }
                    return filtered;
                }

                return items; //se le condizioni dell'if non sono verificate, ritorno l'input (potrebbe essere undefined) originale
            }


        };
    })
    .filter('characterizations', function () {
        return function (items, colorsList) {
            if (!angular.isUndefined(items) && !angular.isUndefined(colorsList)) {
                var filtered = [];
                var item;
                var citActsInfo;
                for (var i in items) {    //per ogni item della bibliogrfia
                    item = items[i];
                    citActsInfo = item.citActsInfo;
                    for (var j in citActsInfo) {        //per ogni info citazionale
                        if (colorsList[citActsInfo[j].colorURI].checked == true) {     //se il colore dell'atto citazionale è "attivo" (true) in colorsList
                            filtered.push(item); //vuol dire che nell'item bibliografico c'è almeno una citazione di un colore che mi interessa, quindi l'item bibliografico è da mostrare
                            break; //fondamentale questo break, altrimenti nel filtered ci potrebbe finire più volte lo stesso elemento
                        }
                    }
                }
                return filtered;
            }

            return items; //se le condizioni dell'if non sono verificate, ritorno l'input (potrebbe essere undefined) originale
        }
    })
    .filter('authors', function () {
        //enabled mi dice se devo filtrare i risultati....lo uso per non dovermi portare dietro un array di più di 900 autori nel widget dei filtri
        return function (items, authorsList, enabled) {
            if (!angular.isUndefined(items) && !angular.isUndefined(authorsList) && enabled) {
                var filtered = [];
                var item;
                var authors;
                for (var i in items) {    //per ogni item della bibliogrfia
                    item = items[i];
                    authors = item.authors;
                    for (var j in authors) {        //per ogni info citazionale
                        if (authorsList.indexOf(authors[j].fullName) > -1) {     //se in authorsList (lista degli autori da filtrare) c'è (almeno) un autore dell'elemento
                            filtered.push(item); //vuol dire che l'item bibliografico ha tra gli autori (almeno) uno di quelli che si vuole filtrare
                            break; //fondamentale questo break, altrimenti nel filtered ci potrebbe finire più volte lo stesso elemento
                        }
                    }
                }
                return filtered;
            }

            return items; //se le condizioni dell'if non sono verificate, ritorno l'input (potrebbe essere undefined) originale
        }
    })