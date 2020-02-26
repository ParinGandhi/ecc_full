(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('GetUserInfoController', function (ngDialog, userInfo, $timeout) {
      var vm = this;
      vm.workspace = userInfo;

      vm.focus = function () {
        $timeout(function () {
          var title = document.getElementById("workerNumber");
          title.focus();
        }, 300);

      };

      vm.focus();

      vm.pressEnter = function (event) {
        if (event.keyCode === 13) {
          vm.getWorker();
        }
      };

      vm.cancelAddWorkspaceModal = function () {
        ngDialog.closeAll();
      };

      vm.getWorker = function () {
        ngDialog.closeAll(vm.workerNumber);
      };

    });
})();
