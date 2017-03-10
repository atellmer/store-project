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