(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('AddWorkSpaceController', function (ngDialog, items, CONSTANTS, $rootScope, $timeout) {
      var vm = this;
      vm.showErrorMsg = false;
      $rootScope.addWorkspaceController = true;
      var workspaces = items;
      vm.layouts = CONSTANTS.LAYOUTS;
      vm.workspace = {};
      vm.workspace.structure = vm.layouts[0].structure;

      var newWorkspaceNumber = workspaces.length + 1;
      vm.workspace.userWorkspaceName = "Workspace_" + newWorkspaceNumber;
      vm.selectedImage = vm.layouts[0].name;

      vm.focus = function () {
        $timeout(function () {
          var title = document.getElementById("dashboardTitle");
          title.focus();
        }, 100);

      };
      vm.clearTitle = function () {
        vm.workspace.userWorkspaceName = "";
        vm.checkLength();
        vm.focus();
      };

      vm.cancelAddWorkspaceModal = function () {
        document.getElementById("addWorkspaceBtn").blur();
        ngDialog.closeAll();
      };

      vm.checkLength = function () {
        if (vm.workspace.userWorkspaceName.length <= 0) {
          vm.showErrorMsg = true;
          vm.errorMsg = "The workspace title cannot be empty.";
        } else {
          vm.showErrorMsg = false;
        }
      };

      vm.addWorkspace = function () {
        for (var i = 0; i < workspaces.length; i++) {
          if (vm.workspace.userWorkspaceName.toUpperCase() === workspaces[i].tooltip.toUpperCase()) {
            vm.showErrorMsg = true;
            vm.errorMsg = "This workspace title already exists, please enter a unique workspace title for this new workspace.";
            break;
          } else {
            vm.showErrorMsg = false;
          }
        }
        if (!vm.showErrorMsg) {
        ngDialog.closeAll(vm.workspace);
        }
      };

    });
})();
