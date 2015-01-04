myApp.controller('BiblioFiltersController', function(FiltersManagerService) {
    var self = this;
    /* filters and order objs: oggetti {value: aaa} di filterManagerService */ //'F' -> convenzione per Filter
    self.publicationYearF = FiltersManagerService.getStartingPublicationYear();
    self.onlySelfcitationsF = FiltersManagerService.getOnlySelfCitations();
    self.characterizationsF = FiltersManagerService.getCharacterizations();
    var date = new Date();
    self.year = date.getFullYear();

    /* values: valori dei filtri in html */ //'V' -> convenzione per Value
    self.publicationYearV = self.publicationYearF.value;
    self.onlySelfcitationsV =  self.onlySelfcitationsF.value;
    self.characterizationsV = self.characterizationsF.value;

    /* checkboxes*/
    self.checkYear = false;
    self.checkOnlySelfcitations = false;
    self.checkCharacterizations = false;

    /* funzioni invocate all'interazione con i filtri */

    self.setAllChecked = function(bool) {
        for (var i in self.characterizationsV) {
            self.characterizationsV[i].checked = bool;
        }
    }

    self.switchColorsFilter = function() {
        if (self.checkCharacterizations) {
            console.log('filtro colori attivato');
        } else {
            console.log('filtro colori disattivato');
            self.setAllChecked(true);
        }
    }

    self.switchYearFilter = function() {
        if (self.checkYear) {
            console.log('filtro anno attivato');
        } else {
            console.log('filtro anno disattivato');
            self.publicationYearV = 0; //fixme: barbatrucco momentaneo, da eliminare (tutti gli articoli sono stati pubblicati dopo l'anno 0, credo...)
        }
    }

    self.switchOnlySelfcitations = function() {
        if (self.checkOnlySelfcitations) {
            console.log('filtro solo autocitazioni attivato');
            self.onlySelfcitationsV = true;
        } else {
            console.log('filtro solo autocitazioni disattivato');
            self.onlySelfcitationsV = false;
        }
    }

    /* controlla lo stato delle checkboxes: s'è c'è almeno un filtro attivo ritorna true, false altrimenti */
    //chiunque legga mi scusi, non ho resistito alla tentazione di chiamarla così
    self.checkCheckboxes = function() {
        if (self.checkYear || self.checkOnlySelfcitations || self.checkCharacterizations) {
            console.log("c'è almeno un filtro impostato");
            return true;
        }
        return false;
    }

    /* applica tutti i filtri selezionati */
    self.applyFilters = function() {
        FiltersManagerService.setFilterActivated(self.checkCheckboxes()); //se c'è un filtro attivo lo comunica a filtersManager
        FiltersManagerService.setStartingPublicationYear(self.publicationYearV);
        FiltersManagerService.setOnlySelfCitations(self.onlySelfcitationsV);
        FiltersManagerService.setCharacterizations(self.characterizationsV);
        console.log("filtri applicati");
    }
})