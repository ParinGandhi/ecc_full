(function () {
  'use strict';

  angular
    .module('ptabe2e')
    .directive('vcdLoader', function () {
      return {
        restrict: 'EA',

        template: '<div id="customid" class="grid-msg-overlay" ng-show="isloading">' +
          '<div class="msg">' +
          '<span>Loading data...' +
          '<i class="fas fa-spinner fa-spin"></i>' +
          '</span>' +
          '</div>' +
          '</div>',
        scope: {
          isloading: '=?',
          customid: '=?'
        }

      };
    });
})();
