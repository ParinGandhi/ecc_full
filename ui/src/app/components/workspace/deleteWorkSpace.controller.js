(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('DeleteWorkSpaceController', function (ngDialog, items, work) {
      var vm = this;
      vm.workspace = items;
      vm.workspace.userWorkspaceName = items.userWorkspaceName.replace(/&nbsp;/g, " ");
      vm.totalWorkspaces = work;

      vm.current = vm.workspace.currentWorkspaceOrderNumber;
      if (vm.current === vm.totalWorkspaces.length - 1) {
        vm.next = vm.current - 1;
      } else {
        vm.next = vm.current + 1;
      }
      vm.totalWorkspaces[vm.next].userWorkspaceName = work[vm.next].userWorkspaceName.replace(/&nbsp;/g, " ");

      vm.confirmDelete = function (response) {
        if (response) {
          ngDialog.closeAll(vm.workspace);
        } else {
          ngDialog.closeAll();
        }
      };

    });
})();
