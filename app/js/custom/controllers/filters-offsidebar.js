myApp.controller('BiblioFiltersController', function(FiltersManagerService, $scope) {
    var self = this;
    /* filters and order objs: oggetti {value: ...} di filterManagerService */ //'F' -> convenzione per Filter
    self.publicationYearF = FiltersManagerService.getStartingPublicationYearF();
    self.onlySelfcitationsF = FiltersManagerService.getOnlySelfCitationsF();
    self.characterizationsF = FiltersManagerService.getCharacterizationsF();
    self.authorsF = FiltersManagerService.getAuthorsF();        //con questo prendo la lista di autori del filtro

    self.allAuthors = FiltersManagerService.getAllArticlesAuthors(); //con questo prendo tutti gli autori
    self.selectedAuthor = ""; //
    self.authorAlreadyInList = false;
    self.inputNotValid = false;

    var date = new Date();
    self.year = date.getFullYear();

    /* values: valori dei filtri in html */ //'V' -> convenzione per Value
    self.publicationYearV = self.publicationYearF.value;
    self.onlySelfcitationsV =  self.onlySelfcitationsF.value;
    self.characterizationsV = self.characterizationsF.value;
    self.authorsV = self.authorsF.value;

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
            self.publicationYearV = 0;
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
            FiltersManagerService.setAuthorsEnabled(true);
        } else {
            console.log('filtro autori disattivato');
            FiltersManagerService.setAuthorsEnabled(false);
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
    self.updateAuthorFilter = function() {
        if (alreadyInList(self.selectedAuthor)) {
            self.authorAlreadyInList = true;
            console.log("autore già in lista")
        } else if (!validInput(self.selectedAuthor)) {
            self.inputNotValid = true;
            console.log("input non valido")
        } else {
            self.inputNotValid = false;
            self.authorAlreadyInList = false;
            self.authorsV.push(self.selectedAuthor);
            FiltersManagerService.setAuthors(self.authorsV);
        }
    }

    self.removeAuthorFromFilter = function(author) {
        for (var i in self.authorsV) {
            if (self.authorsV[i] == author) {
                self.authorsV.splice(i, 1);

            }
        }
        FiltersManagerService.setAuthors(self.authorsV);
    }

    var alreadyInList = function(author) {
        for (var i in self.authorsV) {
            if (self.authorsV[i] == author) {
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