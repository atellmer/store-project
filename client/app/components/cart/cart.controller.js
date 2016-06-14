;
(function() {
'use strict';

	angular
		.module('app')
		.controller('CartController', CartController);

	CartController.$inject = [];

	function CartController() {
		var vm = this;

		var cartEl = angular.element(document.querySelector('.js-cart'));
		var productsEl = angular.element(document.querySelector('.js-products'));

		vm.openCart = openCart;
		vm.closeCart = closeCart;
		
		activate();

		////////////////

		function activate() { }

		function openCart() {
			if (!cartEl.hasClass('js-cart--active')) {
				cartEl.addClass('js-cart--active');
			}

			if (!productsEl.hasClass('js-products--active')) {
				productsEl.addClass('js-products--active');
			}
		}

		function closeCart() {
			if (cartEl.hasClass('js-cart--active')) {
				cartEl.removeClass('js-cart--active');
			}

			if (productsEl.hasClass('js-products--active')) {
				productsEl.removeClass('js-products--active');
			}
		}
	}
})();