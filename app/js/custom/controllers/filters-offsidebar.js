myApp.controller('BiblioFiltersController', function(FiltersManagerService) {
    var self = this;
    /* filters value */
    self.publicationYearF;

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

    self.applyFilters = function() {
        console.log("filtri applicati");
        FiltersManagerService.setStartingPublicationYear(self.publicationYearF);
    }
})