;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('spawn$', spawn$);

  spawn$.$inject = [];

  function spawn$() {
    var initialState = {
      cart: {},
      products: [],
      feedback: [],
      device: {
        desktop: false,
        tablet: false,
        mobile: false
      }
    };
       
    return new Spawn(initialState);
  }
})();