myApp.controller('BiblioFiltersController', function(FiltersManagerService) {
    var self = this;
    /* filters value */ //'F' -> convenzione per Filter
    self.publicationYearF;

    /* orderBy value */ //'V' -> convenzione per Value
    self.orderByV = FiltersManagerService.getOrderBy().value;   //ordinamento di default stabilito nel service
    self.sortV = FiltersManagerService.getSort().value;          //sort di default stabilito nel service

    //@guide: valori del ng-value dei radio button: li metto qui (invece di usare value) così posso cambiarli semplicemente
    //todo: si potrebbe fare in modo che le stringhe dei filtri qui sotto vengano prese dal FiltersManagerService
    //todo: mettere in filtersManagerService metodi getter e setter per le stringhe delle opzioni di sorting, sarebbe una buona cosa: filtri dinamici!
    /* order option vars */
    self.publicationYear = "publicationYear";
    self.title = "title";

    /* checkboxes*/
    self.checkYear = false;

    self.switchYearFilter = function() {
        if (self.checkYear) {
            console.log('filtro anno attivato');
        } else {
            console.log('filtro anno disattivato');
            self.publicationYearF = 0; //fixme: barbatrucco momentaneo, da eliminare (tutti gli articoli sono stati pubblicati dopo l'anno 0, credo...)
        }
    }

    self.applySort = function() {
        console.log("ordinamento: "+self.sortV);
        FiltersManagerService.setSort(self.sortV);
    }

    /* applica l'ordinamento selezionato */
    self.applyOrderBy = function() {
        console.log("ordinamento selezionato: " + self.orderByV);
        FiltersManagerService.setOrderBy(self.orderByV);
    }

    /* applica tutti i filtri selezionati */
    self.applyFilters = function() {
        console.log("filtri applicati");
        FiltersManagerService.setStartingPublicationYear(self.publicationYearF);
    }
})