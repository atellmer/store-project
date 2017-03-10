;
(function () {
  'use strict';

  angular
    .module('app')
    .controller('SharedController', controller);

  controller.$inject = [
    '$document',
    'ngSpawn',
    'EnvironmentActions',
    'DataActions',];

  function controller(
    $document,
    ngSpawn,
    EnvironmentActions,
    DataActions) {
    var vm = this;

    activate();

    vm.year = new Date().getFullYear();
    vm.scrollTo = scrollTo;

    ////////////////
    function activate() {
      EnvironmentActions.detectDevice();
      DataActions.fetchData();
      
      var selection = {
        products: 'products'
      }
      ngSpawn.connect(selection)(vm);
    }

    function scrollTo(selector) {
      var element = angular.element(document.querySelector(selector));
      $document.scrollToElement(element, 30, 800);
    }
  }
})();