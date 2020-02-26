(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('MoveWidgetController', /* istanbul ignore next */ function (ngDialog, $rootScope, HttpFactory, CONSTANTS, dashboard, selectedWidgetToCopy, CommonHelperService) {
      /* istanbul ignore next */
      var vm = this;
      /* istanbul ignore next */
      vm.isChosen = false;
      /* istanbul ignore next */
      vm.selectedWidgetToCopy = selectedWidgetToCopy;
      /* istanbul ignore next */
      getWidgets();
      /* istanbul ignore next */
      vm.currentTabList = angular.element(document.getElementById('mainTabId'))[0].children[0].children;
      /* istanbul ignore next */
      vm.tabs = [];
      /* istanbul ignore next */
      vm.selectedTab = {};
      /* istanbul ignore next */
      for (var i = 0; i < vm.currentTabList.length; i++) {
        vm.tabs.push({
          index: i,
          heading: vm.currentTabList[i].innerText.trim()
        });
      }
      /* istanbul ignore next */
      vm.canBeMoved = function () {
        vm.isChosen = true;
      };

      /**
       * This will retrieve all widgets
       */
      /* istanbul ignore next */
      function getWidgets() {
        HttpFactory.getActions(CONSTANTS.URL.WIDGETS)
          .then(function (successResponse) {
            vm.widgets = [];
            for (var i = 0; i < successResponse.data.length; i++) {
              vm.widgets.push({
                id: successResponse.data[i].identifier,
                type: successResponse.data[i].widgetName,
                title: successResponse.data[i].noteText,
                subcategory: successResponse.data[i].subcategoryInfo.subcategoryName
              });
            }
          }, function () {
            CommonHelperService.setToastr("No widgets found.", "warning");
          });
      }
      /* istanbul ignore next */
      vm.cancelMoveWidgetToWorkspaceModal = function () {
        var openDialogs = ngDialog.getOpenDialogs();
        if (openDialogs.length > 1) {
          ngDialog.close(openDialogs[openDialogs.length - 1]);
        } else {
          ngDialog.close();
        }
      };
      /**
       * Utility: this method is to find correct position of the new widget to add
       */
      /* istanbul ignore next */
      function getNewWidgetPosition(workspace) {
        var rows = dashboard.structures[workspace.userWorkspaceIdentifier].rows;
        for (var i = 0; i < rows.length; i++) {
          for (var j = 0; j < rows[i].columns.length; j++) {
            if (rows[i].columns[j].focus) {
              if (angular.isUndefined(rows[i].columns[j].widgets)) {
                return i + "||" + j + "||0";
              } else {
                return i + "||" + j + "||" + rows[i].columns[j].widgets.length;
              }
            }
          }
        }
      }
      /**
       * Utility: this method is to get all widget list
       */
      /* istanbul ignore next */
      function getAllWidgetsList(workspace) {
        var widgetList = [];
        for (var i = 0; i < workspace.rows.length; i++) {
          for (var j = 0; j < workspace.rows[i].columns.length; j++) {
            if (angular.isDefined(workspace.rows[i].columns[j].widgets)) {
              for (var k = 0; k < workspace.rows[i].columns[j].widgets.length; k++) {
                widgetList.push(workspace.rows[i].columns[j].widgets[k]);
              }
            }
          }
        }
        return widgetList;
      }

      /*
       * This method is to find new number for the widget
       */
      /* istanbul ignore next */
      function getNewWidgetNumber(maxNum, widget, titleArr, existWidget) {
        var title = titleArr[0];
        if (widget.title === title.trim()) {
          var ext = existWidget.title.match(/-\d+$/);
          if (angular.isDefined(ext)) {
            var number = ext[0].split("-")[1];
            if (parseInt(number, CONSTANTS.GLOBAL.RADIX) > maxNum) {
              return parseInt(number, CONSTANTS.GLOBAL.RADIX) + 1;
            } else if (parseInt(number, CONSTANTS.GLOBAL.RADIX) === maxNum) {
              return maxNum + 1;
            }
          }
        }
        return maxNum;
      }

      /**
       * This method is to find new name of the widget
       */
      /* istanbul ignore next */
      function getNewWidgetName(widget, widgetList) {
        var maxNum = 0;
        for (var i = 0; i < widgetList.length; i++) {
          if (widget.type === widgetList[i].type) {
            var titleArr = widgetList[i].title.split(widgetList[i].title.match(/-\d+$/));
            if (titleArr.length > 1) {
              maxNum = getNewWidgetNumber(maxNum, widget, titleArr, widgetList[i]);
            } else if (titleArr.length === 1 && widget.title === titleArr[0].trim() && maxNum === 0) {
              maxNum = 1;
            }
          }
        }
        if (maxNum !== 0) {
          return widget.title + " -" + maxNum;
        } else {
          return widget.title;
        }
      }
      /**
       * This method is to call copy widget service POST
       */
      /* istanbul ignore next */
      function moveWidgetServiceCall(widget, tabIndex) {
        var scope = angular.element(document.getElementById('mainTabId')).scope();
        var data = {
          userWorkspaceData: {
            userWorkspaceIdentifier: scope.vm.workspaces[tabIndex].userWorkspaceIdentifier
          },
          userWorkspaceWidgetIdentifier: parseInt(widget.widgetIdentifier, CONSTANTS.GLOBAL.RADIX),
          widgetPositionText: widget.position,
          deleteAfterCopy: true,
          auditData: {
            lastModifiedUserIdentifier: scope.vm.userInfo.userId,
            createUserIdentifier: scope.vm.userInfo.userId
          }
        };
        HttpFactory.postActions(CONSTANTS.URL.USER_WORKSPACE_WIDGET + "copy", data)
          .then(function (successResponse) {


            //update the workspace in case ADDED
            var scope = angular.element(document.getElementById('mainTabId')).scope();
            scope.vm.updateWorkspaces();
            $rootScope.$broadcast('adfDeleteWidgetAfterMove', {
              definition: JSON.stringify(widget),
              tabIndex: vm.getActiveTab()
            });
            CommonHelperService.setToastr("The widget '" + successResponse.data.widgetCustomName + "' has been successfully moved to workspace '" +
              scope.vm.workspaces[tabIndex].userWorkspaceName + "'.", "success");
            $rootScope.$broadcast('adfAddWidgetCustom', {
              type: widget.type,
              title: successResponse.data.widgetCustomName,
              tooltip: successResponse.data.widgetCustomName,
              tabIndex: tabIndex,
              widgetIdentifier: successResponse.data.userWorkspaceWidgetIdentifier,
              color: successResponse.data.widgetColor,
              height: successResponse.data.widgetHeightPixelQuality,
              zoneWidth: successResponse.data.zoneWidth,
              dataUrlText: successResponse.data.dataUrlText,
              isNew: widget.isNew //isNew will not change when move from workspace to another
            });
            //setting added wigets to Edit Mode if the current tab is in Edit Mode
            $rootScope.$broadcast('settingWigetsToEditMode', {
              value: tabIndex
            });
          }, function (failureResponse) {
            CommonHelperService.setToastr(failureResponse.data.message, "error");
            //reload the workspace in case ADDED failed
            var scope = angular.element(document.getElementById('mainTabId')).scope();
            scope.vm.reloadScreen();
          });

      }

      /* istanbul ignore next */
      vm.acceptMoveWidgetToWorkspaceModal = function () {
        if (angular.isDefined(selectedWidgetToCopy)) {
          var widgetToCopy = angular.copy(selectedWidgetToCopy);
          var scope = angular.element(document.getElementById('mainTabId')).scope();
          var widgetListInWorkspace;
          ngDialog.closeAll();
          widgetListInWorkspace = getAllWidgetsList(scope.vm.workspaces[vm.selectedTab.index]);
          widgetToCopy.title = getNewWidgetName(angular.copy(widgetToCopy), widgetListInWorkspace);
          widgetToCopy.position = getNewWidgetPosition(scope.vm.workspaces[vm.selectedTab.index]);
          moveWidgetServiceCall(widgetToCopy, vm.selectedTab.index);
        }
      };


      /**
       * This method is to get active tab index
       */
      /* istanbul ignore next */
      vm.getActiveTab = function () {
        var scope = angular.element(document.getElementById('mainTabId')).scope();
        return scope.vm.activeTabIndex;
      };

      /**
       * This method is to get default tab index
       */
      /* istanbul ignore next */
      vm.getDefaultTab = function () {
        var scope = angular.element(document.getElementById('mainTabId')).scope();
        for (var i = 0; i < scope.vm.workspaces.length; i++) {
          if (scope.vm.workspaces[i].defaultIndicator) {
            return i;
          }
        }
      };
    });
})();
