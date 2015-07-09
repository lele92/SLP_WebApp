myApp.controller('CitationsFiltersController', ["CitationsFiltersManagerService", "$scope", "$rootScope", function(CitationsFiltersManagerService, $scope, $rootScope) {
    var self = this;
    /* filters and order objs: oggetti {value: ...} di filterManagerService */ //'F' -> convenzione per Filter
    self.publicationYearF = CitationsFiltersManagerService.getStartingPublicationYearF();
    self.selfcitationsF = CitationsFiltersManagerService.getSelfCitationsF();
    self.characterizationsF = CitationsFiltersManagerService.getCharacterizationsF();
    self.authorsF = CitationsFiltersManagerService.getAuthorsF();        //con questo prendo la lista di autori del filtro
    self.allAuthors = $rootScope.authors;
    self.selectedAuthor = ""; //
    self.authorAlreadyInList = false;
    self.inputNotValid = false;

    var date = new Date();
    self.year = date.getFullYear();

    /* values: valori dei filtri in html */ //'V' -> convenzione per Value
    self.publicationYearV = self.publicationYearF.value;
    self.selfcitationsV =  self.selfcitationsF.value;
    self.excludeSelfcitationsV = self.selfcitationsF.exclude;
    self.characterizationsV = self.characterizationsF.value;
    self.authorsV = self.authorsF.value;

    /* checkboxes filters*/
    self.checkYear = false;
    self.checkSelfcitations = false;
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
            //console.log('filtro colori attivato');
        } else {
            //console.log('filtro colori disattivato');
            self.setColorsAllChecked(true);
        }
        CitationsFiltersManagerService.setCharacterizations(self.characterizationsV);
        CitationsFiltersManagerService.setFilterActivated(self.checkCheckboxes());
    }

    self.switchYearFilter = function() {
        if (self.checkYear) {
            //console.log('filtro anno attivato');
        } else {
            //console.log('filtro anno disattivato');
            self.publicationYearV = 1950;
            CitationsFiltersManagerService.setStartingPublicationYear(self.publicationYearV)
        }
        CitationsFiltersManagerService.setFilterActivated(self.checkCheckboxes());
    }

    self.switchSelfcitations = function() {
        if (self.checkSelfcitations) {
            //console.log('filtro solo autocitazioni attivato');
            self.selfcitationsV = true;
        } else {
            //console.log('filtro solo autocitazioni disattivato');
            self.selfcitationsV = false;
        }
        CitationsFiltersManagerService.setSelfCitations(self.selfcitationsV,self.excludeSelfcitationsV);
        CitationsFiltersManagerService.setFilterActivated(self.checkCheckboxes());
    }

    self.switchAuthors = function() {
        if (self.checkAuthors) {
            //console.log('filtro autori attivato');
            CitationsFiltersManagerService.setAuthorsEnabled(true);
        } else {
            //console.log('filtro autori disattivato');
            CitationsFiltersManagerService.setAuthorsEnabled(false);
        }
        CitationsFiltersManagerService.setFilterActivated(self.checkCheckboxes());
    }



    /* controlla lo stato delle checkboxes: s'è c'è almeno un filtro attivo ritorna true, false altrimenti */
    //chiunque legga mi scusi, non ho resistito alla tentazione di chiamarla così
    self.checkCheckboxes = function() {
        if (self.checkYear || self.checkSelfcitations || self.checkCharacterizations || self.checkAuthors) {
            //console.log("c'è almeno un filtro impostato");
            return true;
        }
        return false;
    }

    /* applica il filtro per l'anno */
    self.applyYearFilter = function() {
        CitationsFiltersManagerService.setStartingPublicationYear(self.publicationYearV);
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
            CitationsFiltersManagerService.setAuthors(self.authorsV);
        }
    }

    self.removeAuthorFromFilter = function(author) {
        for (var i in self.authorsV) {
            if (self.authorsV[i] == author) {
                self.authorsV.splice(i, 1);

            }
        }
        CitationsFiltersManagerService.setAuthors(self.authorsV);
    }

    //todo: da rifattorizzare, non è il massimo dell'eleganza
    //excludeRadio = true se invocato da radioButton exclude
    self.checkExcludeSelfCitations = function(excludeRadio) {
        if (excludeRadio && self.excludeSelfcitationsV) {
            return true;
        } else if (excludeRadio && !self.excludeSelfcitationsV) {
            return false;
        } else if (!excludeRadio && self.excludeSelfcitationsV) {
            return false;
        } else if (!excludeRadio && !self.excludeSelfcitationsV) {
            return true;
        }
    }

    /* applica il filtro autocitazioni */
    self.switchExcludeSelfcitations = function(exclude) {
        self.excludeSelfcitationsV = exclude;
        CitationsFiltersManagerService.setSelfCitations(true,self.excludeSelfcitationsV);
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
}]);