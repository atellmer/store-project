;
(function () {
  'use strict';

  angular.module('app')
    .component('bashCertificate', {
      templateUrl: './app/components/certificate/certificate.component.html',
      controller: ['Modals', controller],
    });

  function controller(Modals) {
    var vm = this;

    vm.showModal = Modals.showModal;

    activate();

    function activate() {}
  }
})();