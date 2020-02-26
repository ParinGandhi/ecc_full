(function () {
  'use strict';

  angular
    .module('ptabe2e')
    .directive('gridLoader', function () {
      return {
        restrict: 'EA',

        template: '<div class="grid-msg-overlay" ng-show="isLoading">' +
          '<div class="msg">' +
          '<span>Loading data...' +
          '<i class="fas fa-spinner fa-spin"></i>' +
          '</span>' +
          '</div>' +
          '</div>'

        //   '<div class="progress" ng-if="isLoading" >' +
        //     '<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
        //     '<span class="sr-only">Loading...</span>' +
        //     '</div>' +
        //     '</div>'
      };
    })
})();
