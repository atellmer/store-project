;
(function () {
  'use strict';

  angular
    .module('app')
    .config(scrollBar);

  scrollBar.$inject = ['ScrollBarsProvider'];

  function scrollBar(ScrollBarsProvider) {
    ScrollBarsProvider.defaults = {
      scrollButtons: {
        scrollAmount: 'auto',
        enable: false,
      },
      axis: 'yx',
    };
  }
})();