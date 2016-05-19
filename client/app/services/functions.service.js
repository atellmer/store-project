;
(function() {
'use strict';

	angular
		.module('app')
		.factory('lkFunctions', lkFunctions);

	lkFunctions.$inject = [];
	
	function lkFunctions() {
		var service = {
			makeArrayOf: makeArrayOf
		};
		
		return service;

		////////////////
		function makeArrayOf(value, length) {
			var array = [];
			
			while (length--) {
				array[length] = value;
			}
		  return array;
		}
	}
})();