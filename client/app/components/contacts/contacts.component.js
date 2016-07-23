;
(function() {
	'use strict';

	angular.module('app')
		.component('bashContacts', {
			templateUrl: './app/components/contacts/contacts.component.html',
			controller: [controller],
		});

		function controller() {
			var vm = this;


			activate();

			function activate() {
				
			}
		}
})();