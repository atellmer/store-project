;
(function() {
'use strict';

	angular
		.module('app')
		.factory('ProductCardDataService', ProductCardDataService);

	ProductCardDataService.$inject = [];

	function ProductCardDataService() {
		var products = [
			{
				id: 0,
				title: 'Гречишный мёд',
				image: './resources/img/content/med-1.png',
				price: 500
			},
			{
				id: 1,
				title: 'Липовый мёд',
				image: './resources/img/content/med-2.png',
				price: 500
			},
			{
				id: 2,
				title: 'Цветочный мёд',
				image: './resources/img/content/med-3.png',
				price: 500
			},
			{
				id: 3,
				title: 'Цветочный мёд',
				image: './resources/img/content/med-1.png',
				price: 500
			},
			{
				id: 4,
				title: 'Липовый мёд',
				image: './resources/img/content/med-2.png',
				price: 500
			},
			{
				id: 5,
				title: 'Прикольный мёд',
				image: './resources/img/content/med-3.png',
				price: 500
			}
		];
		
		var service = {
			products: products
		};
		
		return service;

		////////////////
	}
})();