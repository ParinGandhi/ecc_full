(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('AddWidgetController', /* istanbul ignore next */ function (ngDialog, $rootScope,
      HttpFactory, CONSTANTS, selectedWidgetToCopy, $timeout, CommonHelperService, $http) {

      /* istanbul ignore next */
      var vm = this;
      /* istanbul ignore next */
      getWidgets();
      /* istanbul ignore next */
      vm.currentTabList = angular.element(document.getElementById('mainTabId'))[0].children[0].children;
      /* istanbul ignore next */
      vm.tabs = [];
      /* istanbul ignore next */
      for (var i = 0; i < vm.currentTabList.length; i++) {
        vm.tabs.push({
          index: i,
          heading: vm.currentTabList[i].innerText.trim()
        });
      }
      //focus on the left navigation bar
      /* istanbul ignore next */
      vm.focus = function () {
        $timeout(function () {
          var title = document.getElementById("menu-btn-0");
          title.focus();
        }, 300);
      };
      /* istanbul ignore next */
      vm.focus();

      /**
       * This will retrieve all widgets
       */
      /* istanbul ignore next */
      function getWidgets() {
        HttpFactory.getActions(CONSTANTS.URL.WIDGETS)
          // $http.get("assets/widgets.json")
          .then(function (successResponse) {
            vm.widgets = [];
            for (var i = 0; i < successResponse.data.length; i++) {
              vm.widgets.push({
                id: successResponse.data[i].identifier,
                type: successResponse.data[i].widgetName,
                title: successResponse.data[i].noteText,
                displayOrder: successResponse.data[i].displayOrder,
                subcategory: successResponse.data[i].subcategoryInfo.subcategoryName
              });
            }
          }, function () {
            CommonHelperService.setToastr("No widgets found.", "warning");
          });
      }
      /**
       * This method will ask for confirmation
       */
      /* istanbul ignore next */
      vm.cancelAddWidgetModal = function () {
        if (isWidgetToAdd()) {
          ngDialog.open({
            template: 'app/components/widgets/cancelAddWidgetModal.html',
            controller: 'AddWidgetController',
            controllerAs: 'vm',
            width: '25%',
            showClose: false,
            closeByEscape: false,
            resolve: {
              selectedWidgetToCopy: function () {
                return undefined;
              }
            }
          });
        } else {
          ngDialog.close();
        }
      };
      /*
       * This method is to handle cancel add widgets in widget library
       */
      /* istanbul ignore next */
      vm.confirmCancel = function (response) {
        if (response) {
          clearWidgetToAdd();
          ngDialog.close();
        } else {
          vm.cancelAddWidgetToWorkspaceModal();
        }
      };
      /**
       * This method will save all added widgets
       */
      /* istanbul ignore next */
      vm.saveAddWidgetModalClose = function () {
        if (isWidgetToAdd()) {
          addWidgetServiceCall();
          ngDialog.close();
        } else {
          ngDialog.close();
        }
      };
      /* istanbul ignore next */
      vm.saveAddWidgetModal = function () {
        if (isWidgetToAdd()) {
          addWidgetServiceCall();
        }
      };
      /* istanbul ignore next */
      vm.cancelAddWidgetToWorkspaceModal = function () {
        var openDialogs = ngDialog.getOpenDialogs();
        if (openDialogs.length > 1) {
          ngDialog.close(openDialogs[openDialogs.length - 1]);
        } else {
          ngDialog.close();
        }
      };


      /**
       * This method is to call copy widget service POST
       */
      /* istanbul ignore next */
      function copyWidgetServiceCall(widget, tabIndex) {
        var scope = angular.element(document.getElementById('mainTabId')).scope();
        var data = {
          userWorkspaceData: {
            userWorkspaceIdentifier: scope.vm.workspaces[tabIndex].userWorkspaceIdentifier
          },
          userWorkspaceWidgetIdentifier: parseInt(widget.widgetIdentifier, CONSTANTS.GLOBAL.RADIX),
          widgetPositionText: widget.position,
          zoneWidth: widget.zoneWidth,
          dataUrlText: widget.dataUrlText,
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
            CommonHelperService.setToastr("The widget '" + successResponse.data.widgetCustomName + "' has been successfully copied to workspace '" +
              scope.vm.workspaces[tabIndex].userWorkspaceName + "'.", "warning");
            $rootScope.$broadcast('adfAddWidgetCustom', {
              type: widget.type,
              widgetTypeIdentifier: successResponse.data.widgetData.widgetIdentifier,
              title: successResponse.data.widgetCustomName,
              existingTitle: angular.copy(successResponse.data.widgetCustomName).replace(/ /g, "&nbsp;"), //add &nbsp back to existing title
              tooltip: successResponse.data.widgetCustomName,
              tabIndex: tabIndex,
              widgetIdentifier: successResponse.data.userWorkspaceWidgetIdentifier,
              color: successResponse.data.widgetColor,
              height: successResponse.data.widgetHeightPixelQuality,
              styleClass: successResponse.data.widgetColor + " " + successResponse.data.widgetHeightPixelQuality,
              zoneWidth: successResponse.data.zoneWidth,
              dataUrlText: successResponse.data.dataUrlText,
              isNew: true //isNew = true when add and copy
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
      /**
       * Utility: this method is to verify if there is any widgets to add
       */
      /* istanbul ignore next */
      function isWidgetToAdd() {
        var scope = angular.element(document.getElementById('mainTabId')).scope();
        if (scope.$parent.addedWidgets === undefined) {
          scope.$parent.addedWidgets = [];
        }
        return scope.$parent.addedWidgets.length === 0 ? false : true;
      }
      /**
       * Utility: this method is to clear all widgets to add
       */
      /* istanbul ignore next */
      function clearWidgetToAdd() {
        $timeout(function () {
          var scope = angular.element(document.getElementById('mainTabId')).scope();
          scope.$parent.addedWidgets = [];
          angular.forEach(scope.vm.workspaces, function (workspace) {
            workspace.addedWidgets = [];
          });
        }, 500);
      }

      /**
       * Utility: this method is to prepare single widget item
       */
      /* istanbul ignore next */
      function prepareWidgetToAdd(widget, tabIndex) {
        var scope = angular.element(document.getElementById('mainTabId')).scope();
        var data = {
          userWorkspaceData: {
            userWorkspaceIdentifier: scope.vm.workspaces[tabIndex].userWorkspaceIdentifier
          },
          widgetData: {
            widgetIdentifier: parseInt(widget.id, CONSTANTS.GLOBAL.RADIX)
          },
          viewLayoutData: {
            descriptionText: "description"
          },
          widgetPositionText: widget.position,
          category: widget.type,
          //widgetCustomName: widget.title,
          widgetCustomName: angular.copy(widget.title).replace(/&nbsp;/g, " "),
          configText: "{\"collapsedIndicator\":false}",
          widgetHeightPixelQuality: " ",
          widgetColor: " ",
          auditData: {
            lastModifiedUserIdentifier: scope.vm.userInfo.userId,
            createUserIdentifier: scope.vm.userInfo.userId
          }
        };
        //add widgets in to addedWidgets list
        if (scope.$parent.addedWidgets === undefined) {
          scope.$parent.addedWidgets = [];
        }
        scope.$parent.addedWidgets.push(data);
      }


      /**
       * This method was used in addWidgetToastrBuilder ONLY to get widget type
       */
      /* istanbul ignore next */
      function getWidgetType(widgetListUnsorted) {
        var widgetType = "";
        for (var i = 0; i < vm.widgets.length; i++) {
          if (parseInt(vm.widgets[i].id, CONSTANTS.GLOBAL.RADIX) === widgetListUnsorted.widgetData.widgetIdentifier) {
            widgetType = vm.widgets[i].type;
          }
        }
        return widgetType;
      }
      /**
       * This method is to buid add widget success message
       */
      /* istanbul ignore next */
      function addWidgetToastrBuilder(successResponse, scope) {
        var widgetListUnsorted = successResponse.data;
        var workspacesList = scope.vm.workspaces;
        var message = "";
        var count = 0;
        for (var i = 0; i < workspacesList.length; i++) {
          for (var j = 0; j < widgetListUnsorted.length; j++) {
            if (widgetListUnsorted[j].userWorkspaceData.userWorkspaceIdentifier === workspacesList[i].userWorkspaceIdentifier) {
              message += ((count > 0 ? ", " : "") + "'" + widgetListUnsorted[j].widgetCustomName + "'");
              count++;
              //add new widget to dashboard UI
              $rootScope.$broadcast('adfAddWidgetCustom', {
                type: getWidgetType(widgetListUnsorted[j]),
                widgetTypeIdentifier: widgetListUnsorted[j].widgetData.widgetIdentifier,
                title: widgetListUnsorted[j].widgetCustomName,
                existingTitle: widgetListUnsorted[j].widgetCustomName, //when adding, there is no existing title
                tooltip: widgetListUnsorted[j].widgetCustomName,
                tabIndex: i,
                widgetIdentifier: widgetListUnsorted[j].userWorkspaceWidgetIdentifier,
                color: widgetListUnsorted[j].widgetColor,
                height: widgetListUnsorted[j].widgetHeightPixelQuality,
                zoneWidth: widgetListUnsorted[j].zoneWidth,
                dataUrlText: widgetListUnsorted[j].dataUrlText,
                isNew: true //isNew = true when add and copy
              });
              //setting added wigets to Edit Mode if the current tab is in Edit Mode
              $rootScope.$broadcast('settingWigetsToEditMode', {
                value: i
              });
            }
          }
          if (count > 1) {
            message += " have been added to '" + workspacesList[i].userWorkspaceName + "'.";
          } else if (count === 1) {
            message += " has been added to '" + workspacesList[i].userWorkspaceName + "'.";
          }
          count = 0;
        }
        return message;
      }
      /**
       * This method is to arrange widgets into workspaces
       */
      /* istanbul ignore next */
      function groupAddedWidgetsByWorkspaces() {
        var scope = angular.element(document.getElementById('mainTabId')).scope();
        var workspacesList = scope.vm.workspaces;
        for (var i = 0; i < workspacesList.length; i++) {
          for (var j = 0; j < scope.$parent.addedWidgets.length; j++) {
            if (workspacesList[i].userWorkspaceIdentifier === scope.$parent.addedWidgets[j].userWorkspaceData.userWorkspaceIdentifier) {
              if (workspacesList[i].addedWidgets === undefined) {
                workspacesList[i].addedWidgets = [];
              }
              workspacesList[i].addedWidgets.push(scope.$parent.addedWidgets[j]);
            }
          }
        }
        return workspacesList;
      }
      /**
       * This method is to call service POST
       */
      /* istanbul ignore next */
      function addWidgetServiceCall() {
        var workspacesList = groupAddedWidgetsByWorkspaces();

        for (var i = 0; i < workspacesList.length; i++) {
          if (angular.isDefined(workspacesList[i].addedWidgets) && workspacesList[i].addedWidgets.length > 0) {
            HttpFactory.postActions(CONSTANTS.URL.USER_WORKSPACE_WIDGET + 'bulk', workspacesList[i].addedWidgets)
              .then(function (successResponse) {
                var scope = angular.element(document.getElementById('mainTabId')).scope();
                scope.vm.updateWorkspaces();
                CommonHelperService.setToastr(addWidgetToastrBuilder(successResponse, scope), "success", null, null, true);
                clearWidgetToAdd();
              }, function (failureResponse) {
                if (failureResponse.data.message) {
                  CommonHelperService.setToastr(failureResponse.data.message, "error");
                } else {
                  CommonHelperService.setToastr(failureResponse.data, "error");
                }

                //reload the workspace in case ADDED failed
                var scope = angular.element(document.getElementById('mainTabId')).scope();
                scope.vm.reloadScreen();
                clearWidgetToAdd();
              });
          }
        }
      }
      /* istanbul ignore next */
      vm.acceptAddWidgetToWorkspaceModal = function (widget, tabs) {
        if (selectedWidgetToCopy === undefined) {
          var widgetToAdd = {};
          var openDialogs = ngDialog.getOpenDialogs();
          if (openDialogs.length > 1) {
            ngDialog.close(openDialogs[openDialogs.length - 1]);
          } else {
            ngDialog.close();
          }
          angular.forEach(tabs, function (tab) {
            if (tab.checked) {
              widgetToAdd = angular.copy(widget);
              prepareWidgetToAdd(widgetToAdd, tab.index);
            }
          });
        } else if (selectedWidgetToCopy !== undefined) {
          var widgetToCopy = angular.copy(selectedWidgetToCopy);
          ngDialog.closeAll();
          angular.forEach(tabs, function (tab) {
            if (tab.checked) {
              copyWidgetServiceCall(widgetToCopy, tab.index);
            }
          });
        }
      };
      /* istanbul ignore next */
      vm.addWidget = function (widget) {
        $rootScope.selectedWidget = widget;
        ngDialog.open({
          template: "app/components/widgets/addWidgetToWorkspacesModal.html",
          controller: 'AddWidgetController',
          controllerAs: 'vm',
          width: '50%',
          closeByEscape: false,
          showClose: false,
          resolve: {
            selectedWidgetToCopy: function () {
              return undefined;
            }
          }
        });
      };
      /**
       * This method is to verify if any check-box checked
       */
      /* istanbul ignore next */
      vm.canBeAdded = function () {
        var ableToAdd = false;
        angular.forEach(vm.tabs, function (tab) {
          if (tab.checked) {
            ableToAdd = true;
          }
        });
        return ableToAdd;
      };
      /**
       * This method is to verify if it's copy or add widget
       */
      /* istanbul ignore next */
      vm.isCopy = function () {
        return !selectedWidgetToCopy ? false : true;
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
