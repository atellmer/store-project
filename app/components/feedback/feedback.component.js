;
(function () {
  'use strict';

  angular.module('app')
    .component('bashFeedback', {
      templateUrl: './app/components/feedback/feedback.component.html',
      controller: ['$scope', '$compile', 'ngSpawn', '$timeout', 'Modals', controller],
    });

  function controller($scope, $compile, ngSpawn, $timeout, Modals) {
    var vm = this;
    var modal = '';

    vm.showModal = showModal;
    vm.send = send;

    vm.$onInit = function() {
      var selection = {
        feedback: 'feedback'
      };
      ngSpawn.connect(selection)(vm);
    }

    vm.$onDestroy = function() {
      ngSpawn.disconnect(vm);
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