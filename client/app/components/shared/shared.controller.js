;
(function() {
'use strict';

	angular
		.module('app')
		.controller('SharedController', SharedController);

	SharedController.$inject = ['DataService'];

	function SharedController(DataService) {
		var vm = this;
		
		vm.year = new Date().getFullYear();
		vm.products = DataService.products;

		activate();

		////////////////

		function activate() {}
	}
})();