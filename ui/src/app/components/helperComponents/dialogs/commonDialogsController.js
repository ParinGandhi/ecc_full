'use strict';
/**
 * Common angular dialog. can be used by any angular ui
 */
angular
  .module('ptabe2e')
  .controller('CommonDialogController', function ($scope) {

    var vm = this;
    vm.dialogInfo = $scope.ngDialogData;
  });
