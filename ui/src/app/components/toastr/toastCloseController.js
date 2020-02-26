(function () {
  'use strict';
  angular
    .module('ptabe2e')
    .controller('toastCloseController', function ($scope, ngDialog, message, title, toastClass, toastType) {
      $scope.message = message;
      $scope.title = title;
      $scope.toastType = toastType;
      $scope.toastClass = toastClass;
      $scope.closeDialoggss = function () {

        ngDialog.closeAll();
      };
    });
})();
