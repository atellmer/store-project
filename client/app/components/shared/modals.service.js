;
(function() {
'use strict';

	angular
		.module('app')
		.factory('Modals', Modals);

	Modals.$inject = ['ngDialog'];
	
	function Modals(ngDialog) {
		var service = {
			showModal: showModal,
		};
		
		return service;

		////////////////

		function showModal(templateId) {
			return ngDialog.open({
				template: templateId,
				className: 'ngdialog-theme-default'
			});
		}
	}
})();