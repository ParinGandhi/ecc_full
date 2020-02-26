(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('EditTitleController', function (ngDialog, title, allWorkspaces,$log, CONSTANTS, $rootScope, $timeout, HttpFactory, $scope) {

      var vm = this;
      vm.showErrorMsg = false;
      $rootScope.editTitleController = true;

      var mainScope = angular.element(document.getElementById('mainTabId')).scope();
      var workspaces = angular.copy(allWorkspaces);
      vm.newTitle = title;
      vm.originalActiveWorkspace = angular.copy(workspaces[vm.newTitle.currentWorkspaceOrderNumber]);
      vm.newTitle.userWorkspaceName = title.userWorkspaceName.replace(/&nbsp;/g, " ");
      vm.layouts = CONSTANTS.LAYOUTS;
      var tempTitle = angular.copy(title.userWorkspaceName);
      var tempLayout = angular.copy(title.structure);
      var originalStructure = angular.copy(title.structure);
      angular.forEach(vm.layouts, function (layout) {
        /* istanbul ignore if */
        if (layout.structure === originalStructure) {
          vm.selectedImage = layout.name;
        }
      });
      vm.newTitle.layoutChanged = false;
      vm.changesMade = false;
      vm.cancelAfterSave = false;

      vm.focus = function () {
        $timeout(function () {
          var title = document.getElementById("dashboardTitle");
          title.focus();
        }, 100);

      };

      vm.focus();

      vm.clearTitle = function () {
        vm.newTitle.userWorkspaceName = "";
        vm.checkLength();
        vm.focus();
      };

      vm.cancelAddWorkspaceModal = function () {
        if (vm.cancelAfterSave) {
          ngDialog.closeAll(vm.newTitle);
        } else {

          vm.newTitle.configurationChanged = false;
          vm.newTitle.layoutChanged = false;
          vm.newTitle.userWorkspaceName = tempTitle;
          vm.newTitle.structure = tempLayout;
          ngDialog.closeAll(vm.newTitle);
        }

      };

      vm.checkLength = function () {
        if (vm.newTitle.userWorkspaceName.trim().length <= 0) {
          vm.showErrorMsgData = true;
          vm.errorMsg = "The workspace title cannot be empty.";
        } else {
          vm.showErrorMsgData = false;
        }
      };

      vm.checkForChange = function () {
        vm.changesMade = true;
      };

      vm.checkForStructureChange = function () {
        if (vm.newTitle.structure !== vm.originalActiveWorkspace.structure) {
          vm.changesMade = true;
        }
      };


      vm.updateWorkspace = function (saveFlag) {
        vm.cancelAfterSave = true;
        vm.newTitle.layoutChanged = !(vm.newTitle.structure === originalStructure);
        /* istanbul ignore if */
        if (vm.newTitle.userWorkspaceName.toUpperCase() === tempTitle.toUpperCase()) {
          vm.newTitle.save = saveFlag;
          ngDialog.closeAll(vm.newTitle);
        } else {
          for (var i = 0; i < workspaces.length; i++) {
            if (vm.newTitle.userWorkspaceName.toUpperCase() === workspaces[i].userWorkspaceName.replace(/&nbsp;/g, " ").toUpperCase()) {
              vm.showErrorMsg = true;
              vm.errorMsg = "This workspace title already exists, please enter a unique workspace title for this workspace.";
              vm.focus();
              break;
            }
          }
          if (!vm.showErrorMsg) {
            vm.newTitle.save = saveFlag;
            ngDialog.closeAll(vm.newTitle);
          }
        }

      };

      //**
      vm.workspaceId = vm.newTitle.userWorkspaceIdentifier;

      // Move list items up or down or swap
      vm.moveItem = function (array, origin, destination) {
        var temp = array[destination];
        array[destination] = array[origin];
        array[origin] = temp;
      };

      // Move list item Up
      vm.listUp = function (array, itemIndex) {
        vm.moveItem(array, itemIndex, itemIndex - 1);
      };

      // Move list item Down
      vm.listDown = function (array, itemIndex) {
        vm.moveItem(array, itemIndex, itemIndex + 1);
      };

      vm.moveSourcetoDestination = function (source, destination, widget) {
        destination.push(widget);
        source.splice(source.indexOf(widget), 1);
        document.getElementById('saveOrderWS').focus();
      };

      vm.getWorkspaceConfig = function () {
        HttpFactory.getActions(CONSTANTS.URL.USER_WORKSPACE_WIDGET + CONSTANTS.URL.BY_ZONES + vm.workspaceId)
          .then(function (successResponse) {
            vm.one = successResponse.data.zoneWidgetsMap[1];
            vm.two = successResponse.data.zoneWidgetsMap[2];
            vm.three = successResponse.data.zoneWidgetsMap[3];
            vm.four = successResponse.data.zoneWidgetsMap[4];
            vm.five = successResponse.data.zoneWidgetsMap[5];
            $scope.originalOne = angular.copy(vm.one);
            $scope.originalTwo = angular.copy(vm.two);
            $scope.originalThree = angular.copy(vm.three);
            $scope.originalFour = angular.copy(vm.four);
            $scope.originalFive = angular.copy(vm.five);
          }, function (failureResponse) {
             $log.info(failureResponse);
          });
      };


      vm.getWorkspaceLayout = function () {
        return {
          "userWorkspaceIdentifier": vm.workspaceId,
          "zoneWidgetsMap": {
            "1": vm.one,
            "2": vm.two,
            "3": vm.three,
            "4": vm.four,
            "5": vm.five
          }
        };
      };

      vm.saveWorkspaceConfig = function (saveFlag) {
        vm.newTitle.save = saveFlag;
        HttpFactory.putActions(CONSTANTS.URL.USER_WORKSPACE_WIDGET + CONSTANTS.URL.BY_ZONES + vm.workspaceId, vm.getWorkspaceLayout())
          .then(function (successResponse) {
            var original = vm.getWorkspaceLayout();
            $scope.originalOne = original.zoneWidgetsMap[1];
            $scope.originalTwo = original.zoneWidgetsMap[2];
            $scope.originalThree = original.zoneWidgetsMap[3];
            $scope.originalFour = original.zoneWidgetsMap[4];
            $scope.originalFive = original.zoneWidgetsMap[5];
             $log.info(successResponse);
            ngDialog.closeAll(vm.newTitle);
          }, function (failureResponse) {
             $log.info(failureResponse);
          });

      };
      vm.closeWorkspaceSettings = function () {
        vm.newTitle.save = 'true';
        ngDialog.closeAll(vm.newTitle);
      };

      function checkDestination(event, scope) {
        scope.content;
        scope.widgetArrange;
        if (event.currentTarget.textContent === 'Title and layout') {
          scope.content = false;
          scope.widgetArrange = false;
        }
        if (event.currentTarget.textContent === 'Arrange widgets') {
          scope.content = true;
          scope.widgetArrange = true;
        }
        if (event.currentTarget.textContent === 'Cancel' || event.currentTarget.id === 'workspaceCloseButton') {
          ngDialog.closeAll();
          return;
        }
      }

      vm.saveChanges = function (event, scope) {
        /* istanbul ignore if */
        if (event.currentTarget.offsetParent.classList.value !== "active" &&
          (vm.newTitle.userWorkspaceName !== mainScope.vm.tempTitle.trim().replace(/&nbsp;/g, " ") ||
            vm.newTitle.structure !== mainScope.vm.tempStructure ||
            !angular.equals(scope.originalOne, vm.one) ||
            !angular.equals(scope.originalTwo, vm.two) ||
            !angular.equals(scope.originalThree, vm.three) ||
            !angular.equals(scope.originalFour, vm.four) ||
            !angular.equals(scope.originalFive, vm.five))) {
          if (event.currentTarget.textContent === 'Cancel' || event.currentTarget.id === 'workspaceCloseButton') {
            scope.setCancel = true;
          } else {
            scope.setCancel = false;
          }
          if (!vm.showErrorMsg) {
            ngDialog.open({
              template: 'app/components/workspace/saveChangesModal.html',
              controller: 'saveChangesController',
              controllerAs: 'vm',
              width: '25%',
              showClose: false,
              closeByEscape: false,
              closeByDocument: false,
              resolve: {
                flags: function () {
                  return scope;
                }
              }
            });
          }

        } else {

          checkDestination(event, scope);

        }

      };

    });
})();
