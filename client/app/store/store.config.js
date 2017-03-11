;
(function () {
  'use strict';

  angular
  .module('app')
  .config(configureStore)

  configureStore.$inject = ['ngSpawnProvider'];

  function configureStore(ngSpawnProvider) {
    var initialState = {
      cart: {
        list: [],
        sum: 0
      },
      products: [],
      feedback: [],
      device: {
        desktop: false,
        tablet: false,
        mobile: false
      }
    };

    ngSpawnProvider.createStore(
      initialState,
      ngSpawnProvider.addInterceptor(logger)
    );

    function logger(store) {
      return function (next) {
        return function (action) {
          next(action);
          console.log('action: ', action.type + ': ', JSON.parse(JSON.stringify(action.data)));
        }
      }
    }
  }
})();
