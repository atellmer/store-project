;
(function () {
  'use strict';

  angular
  .module('app', [
    'ngSpawnModule',
    'ngDialog',
    'ngScrollbars',
    'duScroll',
    'valdr',
  ]);
})();

;
(function () {
  'use strict';

  angular
    .module('app')
    .config(configureProdMode);

  configureProdMode.$inject = ['$compileProvider'];

  function configureProdMode($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }
})();
;
(function () {
  'use strict';

  angular
    .module('app')
    .config(configurScrollBar);

  configurScrollBar.$inject = ['ScrollBarsProvider'];

  function configurScrollBar(ScrollBarsProvider) {
    ScrollBarsProvider.defaults = {
      scrollButtons: {
        scrollAmount: 'auto',
        enable: false,
      },
      axis: 'yx',
    };
  }
})();
;
(function () {
  'use strict';

  angular
    .module('app')
    .config(configureValidation);

  configureValidation.$inject = ['valdrProvider'];

  function configureValidation(valdrProvider) {
    valdrProvider.addConstraints({
      'PhoneForm': {
        'phone': {
          'size': {
            'min': 10,
            'max': 15,
            'message': 'Нужно не менее 12 символов, но не более 15.'
          },
          'pattern': {
            'value': '/^[+]{0,1}[-(),0-9]{5,}$/',
            'message': 'Номер телефона включает только цифры'
          },
          'required': {
            'message': 'Обязательное поле'
          }
        },
      }
    });
  }
})();
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
(function() {
'use strict';

  angular
    .module('app')
    .factory('EnvironmentActions', factory);

  factory.$inject = ['ngSpawn'];

  function factory(ngSpawn) {
    var service = {
      detectDevice: detectDevice
    };
    
    function detectDevice() {
      ngSpawn.update('device', {
        data: {
          desktop: device.desktop(),
          tablet: device.tablet(),
          mobile: device.mobile()
        },
        type: 'DETECT_DEVICE'
      });
    }

    return service;
   }
})();

;
(function () {
  'use strict';

  angular
    .module('app')
    .factory('Modals', Modals);

  Modals.$inject = ['ngDialog'];

  function Modals(ngDialog) {
    var service = {
      showModal: showModal,
    };

    return service;

    ////////////////
    function showModal(templateId) {
      return ngDialog.open({
        template: templateId,
        className: 'ngdialog-theme-default'
      });
    }
  }
})();
;
(function () {
  'use strict';

  window.addEventListener('load', loadHandler);

  function loadHandler() {
    $('[testimonials-carousel]').slick({
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    });
  }
})();
;
(function () {
  'use strict';

  angular
    .module('app')
    .component('bashCart', {
      templateUrl: './app/components/cart/cart.component.html',
      controller: [
        '$scope',
        '$http',
        '$compile',
        '$timeout',
        'ngSpawn',
        'CartActions',
        'Modals',
        controller],
    });

  function controller(
    $scope,
    $http,
    $compile,
    $timeout,
    ngSpawn,
    CartActions,
    Modals) {
    var vm = this;
    var cartEl = angular.element(document.querySelector('.js-cart'));
    var productsEl = angular.element(document.querySelector('.js-products'));
    var modal = '';

    vm.showModal = showModal;
    vm.sendLetter = sendLetter;
    vm.closeCart = closeCart;
    vm.openCart = openCart;
    vm.deleteFromCart = deleteFromCart;
    vm.clearCart = clearCart;

    vm.$onInit = function() {
      var selection = {
        cart: 'cart'
      };
  
      ngSpawn.connect(selection)(vm);

      ngSpawn.detect('cart.list', function() {
        if (ngSpawn.select('cart.list').length > 0) {
          openCart();
        } else {
          closeCart();
        }
      });
    }

    vm.$onDestroy = function () {
      ngSpawn.disconnect(vm);
    }

    function clearCart() {
      CartActions.clearCart();
    }

    function deleteFromCart(index) {
      CartActions.deleteFromCart(index);
    }

    function openCart() {
      if (!cartEl.hasClass('js-cart--active')) {
        cartEl.addClass('js-cart--active');
      }

      if (!productsEl.hasClass('js-products--active')) {
        productsEl.addClass('js-products--active');
      }
    }

    function closeCart() {
      if (cartEl.hasClass('js-cart--active')) {
        cartEl.removeClass('js-cart--active');
      }

      if (productsEl.hasClass('js-products--active')) {
        productsEl.removeClass('js-products--active');
      }
    }

    function showModal(templateId) {
      modal = Modals.showModal(templateId);
      $timeout(function () {
        var template = document.querySelector('.ngdialog');
        $compile(template)($scope);

        var container = document.querySelector('[iframe-order]');
        var iframe = document.createElement('iframe');
        var sum = vm.cart.sum;
        var domen = document.location.hostname;

        var src = 'https://money.yandex.ru/embed/shop.xml?account=410011483894113&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=%D0%9F%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B0+%D0%91%D0%B0%D1%88%D0%BA%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE+%D0%BC%D1%91%D0%B4%D0%B0&default-sum=' + sum + '&button-text=01&fio=on&phone=on&address=on&successURL=http%3A%2F%2F' + domen + '%2F';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '200px');
        iframe.setAttribute('src', src);

        container.appendChild(iframe);
      }, 100);
    }


    function sendLetter() {
      var url = 'ajax/index.php';
      var data = {
        type: 'Новый Заказ',
        phone: vm.phone,
        cart: vm.cart,
        sum: vm.sum,
      };
      var config = {
        params: {'order': JSON.stringify(data)}
      };

      $http.get(url, config)
        .then(function (res) {
        console.log('response: ', res);
      });
    }
  }
})();
;
(function () {
  'use strict';

  angular.module('app')
    .component('bashCertificate', {
      templateUrl: './app/components/certificate/certificate.component.html',
      controller: ['Modals', controller],
    });

  function controller(Modals) {
    var vm = this;

    vm.showModal = Modals.showModal;

    activate();

    function activate() {}
  }
})();
;
(function () {
  'use strict';

  angular.module('app')
    .component('bashContacts', {
      templateUrl: './app/components/contacts/contacts.component.html',
      controller: ['$scope', '$compile', '$timeout', 'Modals', controller],
    });

  function controller($scope, $compile, $timeout, Modals) {
    var vm = this;

    var modal = '';

    vm.showModal = showModal;
    vm.send = send;

    activate();

    function activate() {}

    function showModal(templateId) {
      modal = Modals.showModal(templateId);
      $timeout(function () {
        var template = document.querySelector('.ngdialog');
        $compile(template)($scope);
      }, 100);
    }

    function send() {
      var target = angular.element(event.target);
      var type = target.closest('[modal-type]').attr('modal-type');

      if (type === 'order-phone') {
        var name = document.querySelector('[modal-type=' + type + '] [input-name]').value + '';
        var phone = document.querySelector('[modal-type=' + type + '] [input-phone]').value + '';
        var data = {
          type: 'Заказ звонка',
          name: name,
          phone: phone,
        };

        console.log('Заказ звонка: ', data);
      }
      if (type === 'order-email') {
        var email = document.querySelector('[modal-type=' + type + '] [input-email]').value + '';
        var message = document.querySelector('[modal-type=' + type + '] [input-message]').value + '';
        var data = {
          type: 'Вопрос нам',
          email: email,
          message: message,
        };

        console.log('Вопрос нам: ', data);
      }

      modal.close();
    }
  }
})();
;
(function () {
  'use strict';

  angular.module('app')
    .component('bashFeedback', {
      templateUrl: './app/components/feedback/feedback.component.html',
      controller: ['$scope', '$compile', 'ngSpawn', '$timeout', 'Modals', controller],
    });

  function controller($scope, $compile, ngSpawn, $timeout, Modals) {
    var vm = this;
    var modal = '';

    vm.showModal = showModal;
    vm.send = send;

    vm.$onInit = function() {
      var selection = {
        feedback: 'feedback'
      };
      ngSpawn.connect(selection)(vm);
    }

    vm.$onDestroy = function() {
      ngSpawn.disconnect(vm);
    }

    function showModal(templateId) {
      modal = Modals.showModal(templateId);
      $timeout(function () {
        var template = document.querySelector('.ngdialog');
        $compile(template)($scope);
      }, 100);
    }

    function send() {
      var target = angular.element(event.target);
      var type = target.closest('[modal-type]').attr('modal-type');

      if (type === 'feedback') {
        var name = document.querySelector('[modal-type=' + type + '] [input-name]').value + '';
        var feedback = document.querySelector('[modal-type=' + type + '] [input-feedback]').value + '';
        var data = {
          type: 'Отзыв',
          name: name,
          feedback: feedback,
        };
      }

      modal.close();
    }
  }
})();
;
(function () {
  'use strict';

  angular.module('app')
    .component('bashMap', {
      templateUrl: './app/components/map/map.component.html',
      controller: ['ngSpawn', controller],
    });

  function controller(ngSpawn) {
    var vm = this;

    vm.$onInit = function() {
      var selection = {
        phone: 'device.mobile'
      };

      ngSpawn.connect(selection)(vm);
      activate();
    }

    vm.$onDestroy = function() {
      ngSpawn.connect(vm);
    }

    function activate() {
      if (!vm.phone) {
        var map = document.querySelector('[map-container]');
        var src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=K2M5QE9I4OF2N-dtTM6XwRgcBBiy8LVO&amp;width=100%25&amp;height=550&amp;lang=ru_RU&amp;sourceType=constructor&amp;scroll=false';
        var script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('charset', 'utf-8');
        script.setAttribute('src', src);
        map.appendChild(script);
      }
    }
  }
})();

;
(function () {
  'use strict';

  angular.module('app')
    .component('bashProductCard', {
      bindings: {
        product: '<',
      },
      templateUrl: './app/components/product-card/product-card.component.html',
      controller: ['CartActions', controller],
    });

  function controller(CartActions) {
    var vm = this;

    var attr = 'card-id';

    vm.setVolume = setVolume;
    vm.setAmount = setAmount;
    vm.addToCart = addToCart;

    function setVolume(event) {
      var target = angular.element(event.target);
      var parent = target.closest('[' + attr + ']');
      var id = target.closest('[' + attr + ']').attr(attr);
      var value = target.attr('radio-value');

      var radioBtns = document.querySelectorAll('[' + attr + '="' + id + '"] .js-product-card__radio-btn');

      for (var i = 0, len = radioBtns.length; i < len; i++) {
        if (angular.element(radioBtns[i]).hasClass('js-product-card__radio-btn--active')) {
          angular.element(radioBtns[i]).removeClass('js-product-card__radio-btn--active');
        }
      }

      target.addClass('js-product-card__radio-btn--active');
    }

    function getVolume(id) {
      var radioBtn = angular.element(document.querySelector('[' + attr + '="' + id + '"] .js-product-card__radio-btn--active'));
      var volume = parseFloat(radioBtn.attr('radio-value')) / 1000;

      return volume;
    }

    function setAmount(event, count) {
      var target = angular.element(event.target);
      var parent = target.closest('[' + attr + ']');
      var id = target.closest('[' + attr + ']').attr(attr);
      var countEl = angular.element(document.querySelector('[' + attr + '="' + id + '"] .js-product-card__amount-count'));
      var counter = parseInt(countEl.text());
      var amount = 0;

      if (count > 0) {
        countEl.text(counter + count);
      }
      if (counter > 1 && count < 0) {
        countEl.text(counter + count);
      }

      amount = parseInt(countEl.text());
    }

    function getAmount(id) {
      var countEl = angular.element(document.querySelector('[' + attr + '="' + id + '"] .js-product-card__amount-count'));
      var amount = parseInt(countEl.text());

      return amount;
    }

    function getPrice(id) {
      var countEl = angular.element(document.querySelector('[' + attr + '="' + id + '"] [card-price]'));
      var price = parseFloat(countEl.text());

      return price;
    }

    function addToCart(event) {
      var target = angular.element(event.target);
      var parent = target.closest(attr);
      var id = target.closest('[' + attr + ']').attr(attr);
      var name = angular.element(document.querySelector('[' + attr + '="' + id + '"] [card-name]')).attr('card-name');
      var volume = getVolume(id);
      var amount = getAmount(id);
      var price = getPrice(id);
      var product = {
        id: id,
        name: name,
        volume: volume,
        amount: amount,
        price: price
      }

      CartActions.addToCart(product);
    }
  }
})();
;
(function () {
  'use strict';

  angular
    .module('app')
    .controller('SharedController', controller);

  controller.$inject = [
    '$document',
    'ngSpawn',
    'EnvironmentActions',
    'DataActions',];

  function controller(
    $document,
    ngSpawn,
    EnvironmentActions,
    DataActions) {
    var vm = this;

    activate();

    vm.year = new Date().getFullYear();
    vm.scrollTo = scrollTo;

    ////////////////
    function activate() {
      EnvironmentActions.detectDevice();
      DataActions.fetchData();
      
      var selection = {
        products: 'products'
      }
      ngSpawn.connect(selection)(vm);
    }

    function scrollTo(selector) {
      var element = angular.element(document.querySelector(selector));
      $document.scrollToElement(element, 30, 800);
    }
  }
})();