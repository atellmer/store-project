;
(function () {
  'use strict';

  angular
  .module('app')
  .config(configureStore)

  configureStore.$inject = ['ngSpawnProvider'];

  function configureStore(ngSpawnProvider) {
    const initialState = {
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
      return next => action => {
        next(action);
        console.log('action: ', action.type + ': ', JSON.parse(JSON.stringify(action.data)));
        //console.log('state: ', JSON.parse(JSON.stringify(store.select('*'))));
      }
    }
  }
})();
