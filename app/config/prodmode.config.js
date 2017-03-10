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