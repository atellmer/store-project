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
        cart: {
          value: [],
          sum: 0
        },
        products: [],
        feedback: []
      }
    };
       
    return new Spawn(initialState);
  }
})();