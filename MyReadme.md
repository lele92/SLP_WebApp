### una readme per me stesso per alcuni task ripetitivi e complessi ...si potrebbe pensare di creare un task gulp (da valutare)###

### Nuovo stato + View + Controller + sidebar item

- creare nuova view in app/views
- aggiungere state in master/js/custom/custom.js
- aggiungere relativo controller in js/custom/controllers
- nuovo oggetto in server/sidebar-menu.json

### Nuovo filtro bibliografia ###

- in biblioFilters.js aggiungere nuovo filtro in biblioFilters.js
- in filters-manager.js aggiungere un oggetto e assegnare alla property "value" il valore di default del nuovo filtro
- in filters-manager.js aggiungere un getter e un setter (il getter ritorna l'oggetto, il setter imposta il valore di value)
- in articles-results.js aggiungere una nuova variabile per il valore del filtro: esso verrà preso dalla factory filters-manager.js
- in article-item.js definire un nuovo attributo stringa "@" (o altro in base al caso): verrà usato per passare all'articleItem il valore del filtro
- in articles-results.html, passare alla direttiva article-item, attraverso il nuovo attributo (attenzione: gobba di cammello diventa trattino) il valore del nuovo filtro nella forma: "{{ArticlesResultsCtrl.[nomeVarFiltro].value}}"
- in article-item.html, nel ng-repeat della direttiva biblio-item usare il nuovo filtro passando come parametro l'attributo prima definito (trattino diventa gobba di cammello)
- in filters-offsidebar.js aggiungere variabili e funzioni necessarie
- in filters-offsidebar.js, per settare il valore del filtro, usare il relativo setter di FiltersManagerService, invocandolo nella funzione applyFilters()
- in filters-offsidebar.html aggiungere gli elementi necessari
