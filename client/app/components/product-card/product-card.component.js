;
(function () {
	'use strict';

	angular.module('app')
		.component('bashProductCard', {
			bindings: {
				product: '<',
			},
			templateUrl: './app/components/product-card/product-card.component.html',
			controller: ['$rootScope', 'CartService', controller],
		});

	function controller($rootScope, CartService) {
		var vm = this;

		var attr = 'data-card-id';

		vm.setVolume = setVolume;
		vm.setAmount = setAmount;
		vm.addToCart = addToCart;

		activate();

		////////////////

		function activate() {}

		function setVolume(event) {
			var target = angular.element(event.target);
			var parent = target.closest('[' + attr + ']');
			var id = target.closest('[' + attr + ']').attr(attr);
			var value = target.attr('data-radio-value');

			var radioBtns = document.querySelectorAll('[' + attr + '="' + id + '"] .js-product-card__radio-btn');

			for (var i = 0, len = radioBtns.length; i < len; i++) {
				if (angular.element(radioBtns[i]).hasClass('js-product-card__radio-btn--active')) {
					angular.element(radioBtns[i]).removeClass('js-product-card__radio-btn--active');
				}
			}

			target.addClass('js-product-card__radio-btn--active');
		}

		function getVolume(id) {
			var radioBtn = angular.element(document.querySelector('[' + attr + '="' + id + '"] .js-product-card__radio-btn--active'));
			var volume = parseInt(radioBtn.attr('data-radio-value'));

			return volume;
		}

		function setAmount(event, count) {
			var target = angular.element(event.target);
			var parent = target.closest('[' + attr + ']');
			var id = target.closest('[' + attr + ']').attr(attr);
			var countEl = angular.element(document.querySelector('[' + attr + '="' + id + '"] .js-product-card__amount-count'));
			var counter = parseInt(countEl.text());
			var amount = 0;

			if (count > 0) {
				countEl.text(counter + count);
			}
			if (counter > 1 && count < 0) {
				countEl.text(counter + count);
			}

			amount = parseInt(countEl.text());
		}

		function getAmount(id) {
			var countEl = angular.element(document.querySelector('[' + attr + '="' + id + '"] .js-product-card__amount-count'));
			var amount = parseInt(countEl.text());

			return amount;
		}

		function getPrice(id) {
			var countEl = angular.element(document.querySelector('[' + attr + '="' + id + '"] [data-card-price]'));
			var price = parseFloat(countEl.text());

			return price;
		}

		function addToCart(event) {
			var target = angular.element(event.target);
			var parent = target.closest(attr);
			var id = target.closest('[' + attr +']').attr(attr);
			var name = angular.element(document.querySelector('[' + attr + '="' + id + '"] [data-card-name]')).attr('data-card-name');
			var volume = getVolume(id);
			var amount = getAmount(id);
			var price = getPrice(id);

			CartService.addToCart(id, name, volume, amount, price);

			$rootScope.$broadcast('cart:change', {
				type: 'add',
			});
		}
	}
})();