;
(function() {
	'use strict';

	angular.module('app')
		.component('bashCertificate', {
			templateUrl: './app/components/certificate/certificate.component.html',
			controller: ['ngDialog', controller],
		});

	function controller(ngDialog) {
		var vm = this;

		vm.clickToOpen = clickToOpen;

		activate();

		function activate() {}

		function clickToOpen(templateId) {
			ngDialog.open({
				template: templateId,
				className: 'ngdialog-theme-default'
			});
		}
	}
})();