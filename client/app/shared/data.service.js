;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('DataService', DataService);

  DataService.$inject = ['$http', 'Store'];

  function DataService($http, Store) {
    function fetchData() {
      $http.get('./data/products.json')
      .then(function (res) {
        Store.update('root.products', res.data);
      });

      $http.get('./data/feedback.json')
        .then(function (res) {
          Store.update('root.feedback', res.data);
        });
    }

    var service = {
      fetchData: fetchData
    };

    return service;
  }
})();