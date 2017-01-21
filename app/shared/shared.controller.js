;
(function () {
  'use strict';

  angular
    .module('app')
    .controller('SharedController', SharedController);

  SharedController.$inject = ['$document', 'Store', 'DataService'];

  function SharedController($document, Store, DataService) {
    var vm = this;

    vm.products = [];
    vm.year = new Date().getFullYear();
    vm.scrollTo = scrollTo;

    activate();

    ////////////////
    function activate() {
      storeUpdater();
      DataService.fetchData();
      storeHandler();
    }

    function storeUpdater() {
      var localState = JSON.parse(localStorage.getItem('GLOBAL_STATE'));

      if (localState && localState.root) {
        Store.update('root', localState.root);

        console.log('global state: ', Store.getState().root);
      }
    }

    function storeHandler() {
      Store.detect('root.products', function () {
        vm.products = Store.getState().root.products;
      });
    }

    function scrollTo(selector) {
      var element = angular.element(document.querySelector(selector));

      $document.scrollToElement(element, 30, 800);
    }
  }
})();