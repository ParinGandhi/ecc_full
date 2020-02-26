(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('ConfirmManageWorkSpaceController', function (ngDialog) {
      var vm = this;

      vm.confirmCancel = function () {
        ngDialog.closeAll();
      };

    });
})();
