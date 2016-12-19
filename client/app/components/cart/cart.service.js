;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('CartService', CartService);

  CartService.$inject = ['Store', 'lkFunctions'];

  function CartService(Store, lkFunctions) {
    var service = {
      cart: [],
      sum: 0,
      cartBuffer: [],
      addToCart: addToCart,
      deleteFromCart: deleteFromCart,
      clearCart: clearCart,
    };

    return service;

    ////////////////
    function addToCart(product) {
      service.cartBuffer.push(product);

      completeCart();
      getCartSum();
      updateState();
    }

    function deleteFromCart(id) {
      var index = lkFunctions.getCurIndexObjectInArray(service.cart, 'id', id);

      if (index !== -1) {
        service.cart.splice(index, 1);
      }
      getCartSum();
      updateState();
    }

    function clearCart() {
      service.cart = [];
      service.cart.sum = 0;

      updateState();
    }

    function getCartSum() {
      var sum = 0;
      for (var i = 0, len = service.cart.length; i < len; i++) {
        sum += service.cart[i].price * service.cart[i].amount * service.cart[i].volume;
      }

      service.sum = sum;
    }

    function completeCart() {
      var id = 0;
      var name = '';
      var volume = 0;
      var amount = 0;
      var price = 0;
      var flag = false;
      var k = 0;

      for (var i = 0; i < service.cartBuffer.length; i++) {

        id = 0;
        name = '',
          volume = 0;
        amount = 0;

        for (var j = 0; j < service.cartBuffer.length; j++) {
          if (service.cartBuffer[i].id === service.cartBuffer[j].id) {
            flag = true;
            id = service.cartBuffer[i].id;
            name = service.cartBuffer[i].name;
            volume += service.cartBuffer[i].volume;
            amount += service.cartBuffer[i].amount;
            price += service.cartBuffer[i].price;
          }
        }

        if (flag) {
          var index = lkFunctions.getCurIndexObjectInArray(service.cart, 'id', id);

          if (index !== -1) {
            service.cart[index] = {
              id: id,
              name: name,
              volume: volume,
              amount: amount,
              price: price,
            };
          } else {
            service.cart.push({
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

      service.cartBuffer = [];
    }

    function updateState() {
      Store.update('root.cart.value', service.cart);
      Store.update('root.cart.sum', service.sum);
  
      localStorage.setItem('state', JSON.stringify(Store.getState()));
      console.log('state: ', Store.getState().root);
    }
  }
})();