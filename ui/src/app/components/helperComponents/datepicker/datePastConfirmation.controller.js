(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('ConfirmManagePastDateController', function (ngDialog) {
      var vm = this;
      vm.confirmCancel = function () {
        ngDialog.closeAll();
      };
    });
})();
