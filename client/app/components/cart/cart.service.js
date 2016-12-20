;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('CartService', CartService);

  CartService.$inject = ['Store', 'lkFunctions'];

  function CartService(Store, lkFunctions) {
    var cartBuffer = [];
    var cart = [];
    var sum = 0;

    var service = {
      addToCart: addToCart,
      deleteFromCart: deleteFromCart,
      clearCart: clearCart,
    };

    activate();

    return service;

    ////////////////
    function activate() {
      storeHandler();
    }

    function storeUpdater() {
      Store.update('root.cart.value', cart);
      Store.update('root.cart.sum', sum);
  
      localStorage.setItem('GLOBAL_STATE', JSON.stringify(Store.getState()));
      console.log('global state: ', Store.getState().root);
    }

    function storeHandler() {
      Store.detect('root.cart.value', function() {
        cart = Store.getState().root.cart.value;
      });
    }

    function addToCart(product) {
      cartBuffer.push(product);

      completeCart();
      getCartSum();
      storeUpdater();
    }

    function deleteFromCart(id) {
      var index = lkFunctions.getCurIndexObjectInArray(cart, 'id', id);

      if (index !== -1) {
        cart.splice(index, 1);
      }
      getCartSum();
      storeUpdater();
    }

    function clearCart() {
      cart = [];
      sum = 0;

      storeUpdater();
    }

    function getCartSum() {
      var sumLocal = 0;

      for (var i = 0, len = cart.length; i < len; i++) {
        sumLocal += cart[i].price * cart[i].amount * cart[i].volume;
      }

      sum = sumLocal;
    }

    function completeCart() {
      var id = 0;
      var name = '';
      var volume = 0;
      var amount = 0;
      var price = 0;
      var flag = false;
      var k = 0;

      for (var i = 0; i < cartBuffer.length; i++) {

        id = 0;
        name = '',
        volume = 0;
        amount = 0;

        for (var j = 0; j < cartBuffer.length; j++) {
          if (cartBuffer[i].id === cartBuffer[j].id) {
            flag = true;
            id = cartBuffer[i].id;
            name = cartBuffer[i].name;
            volume += cartBuffer[i].volume;
            amount += cartBuffer[i].amount;
            price += cartBuffer[i].price;
          }
        }

        if (flag) {
          var index = lkFunctions.getCurIndexObjectInArray(cart, 'id', id);

          if (index !== -1) {
            cart[index] = {
              id: id,
              name: name,
              volume: volume,
              amount: amount,
              price: price,
            };
          } else {
            cart.push({
              id: id,
              name: name,
              volume: volume,
              amount: amount,
              price: price,
            });
          }

          flag = false;
        }
      }

      cartBuffer = [];
    }
  }
})();