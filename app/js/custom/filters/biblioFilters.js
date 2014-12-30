myApp.filter('afterYear', function () {
    return function (items, year) {

        if (!angular.isUndefined(items) && !angular.isUndefined(year) && angular.isArray(items) ) {
            var filtered = [];
            var item;
            for (var i=0; i<items.length; i++) {
                item = items[i]
                if (item.publicationYear.value >= year) {
                    filtered.push(item);
                }
            }
            return filtered;
        }

        return items; //se le condizioni dell'if non sono verificate, ritorno l'input (potrebbe essere undefined) originale
    };
});