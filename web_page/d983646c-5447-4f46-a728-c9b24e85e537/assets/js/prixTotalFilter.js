angular.module('bonitasoft.ui.extensions')
  .filter('prixTotalPanier', [function () {
    return function prixTotalPanier(panier) {
		var grandTotal = 0;
		
		if(panier && panier.length > 0) {
			panier.forEach(function(item) {
				grandTotal += item.quantite * item.produit.prixUnitaire;
			});
		}
		
		return grandTotal;
    };
}]);