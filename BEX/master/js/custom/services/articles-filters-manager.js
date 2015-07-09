/**
 * module: results-filters-manager.js
 * */
'use strict';

myApp.factory('ArticlesFiltersManager',["ORDER_BY","ARTICLE_TYPES", function(ORDER_BY, ARTICLE_TYPES) {
	var filterActivated = { value: false}               //true se c'è almeno un filtro attivo, false altrimenti

	/* vars order by */
	var defaultOrderByValue = ORDER_BY.publicationYear;    // l'ordinamento di default è per anno di pubblicazione
	var defaultSort = true;                      // true-> decrescente, false->crescente
	var orderBy = { value: defaultOrderByValue};    // angular.copy(defaultOrderBy, orderBy); orderBy inzializzato al default; deep copy, non assegnazione per riferimento
	var sort = { value: defaultSort};


	/* vars filters */
	var articleTypes = [ARTICLE_TYPES.JournalArticle,ARTICLE_TYPES.JournalReviewArticle, ARTICLE_TYPES.JournalEditorial, ARTICLE_TYPES.ConferencePaper, ARTICLE_TYPES.Letter, ARTICLE_TYPES.Article];
	var selectedArticleTypes = [ARTICLE_TYPES.Article,ARTICLE_TYPES.JournalArticle,ARTICLE_TYPES.JournalReviewArticle, ARTICLE_TYPES.JournalEditorial, ARTICLE_TYPES.Letter, ARTICLE_TYPES.ConferencePaper];
	var startingPublicationYear =  { value: 1950};

	return {
		getOrderBy: function() {
			return orderBy;
		},

		getSort: function() {
			return sort;
		},

		setOrderBy: function(newOrderBy) {
			orderBy.value = newOrderBy;
		},

		setSort: function(newSort) {
			sort.value = newSort;
		},

		getArticleTypes: function() {
			return articleTypes;
		},

		getSelectedArticleTypes: function() {
			return selectedArticleTypes;
		},

		getStartingPublicationYearF: function() {
			return startingPublicationYear;
		},

		setStartingPublicationYear: function(newStartingYear) {
			startingPublicationYear.value = newStartingYear;
		},

		setFilterActivated: function(newFilterActivated) {
			filterActivated.value = newFilterActivated;
		},

	}
}]);