myApp
    .filter('afterYear', function () {
    return function (items, year) {

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

