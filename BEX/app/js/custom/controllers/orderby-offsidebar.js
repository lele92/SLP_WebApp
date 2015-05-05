myApp.controller('BiblioOrderbyController', ["FiltersManagerService", function(FiltersManagerService) {
    var self = this;

    self.orderByF = FiltersManagerService.getOrderBy();
    self.sortF = FiltersManagerService.getSort();

    self.orderByV = self.orderByF.value;    //ordinamento di default stabilito nel service
    self.sortV = self.sortF.value;          //sort di default stabilito nel service

    //@guide: valori del ng-value dei radio button: li metto qui (invece di usare value) così posso cambiarli semplicemente
    /* order option vars */
    self.publicationYear = "publicationYear";
    self.title = "title";
    self.globalCitations = "globalCountValue";
    self.totCitActs = "totCitActs";


    self.applySort = function() {
        //console.log("ordinamento: "+self.sortV);
        FiltersManagerService.setSort(self.sortV);
    }

    /* applica l'ordinamento selezionato */
    self.applyOrderBy = function() {
        //console.log("ordinamento selezionato: " + self.orderByV);
        FiltersManagerService.setOrderBy(self.orderByV);
    }
}]);