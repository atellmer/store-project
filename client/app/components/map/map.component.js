;
(function () {
  'use strict';

  angular.module('app')
    .component('bashMap', {
      templateUrl: './app/components/map/map.component.html',
      controller: ['spawn$', controller],
    });

  function controller(spawn$) {
    var vm = this;

    activate();

    function activate() {
      if (!spawn$.select('device.mobile')) {
        var map = document.querySelector('[map-container]');
        var src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=OxxN2m77qGHWGaZ_i5urM0qfl05TZ6EI&amp;width=100%&amp;height=550&amp;lang=ru_RU&amp;sourceType=constructor&amp;scroll=false';
        var script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('src', src);
        map.appendChild(script);
      }
    }
  }
})();