;
(function() {
'use strict';

	angular
		.module('app')
		.factory('DataService', DataService);

	DataService.$inject = [];

	function DataService() {
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

		var feedback = [
			{
				name: 'Людмила Иванова',
				feed: 'Задача организации, в особенности же дальнейшее развитие различных форм деятельности играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Товарищи! сложившаяся структура организации позволяет оценить значение модели развития.',
			},
			{
				name: 'Дениска Редиска',
				feed: 'Задача организации, в особенности же дальнейшее развитие различных форм деятельности играет важную роль в формировании позиций, занимаемых участникам.',
			},
			{
				name: 'Аркадий Укупник',
				feed: 'Задача организации, в особенности же дальнейшее развитие различных форм деятельности играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Товарищи! сложившаяся структура организации позволяет оценить значение модели развития.',
			},
			{
				name: 'Филипп Киркоров',
				feed: 'Задача организации, в особенности же дальнейшее развитие различных форм деятельности играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач.',
			},
		];
		
		var service = {
			products: products,
			feedback: feedback,
		};
		
		return service;

		////////////////
	}
})();