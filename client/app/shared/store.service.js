;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('Store', Store);

  Store.$inject = [];

  function Store() {
    var initialState = {
      root: {
        cart: {},
        products: [],
        feedback: []
      }
    };
       
    return new Spawn(initialState);
  }
})();