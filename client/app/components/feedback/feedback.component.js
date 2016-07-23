;
(function() {
	'use strict';

	angular.module('app')
		.component('bashFeedback', {
			templateUrl: './app/components/feedback/feedback.component.html',
			controller: ['DataService', controller],
		});

		function controller(DataService) {
			var vm = this;

			vm.feedback = DataService.feedback;

			activate();

			function activate() {
				
			}
		}
})();