;
(function() {
'use strict';

	angular
		.module('app')
		.controller('FeedbackController', FeedbackController);

	FeedbackController.$inject = ['DataService'];

	function FeedbackController(DataService) {
		var vm = this;

		vm.feedback = DataService.feedback;
		

		activate();

		////////////////

		function activate() {}
	}
})();