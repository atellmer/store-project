;
(function() {
	'use strict';

	angular.module('app')
		.component('bashCart', {
			templateUrl: './app/components/cart/cart.component.html',
			controller: ['$scope', 'CartService', controller],
		});

	function controller($scope, CartService) {
		var vm = this;

		var cartEl = angular.element(document.querySelector('.js-cart'));
		var productsEl = angular.element(document.querySelector('.js-products'));

		vm.cart = CartService.cart;

		vm.closeCart = closeCart;
		vm.openCart = openCart;
		vm.deleteFromCart = CartService.deleteFromCart;
		
		activate();

		////////////////

		function activate() {
			$scope.$on('cart:change', function(event, data) {
				vm.cart = CartService.cart;
				openCart();
			});
		}

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