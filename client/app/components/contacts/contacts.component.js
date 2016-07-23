;
(function() {
	'use strict';

	angular.module('app')
		.component('bashContacts', {
			templateUrl: './app/components/contacts/contacts.component.html',
			controller: ['$scope', '$compile', '$timeout', 'Modals', controller],
		});

		function controller($scope, $compile, $timeout, Modals) {
			var vm = this;

			var modal = '';

			vm.showModal = showModal;
			vm.send = send;

			activate();

			function activate() {}

			function showModal(templateId) {
				modal = Modals.showModal(templateId);
				$timeout(function() {
					var template = document.querySelector('.ngdialog');
					$compile(template)($scope);
				}, 100);
			}

			function send() {
				var target = angular.element(event.target);
				var type = target.closest('[data-modal-type]').attr('data-modal-type');

				if (type === 'order-phone') {
					var name = document.querySelector('[data-modal-type=' + type +'] [data-input-name]').value + '';
					var phone = document.querySelector('[data-modal-type=' + type +'] [data-input-phone]').value + '';
					var data = {
						type: 'Заказ звонка',
						name: name,
						phone: phone,
					};

					console.log('Заказ звонка: ', data);
				}
				if (type === 'order-email') {
					var email = document.querySelector('[data-modal-type=' + type +'] [data-input-email]').value + '';
					var message = document.querySelector('[data-modal-type=' + type +'] [data-input-message]').value + '';
					var data = {
						type: 'Вопрос нам',
						email: email,
						message: message,
					};

					console.log('Вопрос нам: ', data);
				}

				modal.close();
			}
		}
})();