;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('DataService', DataService);

  DataService.$inject = ['$http', 'spawn$'];

  function DataService($http, spawn$) {

    function loadState() {
      var localState = JSON.parse(localStorage.getItem('LOCAL_APP_STATE'));

      if (localState) {
        spawn$.update('*', localState);
        spawn$.update('@ACTIONS.LOAD_LOCAL_STATE', new Date());
      }
    }

    function fetchData() {
      $http.get('./data/products.json')
      .then(function (res) {
        spawn$.update('products', res.data);
        spawn$.update('@ACTIONS.FETCH_PRODUCTS', new Date());
      });

      $http.get('./data/feedback.json')
        .then(function (res) {
          spawn$.update('feedback', res.data);
          spawn$.update('@ACTIONS.FETCH_FEEDBACK', new Date());
        });
    }

    var service = {
      loadState: loadState,
      fetchData: fetchData
    };

    return service;
  }
})();