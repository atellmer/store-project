;
(function() {
	'use strict';

	angular.module('app')
		.component('bashFeedback', {
			templateUrl: './app/components/feedback/feedback.component.html',
			controller: ['$scope', '$compile', '$timeout', 'Modals', 'DataService', controller],
		});

		function controller($scope, $compile, $timeout, Modals, DataService) {
			var vm = this;

			var modal = '';

			vm.feedback = DataService.feedback;
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

				if (type === 'feedback') {
					var name = document.querySelector('[data-modal-type=' + type +'] [data-input-name]').value + '';
					var feedback = document.querySelector('[data-modal-type=' + type +'] [data-input-feedback]').value + '';
					var data = {
						type: 'Отзыв',
						name: name,
						feedback: feedback,
					};

					console.log('Отзыв: ', data);
				}

				modal.close();
			}
		}
})();