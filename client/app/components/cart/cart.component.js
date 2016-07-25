;
(function () {
	'use strict';

	angular.module('app')
		.component('bashCart', {
			templateUrl: './app/components/cart/cart.component.html',
			controller: ['$scope', '$http', '$compile', '$timeout', 'CartService', 'Modals', controller],
		});

	function controller($scope, $http, $compile, $timeout, CartService, Modals) {
		var vm = this;

		var cartEl = angular.element(document.querySelector('.js-cart'));
		var productsEl = angular.element(document.querySelector('.js-products'));

		var modal = '';

		vm.cart = CartService.cart;
		vm.sum = CartService.sum;

		vm.closeCart = closeCart;
		vm.openCart = openCart;
		vm.deleteFromCart = deleteFromCart;
		vm.showModal = showModal;
		vm.sendLetter = sendLetter;

		activate();

		////////////////

		function activate() {
			$scope.$on('cart:change', function (event, data) {
				vm.cart = CartService.cart;
				vm.sum = CartService.sum;
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
			vm.sum = CartService.sum;
			if (vm.cart.length === 0) {
				closeCart();
			}
		}

		function showModal(templateId) {
			modal = Modals.showModal(templateId);
			$timeout(function () {
				var template = document.querySelector('.ngdialog');
				$compile(template)($scope);

				var container = document.querySelector('[data-iframe-order]');
				var iframe = document.createElement('iframe');
				var sum = CartService.sum;
				var domen = document.location.hostname;

				var src = 'https://money.yandex.ru/embed/shop.xml?account=410011483894113&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=%D0%9F%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B0+%D0%91%D0%B0%D1%88%D0%BA%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE+%D0%BC%D1%91%D0%B4%D0%B0&default-sum=' + sum + '&button-text=01&fio=on&phone=on&address=on&successURL=http%3A%2F%2F' + domen + '%2F';
				iframe.setAttribute('frameborder', '0');
				iframe.setAttribute('allowtransparency', 'true');
				iframe.setAttribute('scrolling', 'no');
				iframe.setAttribute('width', '100%');
				iframe.setAttribute('height', '200px');
				iframe.setAttribute('src', src);

				container.appendChild(iframe);
			}, 100);
		}


		function sendLetter() {
			var root = 'ajax/index.php';
			var req = 'order';

			var data = {
				type: 'Новый Заказ',
				phone: vm.phone,
				cart: CartService.cart,
				sum: CartService.sum,
			};
			var json = JSON.stringify(data);
			var url = root + '?' + req + '=' + json;
			
			console.log('Данные нового заказа: ', data);

			$http.get(url).success(function (response) {
				console.log('response: ', response);
			});
		}
	}
})();