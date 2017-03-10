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
