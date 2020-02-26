(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('ManageWorkSpaceController', function (ngDialog, items, CONSTANTS, $rootScope, user) {
      var vm = this;
      vm.manageWorkspaces = items;
      vm.newWorkspaceOrder = angular.copy(items);

      vm.sortableOptionsForManageWorkspace = {
        containment: '#workspaceList',
        scroll: true,
        axis: 'y',
        cursor: 'move',
        scrollSpeed: 2,
        scrollSensitivity: 160
      };

      // Move list item Up
      vm.listItemUp = function (itemIndex) {
        vm.moveItem(itemIndex, itemIndex - 1);
      };

      // Move list item Down
      vm.listItemDown = function (itemIndex) {
        vm.moveItem(itemIndex, itemIndex + 1);
      };

      // Move list items up or down or swap
      vm.moveItem = function (origin, destination) {
        var temp = vm.newWorkspaceOrder[destination];
        vm.newWorkspaceOrder[destination] = vm.newWorkspaceOrder[origin];
        vm.newWorkspaceOrder[origin] = temp;
      };

      vm.cancelManageWorkspaceModal = function () {
        /* istanbul ignore if  */
        if (isListUpdated()) {
          ngDialog.open({
            template: 'app/components/workspace/manageWorkspaceConfirmationModal.html',
            controller: 'ConfirmManageWorkSpaceController',
            controllerAs: 'vm',
            width: '25%',
            showClose: false,
            closeByEscape: false,
            closeByDocument: false
          }).closePromise.then(function () {

          }, function () {

          });
        } else {
          ngDialog.closeAll();
        }
      };

      function isListUpdated() {
        var updatedFlag = false;
        for (var i = 0; i < vm.newWorkspaceOrder.length; i++) {
          /* istanbul ignore if  */
          if (vm.newWorkspaceOrder[i].userWorkspaceIdentifier !== vm.manageWorkspaces[i].userWorkspaceIdentifier) {
            updatedFlag = true;
            break;
          }
        }
        return updatedFlag;
      }

      vm.saveWorkspace = function () {
        var updatedWorkspaceList = [];
        for (var i = 0; i < vm.newWorkspaceOrder.length; i++) {
          var currentWorkspace = {
            'userWorkspaceIdentifier': vm.newWorkspaceOrder[i].userWorkspaceIdentifier,
            'defaultIndicator': vm.newWorkspaceOrder[i].defaultIndicator,
            'currentWorkspaceOrderNumber': i,
            'auditData': {
              'lastModifiedUserIdentifier': user
            }
          };
          updatedWorkspaceList.push(currentWorkspace);
        }
        ngDialog.closeAll(updatedWorkspaceList);
      };

    });
})();
