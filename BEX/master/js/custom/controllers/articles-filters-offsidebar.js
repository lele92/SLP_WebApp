myApp.controller('ArticlesFiltersController', ["ArticlesFiltersManager", "$scope", "$rootScope", function(ArticlesFiltersManager, $scope, $rootScope) {
	var self = this;

	self.articleTypes = ArticlesFiltersManager.getArticleTypes();
	self.selectedArticleTypes = ArticlesFiltersManager.getSelectedArticleTypes();
	self.publicationYearF = ArticlesFiltersManager.getStartingPublicationYearF();

	self.publicationYearV = self.publicationYearF.value;

	var date = new Date();
	self.year = date.getFullYear();

	/* values: valori dei filtri in html */ //'V' -> convenzione per Value
	//self.publicationYearV = self.publicationYearF.value;
	//self.selfcitationsV =  self.selfcitationsF.value;
	//self.excludeSelfcitationsV = self.selfcitationsF.exclude;
	//self.characterizationsV = self.characterizationsF.value;
	//self.authorsV = self.authorsF.value;

	/* checkboxes filters*/
	self.checkType = false;
	self.checkYear = false;
	/*===========================*/

	/* funzioni invocate all'interazione con i filtri */



	self.switchYearFilter = function() {
		if (self.checkYear) {
			//console.log('filtro anno attivato');
		} else {
			//console.log('filtro anno disattivato');
			self.publicationYearV = 1950;
			ArticlesFiltersManager.setStartingPublicationYear(self.publicationYearV)
		}
		ArticlesFiltersManager.setFilterActivated(self.checkCheckboxes());
	}

	self.switchTypeFilter = function() {
		if (self.checkType) {
			//todo fare controlli
		} else {
			//todo: soluzione provvisoria, da rivedere
			self.selectedArticleTypes.length = 0;
			for (var key in self.articleTypes) {
				self.selectedArticleTypes.push(self.articleTypes[key]);
			}
		}
		ArticlesFiltersManager.setFilterActivated(self.checkCheckboxes());
	}



	self.isInSelectedTypes = function(type) {
		return self.selectedArticleTypes.indexOf(type) != -1
	}



	self.switchType = function(type) {
		var index = self.selectedArticleTypes.indexOf(type)
		if (index == -1) {
			self.selectedArticleTypes.push(type)
		} else {
			self.selectedArticleTypes.splice(index,1);
		}
	}




	/* controlla lo stato delle checkboxes: s'è c'è almeno un filtro attivo ritorna true, false altrimenti */
	self.checkCheckboxes = function() {
		if (self.checkYear || self.checkType) {
			//console.log("c'è almeno un filtro impostato");
			return true;
		}
		return false;
	}

	/* applica il filtro per l'anno */
	self.applyYearFilter = function() {
		ArticlesFiltersManager.setStartingPublicationYear(self.publicationYearV);
	}
}]);