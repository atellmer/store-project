;
(function() {
'use strict';

	angular
		.module('app')
		.controller('SharedController', SharedController);

	SharedController.$inject = ['$document', 'DataService'];

	function SharedController($document, DataService) {
		var vm = this;
		
		vm.year = new Date().getFullYear();
		vm.products = DataService.products;
		vm.scrollTo = scrollTo;

		activate();

		////////////////

		function activate() {}

		function scrollTo(selector) {
			var element = angular.element(document.querySelector(selector));

			$document.scrollToElement(element, 30, 800);
		}
	}
})();