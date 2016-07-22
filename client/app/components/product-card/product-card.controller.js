;
(function() {
'use strict';

	angular
		.module('app')
		.controller('ProductCardController', ProductCardController);

	ProductCardController.$inject = ['DataService', 'CartService'];

	function ProductCardController(DataService, CartService) {
		var vm = this;

		vm.products = DataService.products;
		vm.setVolume = setVolume;
		vm.setAmount = setAmount;
		vm.addToCard = addToCard;

		activate();

		////////////////

		function activate() { }

		function setVolume(event) {
			var target = angular.element(event.target);
			var parent = target.closest('[data-card-id]');
			var id = target.closest('[data-card-id]').attr('data-card-id');
			var value = target.attr('data-radio-value');

			var radioBtns = document.querySelectorAll('[data-card-id="' + id +'"] .js-product-card__radio-btn');

			for (var i = 0, len = radioBtns.length; i < len; i++) {
				if (angular.element(radioBtns[i]).hasClass('js-product-card__radio-btn--active')) {
					angular.element(radioBtns[i]).removeClass('js-product-card__radio-btn--active');
				}
			}

			target.addClass('js-product-card__radio-btn--active');
		}

		function getVolume(id) {
			var radioBtn = angular.element(document.querySelector('[data-card-id="' + id +'"] .js-product-card__radio-btn--active'));
			var volume = parseInt(radioBtn.attr('data-radio-value'));

			return volume;
		}

		function setAmount(event, count) {
			var target = angular.element(event.target);
			//var parent = target.closest('[data-card-id]');
			var parent = target.closest('[data-slick-index]');
			var id = target.closest('[data-card-id]').attr('data-card-id');
			//var countEl = angular.element(document.querySelector('[data-card-id="' + id +'"] .js-product-card__amount-count'));
			var countEl = angular.element(document.querySelector('[data-slick-index="' + id +'"] .js-product-card__amount-count'));
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
			var countEl = angular.element(document.querySelector('[data-card-id="' + id +'"] .js-product-card__amount-count'));
			var amount = parseInt(countEl.text());

			return amount;
		}

		function addToCard(event) {
			var target = angular.element(event.target);
			var parent = target.closest('[data-card-id]');
			var id = target.closest('[data-card-id]').attr('data-card-id');
			var volume = getVolume(id);
			var amount = getAmount(id);

			CartService.addToCart(id, volume, amount);
		}
	}
})();