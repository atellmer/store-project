;
(function () {
  'use strict';

  angular
    .module('app')
    .controller('SharedController', SharedController);

  SharedController.$inject = ['$document', 'spawn$', 'DataService', 'DeviceDetector'];

  function SharedController($document, spawn$, DataService, DeviceDetector) {
    var vm = this;

    vm.products = [];
    vm.year = new Date().getFullYear();
    vm.scrollTo = scrollTo;

    activate();

    ////////////////
    function activate() {
      logger();
      DataService.loadState();
      DeviceDetector.detect();
      DataService.fetchData();
      spawnHandler();
    }

    function spawnHandler() {
      spawn$.detect('products', function () {
        vm.products = spawn$.select('products');
      });
    }

    function logger() {
      spawn$.detect('*', function() {
        if (/@ACTIONS/.test(spawn$.select('->'))) {
          console.log('zone: ', spawn$.select('->') + ' -> ', spawn$.select('*'));
        }
      });
    }

    function scrollTo(selector) {
      var element = angular.element(document.querySelector(selector));
      $document.scrollToElement(element, 30, 800);
    }
  }
})();