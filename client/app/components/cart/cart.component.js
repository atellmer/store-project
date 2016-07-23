;
(function() {
	'use strict';

	angular.module('app')
		.component('bashCart', {
			templateUrl: './app/components/cart/cart.component.html',
			controller: ['$scope', '$compile', '$timeout', 'CartService', 'Modals',controller],
		});

	function controller($scope, $compile, $timeout, CartService, Modals) {
		var vm = this;

		var cartEl = angular.element(document.querySelector('.js-cart'));
		var productsEl = angular.element(document.querySelector('.js-products'));

		var modal = '';

		vm.cart = CartService.cart;

		vm.closeCart = closeCart;
		vm.openCart = openCart;
		vm.deleteFromCart = deleteFromCart;
		vm.showModal = showModal;
		vm.send = send;
		
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

		function deleteFromCart(id) {
			CartService.deleteFromCart(id);
			if (vm.cart.length === 0) {
				closeCart();
			}
		}

		function showModal(templateId) {
			modal = Modals.showModal(templateId);
			$timeout(function() {
				var template = document.querySelector('.ngdialog');
				$compile(template)($scope);
			}, 100);
		}

		function send(event) {
			var target = angular.element(event.target);
			var type = target.closest('[data-modal-type]').attr('data-modal-type');

			if (type === 'new-order') {
				var name = document.querySelector('[data-modal-type=' + type +'] [data-input-name]').value + '';
				var phone = document.querySelector('[data-modal-type=' + type +'] [data-input-phone]').value + '';
				var email = document.querySelector('[data-modal-type=' + type +'] [data-input-email]').value + '';
				var adress = document.querySelector('[data-modal-type=' + type +'] [data-input-adress]').value + '';
				var data = {
					type: 'Новый Заказ',
					name: name,
					phone: phone,
					email: email,
					adress: adress,
					cart: CartService.cart,
				};
				console.log('Данные нового заказа: ', data);
			}


			modal.close();
			CartService.clearCart();
			vm.cart = CartService.cart;
			closeCart();
		}
	}
})();