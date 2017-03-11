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
