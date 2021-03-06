;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('CartActions', factory);

  factory.$inject = ['ngSpawn'];

  function factory(ngSpawn) {
    var service = {
      addToCart: addToCart,
      deleteFromCart: deleteFromCart,
      clearCart: clearCart,
      recountCartSum: recountCartSum
    };

    activate();

    return service;

    function activate() {
      ngSpawn.detect('*', function(action) {
       if (
        action.type === 'ADD_TO_CART' ||
        action.type === 'DELETE_FROM_CART' ||
        action.type === 'CLEAR_CART'
        ) {
          recountCartSum();
        }
      });
    }

    function recountCartSum() {
       var sum = ngSpawn
        .select('cart.list')
        .reduce(function(acc, item) {
        return acc + item.price * item.volume * item.amount;
      }, 0);
      ngSpawn.update('cart.sum', {
        data: sum,
        type: 'RECOUNT_CART_SUM'
      });
    }

    function addToCart(product) {
      ngSpawn.update('cart.list', {
        data: ngSpawn.select('cart.list').concat(product),
        type: 'ADD_TO_CART'
      });
    }

    function deleteFromCart(index) {
      var cart = ngSpawn.select('cart.list');
      cart.splice(index, 1);
  
      ngSpawn.update('cart.list', {
        data: cart,
        type: 'DELETE_FROM_CART'
      });
    }

    function clearCart() {
      ngSpawn.update('cart.list', {
        data: [],
        type: 'CLEAR_CART'
      });
    }
  }
})();
