;
(function () {
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
      $timeout(function () {
        var template = document.querySelector('.ngdialog');
        $compile(template)($scope);
      }, 100);
    }

    function send() {
      var target = angular.element(event.target);
      var type = target.closest('[modal-type]').attr('modal-type');

      if (type === 'order-phone') {
        var name = document.querySelector('[modal-type=' + type + '] [input-name]').value + '';
        var phone = document.querySelector('[modal-type=' + type + '] [input-phone]').value + '';
        var data = {
          type: 'Заказ звонка',
          name: name,
          phone: phone,
        };

        console.log('Заказ звонка: ', data);
      }
      if (type === 'order-email') {
        var email = document.querySelector('[modal-type=' + type + '] [input-email]').value + '';
        var message = document.querySelector('[modal-type=' + type + '] [input-message]').value + '';
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