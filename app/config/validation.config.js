;
(function () {
  'use strict';

  angular
    .module('app')
    .config(validation);

  validation.$inject = ['valdrProvider'];

  function validation(valdrProvider) {

    valdrProvider.addConstraints({
      'PhoneForm': {
        'phone': {
          'size': {
            'min': 12,
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