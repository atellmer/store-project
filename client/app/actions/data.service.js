;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('DataActions', factory);

  factory.$inject = ['$http', 'ngSpawn'];

  function factory($http, ngSpawn) {

    var service = {
      loadState: loadState,
      fetchData: fetchData
    };

    function loadState() {
      var localState = JSON.parse(localStorage.getItem('LOCAL_APP_STATE'));

      if (localState) {
        ngSpawn.update('*', {
          data: localState,
          type: 'LOAD_LOCAL_STATE'
        });
      }
    }

    function fetchData() {
      $http
        .get('./data/products.json')
        .then(function (res) {
          ngSpawn.update('products', {
            data: res.data,
            type: 'FETCH_PRODUCTS'
          });
        });

      $http
        .get('./data/feedback.json')
        .then(function (res) {
          ngSpawn.update('feedback', {
            data: res.data,
            type: 'FETCH_FEEDBACK'
          });
        });
    }

    return service;
  }
})();