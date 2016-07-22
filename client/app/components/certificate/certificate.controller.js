;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('CertificateController', CertificateController);

	CertificateController.$inject = ['ngDialog'];

	function CertificateController(ngDialog) {
		var vm = this;

		vm.clickToOpen = clickToOpen;


		activate();

		////////////////

		function activate() { }

		function clickToOpen(templateId) {
			ngDialog.open({
				template: templateId,
				className: 'ngdialog-theme-default'
			});

			console.log('click');
		}
	}
})();