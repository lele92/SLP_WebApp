/**
 * module: results-filters-manager.js
 * */
'use strict';

myApp.factory('ResultsFiltersManager',["ORDER_BY","ARTICLE_TYPES", function(ORDER_BY, ARTICLE_TYPES) {
	/* vars order by */
	var defaultOrderByValue = ORDER_BY.publicationYear;    // l'ordinamento di default è per anno di pubblicazione
	var defaultSort = true;                      // true-> decrescente, false->crescente
	var orderBy = { value: defaultOrderByValue};    // angular.copy(defaultOrderBy, orderBy); orderBy inzializzato al default; deep copy, non assegnazione per riferimento
	var sort = { value: defaultSort};

	/* vars filters */
	var articleTypes = [ARTICLE_TYPES.Article,ARTICLE_TYPES.JournalArticle,ARTICLE_TYPES.JournalReviewArticle, ARTICLE_TYPES.JournalEditorial, ARTICLE_TYPES.ConferencePaper, ARTICLE_TYPES.Letter];
	var selectedArticleTypes = [ARTICLE_TYPES.Article,ARTICLE_TYPES.JournalArticle,ARTICLE_TYPES.JournalReviewArticle, ARTICLE_TYPES.JournalEditorial, ARTICLE_TYPES.ConferencePaper];
	var startingPublicationYear =  { value: 0};

	return {
		getOrderBy: function() {
			return orderBy;
		},

		getSort: function() {
			return sort;
		},

		//todo: aggiungere funzioni per settare orderBy e sort, per adesso le modifiche rimangono in ArticlesResultsController e non vengono propagate a questo servizio

		getArticleTypes: function() {
			return articleTypes;
		},

		getSelectedArticleTypes: function() {
			return selectedArticleTypes;
		},

		getStartingPublicationYearF: function() {
			return startingPublicationYear;
		}
	}
}]);