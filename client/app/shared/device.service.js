(function() {
'use strict';

  angular
    .module('app')
    .factory('DeviceDetector', DeviceDetector);

  DeviceDetector.inject = [];

  function DeviceDetector() {
    var service = {
      isPhone: isPhone,
      isTablet: isTablet,
      isDesktop: isDesktop
    };
    
    return service;

    ////////////////
    function isPhone() { 
      return device.mobile();
    }

    function isTablet() { 
      return device.tablet();
    }

    function isDesktop() { 
      return device.desktop();
    }
  }
})();
