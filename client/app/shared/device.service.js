(function() {
'use strict';

  angular
    .module('app')
    .factory('DeviceDetector', DeviceDetector);

  DeviceDetector.inject = ['spawn$'];

  function DeviceDetector(spawn$) {
    var service = {
      detect: detect
    };
    
    return service;

    ////////////////
    function detect() {
      spawn$.update('device.desktop', device.desktop());
      spawn$.update('device.tablet', device.tablet());
      spawn$.update('device.mobile', device.mobile());
      spawn$.update('@ACTIONS.DETECT_DEVICE', new Date());
    }
  }
})();
