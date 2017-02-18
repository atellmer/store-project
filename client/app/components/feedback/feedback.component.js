;
(function () {
  'use strict';

  angular.module('app')
    .component('bashFeedback', {
      templateUrl: './app/components/feedback/feedback.component.html',
      controller: ['$scope', '$compile', 'spawn$', '$timeout', 'Modals', 'DataService', controller],
    });

  function controller($scope, $compile, spawn$, $timeout, Modals, DataService) {
    var vm = this;

    var modal = '';

    vm.feedback;
    vm.showModal = showModal;
    vm.send = send;

    activate();

    function activate() {
      spawn$.detect('feedback', function() {
        vm.feedback = spawn$.select('feedback');
      });
    }

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

      if (type === 'feedback') {
        var name = document.querySelector('[modal-type=' + type + '] [input-name]').value + '';
        var feedback = document.querySelector('[modal-type=' + type + '] [input-feedback]').value + '';
        var data = {
          type: 'Отзыв',
          name: name,
          feedback: feedback,
        };
      }

      modal.close();
    }
  }
})();