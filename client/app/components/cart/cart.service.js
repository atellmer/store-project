;
(function () {
	'use strict';

	angular
		.module('app')
		.factory('CartService', CartService);

	CartService.$inject = ['lkFunctions'];

	function CartService(lkFunctions) {
		var service = {
			cart: [],
			cartBuffer: [],
			addToCart: addToCart,
			deleteFromCart: deleteFromCart,
		};

		return service;

		////////////////
		function addToCart(id, name, volume, amount) {
			service.cartBuffer.push({
				id: id,
				name: name,
				volume: volume,
				amount: amount
			});

			completeCart();

			console.log('add to cart [CartService]:', service.cart);
		}

		function deleteFromCart(id) {
			var index = lkFunctions.getCurIndexObjectInArray(service.cart, 'id', id);

			if (index !== -1) {
				service.cart.splice(index, 1);
			}

			console.log('delete cart item [CartService]:', service.cart);
		}

		function completeCart() {
			var id = 0;
			var name = '';
			var volume = 0;
			var amount = 0;
			var flag = false;
			var k = 0;

			for (var i = 0; i < service.cartBuffer.length; i++) {

				id = 0;
				name = '',
				volume = 0;
				amount = 0;

				for (var j = 0; j < service.cartBuffer.length; j++) {
					if (service.cartBuffer[i].id === service.cartBuffer[j].id) {
						flag = true;
						id = service.cartBuffer[i].id;
						name = service.cartBuffer[i].name;
						volume += service.cartBuffer[i].volume;
						amount += service.cartBuffer[i].amount;
					}
				}

				if (flag) {
					var index = lkFunctions.getCurIndexObjectInArray(service.cart, 'id', id);

					if (index !== -1) {
						service.cart[index] = {
							id: id,
							name: name,
							volume: volume,
							amount: amount,
						};
					} else {
						service.cart.push({
							id: id,
							name: name,
							volume: volume,
							amount: amount,
						});
					}

					flag = false;
				}
			}

			service.cartBuffer = [];
		}
	}
})();