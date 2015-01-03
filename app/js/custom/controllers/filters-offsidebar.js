myApp.controller('BiblioFiltersController', function(FiltersManagerService, ArticleManagerService) {
    var self = this;
    /* filters and order objs: oggetti {value: aaa} di filterManagerService */ //'F' -> convenzione per Filter
    self.publicationYearF = FiltersManagerService.getStartingPublicationYear();
    self.onlySelfcitationsF = FiltersManagerService.getOnlySelfCitations();
    self.orderByF = FiltersManagerService.getOrderBy();   //ordinamento di default stabilito nel service
    self.sortF = FiltersManagerService.getSort();
    self.characterizationsF = FiltersManagerService.getCharacterizations();

    /* values: valori dei filtri in html */ //'V' -> convenzione per Value
    self.orderByV = self.orderByF.value;    //ordinamento di default stabilito nel service
    self.sortV = self.sortF.value;          //sort di default stabilito nel service
    self.publicationYearV = self.publicationYearF.value;
    self.onlySelfcitationsV =  self.onlySelfcitationsF.value;
    self.characterizationsV = self.characterizationsF.value;

    //@guide: valori del ng-value dei radio button: li metto qui (invece di usare value) così posso cambiarli semplicemente
    //todo: si potrebbe fare in modo che le stringhe dei filtri qui sotto vengano prese dal FiltersManagerService
    //todo: mettere in filtersManagerService metodi getter e setter per le stringhe delle opzioni di sorting, sarebbe una buona cosa: filtri dinamici!
    /* order option vars */
    self.publicationYear = "publicationYear";
    self.title = "title";
    self.globalCitations = "globalCountValue";
    self.totCitActs = "totCitActs";

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
        FiltersManagerService.setStartingPublicationYear(self.publicationYearV);
        FiltersManagerService.setOnlySelfCitations(self.onlySelfcitationsV);
        FiltersManagerService.setCharacterizations(self.characterizationsV);
    }
})