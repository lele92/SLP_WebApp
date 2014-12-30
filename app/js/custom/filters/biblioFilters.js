myApp.filter('myFilter', function () {
    return function (items, year) {
        var filtered = [];
        var item;
        for (var i = 0; i < items.length; i++) {
            item = items[i] ;
            if (item >= year) {
                filtered.push(item)
            }

        }
        return filtered;
    };
});