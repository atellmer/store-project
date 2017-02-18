;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('CartService', CartService);

  CartService.$inject = ['spawn$', 'lkFunctions'];

  function CartService(spawn$, lkFunctions) {
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
      spawnHandler();
    }

    function spawnUpdater() {
      spawn$.update('cart.value', cart);
      spawn$.update('cart.sum', sum);

      localStorage.setItem('LOCAL_APP_STATE', JSON.stringify(spawn$.select('*')));
      spawn$.update('@ACTIONS.SAVE_LOCAL_STATE', new Date());
    }

    function spawnHandler() {
      spawn$.detect('cart.value', function() {
        cart = spawn$.select('cart.value');
      });
    }

    function addToCart(product) {
      cartBuffer.push(product);

      completeCart();
      getCartSum();
      spawnUpdater();
      spawn$.update('@ACTIONS.ADD_TO_CART', new Date());
    }

    function deleteFromCart(id) {
      var index = lkFunctions.getCurIndexObjectInArray(cart, 'id', id);

      if (index !== -1) {
        cart.splice(index, 1);
      }
      getCartSum();
      spawnUpdater();
      spawn$.update('@ACTIONS.DELETE_FROM_CART', new Date());
    }

    function clearCart() {
      cart = [];
      sum = 0;

      spawnUpdater();
      spawn$.update('@ACTIONS.CLEAR_CART', new Date());
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