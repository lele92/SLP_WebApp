myApp.controller('BiblioFiltersController', function(FiltersManagerService, $scope) {
    var self = this;
    /* filters and order objs: oggetti {value: aaa} di filterManagerService */ //'F' -> convenzione per Filter
    self.publicationYearF = FiltersManagerService.getStartingPublicationYear();
    self.onlySelfcitationsF = FiltersManagerService.getOnlySelfCitations();
    self.characterizationsF = FiltersManagerService.getCharacterizations();
    //self.authorsF = { value: {}}; //non richiedo subuito gli autori per motivi di efficienza....sono più di 900

    //todo: per test, da modificare
    self.selected;
    self.authorsf = FiltersManagerService.getArticlesAuthors(); //fixme: per adesso questa funzione è in FiltersManager, valutare di spostarla in ArticlesInfoService
    self.authorsV = self.authorsf.value;
    self.authorsList = [];
    self.authorAlreadyInList = false;
    self.inputNotValid = false;

    var date = new Date();
    self.year = date.getFullYear();

    /* values: valori dei filtri in html */ //'V' -> convenzione per Value
    self.publicationYearV = self.publicationYearF.value;
    self.onlySelfcitationsV =  self.onlySelfcitationsF.value;
    self.characterizationsV = self.characterizationsF.value;
    //self.authorsV = self.authorsF.value;

    /* checkboxes*/
    self.checkYear = false;
    self.checkOnlySelfcitations = false;
    self.checkCharacterizations = false;
    self.checkAuthors = false;

    /* funzioni invocate all'interazione con i filtri */

    self.setColorsAllChecked = function(bool) {
        for (var i in self.characterizationsV) {
            self.characterizationsV[i].checked = bool;
        }
    }

    self.switchColorsFilter = function() {
        if (self.checkCharacterizations) {
            console.log('filtro colori attivato');
        } else {
            console.log('filtro colori disattivato');
            self.setColorsAllChecked(true);
        }
        FiltersManagerService.setCharacterizations(self.characterizationsV);
        FiltersManagerService.setFilterActivated(self.checkCheckboxes());
    }

    self.switchYearFilter = function() {
        if (self.checkYear) {
            console.log('filtro anno attivato');
        } else {
            console.log('filtro anno disattivato');
            self.publicationYearV = 0; //fixme: barbatrucco momentaneo, da eliminare (tutti gli articoli sono stati pubblicati dopo l'anno 0, credo...)
            FiltersManagerService.setStartingPublicationYear(self.publicationYearV)
        }
        FiltersManagerService.setFilterActivated(self.checkCheckboxes());
    }

    self.switchOnlySelfcitations = function() {
        if (self.checkOnlySelfcitations) {
            console.log('filtro solo autocitazioni attivato');
            self.onlySelfcitationsV = true;
        } else {
            console.log('filtro solo autocitazioni disattivato');
            self.onlySelfcitationsV = false;
        }
        FiltersManagerService.setOnlySelfCitations(self.onlySelfcitationsV);
        FiltersManagerService.setFilterActivated(self.checkCheckboxes());
    }

    self.switchAuthors = function() {
        if (self.checkAuthors) {
            console.log('filtro autori attivato');
        } else {
            console.log('filtro autori disattivato');
        }
        FiltersManagerService.setFilterActivated(self.checkCheckboxes());
    }



    /* controlla lo stato delle checkboxes: s'è c'è almeno un filtro attivo ritorna true, false altrimenti */
    //chiunque legga mi scusi, non ho resistito alla tentazione di chiamarla così
    self.checkCheckboxes = function() {
        if (self.checkYear || self.checkOnlySelfcitations || self.checkCharacterizations || self.checkAuthors) {
            console.log("c'è almeno un filtro impostato");
            return true;
        }
        return false;
    }

    /* applica il filtro per l'anno */
    self.applyYearFilter = function() {
        FiltersManagerService.setStartingPublicationYear(self.publicationYearV);
    }

    //todo: controlli da rivedere
    self.addSelectedAuthorToFilter = function() {
        if (alreadyInList(self.selected)) {
            self.authorAlreadyInList = true;
            console.log("autore già in lista")
        } else if (!validInput(self.selected)) {
            self.inputNotValid = true;
            console.log("input non valido")
        } else {
            self.inputNotValid = false;
            self.authorAlreadyInList = false;
            self.authorsList.push(self.selected);
        }
    }

    self.removeAuthorFromFilter = function(author) {
        for (var i in self.authorsList) {
            if (self.authorsList[i] == author) {
                self.authorsList.splice(i, 1);
            }
        }
    }

    var alreadyInList = function(author) {
        for (var i in self.authorsList) {
            if (self.authorsList[i] == author) {
                return true;
            }
        }
        return false;
    }

    var validInput = function(text) {
        //essendoci typeahead-editable="false", se non si seleziona un autore dalla lista, text (selected) == undefined
        return angular.isDefined(text) && text != "";
    }
})