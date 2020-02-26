(function ($) {
  "use strict";

  angular
    .module('ptabe2e')
    .directive('widgetResize', /* istanbul ignore next */ function ($window, $timeout) {
      return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
          return {
            'h': element[0].clientHeight,
            'w': element[0].clientWidth
          };
        };
        scope.$watch(scope.getWindowDimensions, function (
          newValue) {
          $timeout(function () {
            scope.widgetHeight = newValue.h;
            scope.widgetWidth = newValue.w;

            scope.style = function () {
              return {
                'height': (newValue.h - 100) + 'px',
                'width': (newValue.w - 100) + 'px'
              };
            };
          }, 1000);

        }, true);

        w.bind('resize', function () {
          scope.$apply();
        });
      };
    })
    .controller('MainController', function (ngDialog, HttpFactory, CONSTANTS, $rootScope, dashboard, $scope, $timeout, $window, CommonHelperService, $location) {
      var vm = this;
      var activeWorkspace;
      vm.workspaces = [];
      vm.workspaceOrderChanged = false;
      vm.initialWorkspace = false;
      vm.deleteWp = false;
      vm.workspacesMoved = false;
      vm.configurationChanged = false;
      vm.isAllOpen = false;
      vm.defaultUpdated = false;
      vm.initialLoad = false;
      vm.newWorkspace = false;
      vm.disableWhileEditing = false;
      ngDialog.closeAll();

      // Revision 1711

      vm.checkHeight = function () {
        /* istanbul ignore next */
        for (var i = 0; i < vm.workspaces.length; i++) {
          var heightClass = document.getElementById('myDashboard' + i).getElementsByClassName('panel-body');
          for (var j = 0; j < heightClass.length; j++) {
            var widgetHeight = angular.element(document.getElementById('myDashboard' + i).getElementsByClassName('widget')[j]).scope().definition.height;
            removeHeightClass(heightClass, j);
            switch (widgetHeight) {
              case 'widgetHeightSmall':
                angular.element(heightClass[j]).addClass('smallheight');
                break;
              case 'widgetHeightMedium':
                angular.element(heightClass[j]).addClass('mediumheight');
                break;
              case 'widgetHeightLarge':
                angular.element(heightClass[j]).addClass('largeheight');
                break;
              case 'widgetHeightXlarge':
                angular.element(heightClass[j]).addClass('xlargeheight');
                break;
              default:
                break;
            }
          }
        }
      };
      /* istanbul ignore next */
      function removeHeightClass(heightClass, jIndex) {
        angular.element(heightClass[jIndex]).removeClass('smallheight');
        angular.element(heightClass[jIndex]).removeClass('mediumheight');
        angular.element(heightClass[jIndex]).removeClass('largeheight');
        angular.element(heightClass[jIndex]).removeClass('xlargeheight');
      }

      /* istanbul ignore next: toaster error */
      vm.getConfiguration = function () {
        HttpFactory.getActions(CONSTANTS.URL.USER_WORKSPACE + CONSTANTS.URL.DEFAULTS)
          .then(function (successResponse) {
            $rootScope.maxNumberOfWorkspaces = successResponse.data.maximumNumberOfWorkspacesAllowed;
            $rootScope.maxNumberOfTitleLength = successResponse.data.maximumWorkspaceTitleLengthAllowed;
          }, function (failureResponse) {
            CommonHelperService.setToastr(failureResponse, "error");
          });
      };

      vm.getConfiguration();

      vm.maxWorkspaces = false;
      // highlight active tab
      /* istanbul ignore next */
      vm.selectTab = function () {
        for (var i = 0; i < vm.workspaces.length; i++) {
          vm.workspaces[i].active = "non-active";
          vm.workspaces[i].activeInd = null;
        }
        vm.workspaces[activeWorkspace.currentWorkspaceOrderNumber].active = "active";
        vm.workspaces[activeWorkspace.currentWorkspaceOrderNumber].activeInd = true;
        vm.workspaceOrderChanged = true;
        vm.tab = 'activeTab' + activeWorkspace.currentWorkspaceOrderNumber;
        vm.activeTabIndex = activeWorkspace.currentWorkspaceOrderNumber;
        //trigger mouse move event to make directive works on calculation width and height of widget
        var element = angular.element(document.getElementById("activeTab" + activeWorkspace.currentWorkspaceOrderNumber));

        $timeout(function () {
          element[0].onmousemove();
        }, 200);
      };

      /* istanbul ignore next */
      vm.sortableOptionsForTabs = {
        stop: function () {

          // this callback has the changed model
          vm.sortingLog = [];
          vm.workspaces.map(function (i) {
            vm.sortingLog.push(i);
          });
          vm.workspacesMoved = true;
          activeWorkspace.newWorkspaceOrderNumber = vm.sortingLog.indexOf(activeWorkspace);
          vm.current = activeWorkspace.newWorkspaceOrderNumber;
          vm.updateWorkspace(activeWorkspace);
        },
        cursorAt: {
          left: 5
        },
        containment: 'body',
        axis: 'x',
        scroll: true,
        scrollSpeed: 2,
        scrollSensitivity: 160
      };


      /**
       *  This will pop up a modal window asking for the user number.
       *  This is used to retrieve the correct workspace.
       *  It will be removed once RBAC is integrated
       */
      /* istanbul ignore next */
      vm.getUserInfo = function (userInfo) {

        // ngDialog.open({
        //   template: 'app/main/getUserModal.html',
        //   controller: 'GetUserInfoController',
        //   controllerAs: 'vm',
        //   width: '20%',
        //   showClose: false,
        //   closeByEscape: false,
        //   closeByDocument: false,
        //   resolve: {
        //     userInfo: function () {
        //       return vm.userInfo;
        //     }
        //   }
        // }).closePromise.then(function (workerNumber) {
        //   vm.userInfo = {
        //     userId: workerNumber.value,
        //     displayName: workerNumber.value
        //   };
        //   $rootScope.userInfo = {
        //     userId: workerNumber.value
        //   }
        //   $window.userInfo = {
        //     userId: workerNumber.value
        //   }
        //   vm.initialLoad = true;
        //   getUserWorkspaces(true);

        // }, function () {

        // });

        vm.getDefaults = function (loginId) {
          HttpFactory.getActions(CONSTANTS.URL.DEAFULTS + loginId)
            .then(function (successResponse) {
              vm.userInfo.appUserInfo = successResponse.data.caseDetailsData;
              if (!vm.userInfo.appUserInfo) {
                vm.userInfo.appUserInfo = successResponse.data;
              }
              $window.userInfo.appUserInfo = vm.userInfo.appUserInfo[0];
            }, function () {});
        }

        vm.getPrivlages = function (loginId) {
          HttpFactory.getActions(CONSTANTS.URL.PRIVILEGES + loginId)
            .then(function (successResponse) {
              $scope.adminArray = successResponse.data.selectedPrivilages;
            }, function () {});
        }
        vm.userInfo = {
          userId: userInfo.appUserInfo[0].loginId,
          displayName: userInfo.appUserInfo[0].fullName,
          assigneeNumber: userInfo.appUserInfo[0].userIdentiifier,
          roleDescription: userInfo.appUserInfo[0].roleDescription
        };
        $rootScope.userInfo = {
          userId: vm.userInfo.userId,
          roleDescription: vm.userInfo.roleDescription
        }
        $window.userInfo = {
          userId: vm.userInfo.userId
        }
        //$window.sessionStorage.setItem("workerNumber", userInfo.value);
        // $window.userInfo = {
        //   userId: userInfo.value
        // }
        vm.initialLoad = true;
        vm.getPrivlages(vm.userInfo.userId);
        vm.getDefaults(vm.userInfo.userId);
        getUserWorkspaces(true);




        // HttpFactory.callWhoAmI()
        //   .then(function (successResponse) {
        //     if (successResponse.data.userId === null || angular.isUndefined(successResponse.data.userId) || successResponse.data.userId === "") {
        //       ngDialog.open({
        //         template: 'app/main/getUserModal.html',
        //         controller: 'GetUserInfoController',
        //         controllerAs: 'vm',
        //         width: '20%',
        //         showClose: false,
        //         closeByEscape: false,
        //         closeByDocument: false,
        //         resolve: {
        //           userInfo: function () {
        //             return vm.userInfo;
        //           }
        //         }
        //       }).closePromise.then(function (workerNumber) {
        //         vm.userInfo = {
        //           userId: workerNumber.value,
        //           displayName: workerNumber.value
        //         };
        //         $rootScope.userInfo = {
        //           userId: workerNumber.value
        //         }
        //         $window.sessionStorage.setItem("workerNumber", workerNumber.value);
        //         $window.userInfo = {
        //           userId: workerNumber.value
        //         }
        //         vm.initialLoad = true;
        //         vm.getPrivlages(workerNumber.value);
        //         vm.getDefaults(workerNumber.value);
        //         getUserWorkspaces(true);
        //       }, function () {

        //       });
        //     } else
        //     if (successResponse.data.ptabReadOnlyUser || angular.isUndefined(successResponse.data.ptabReadOnlyUser)) {
        //       $location.url('caseViewer');
        //     } else {
        //       vm.userInfo = successResponse.data;
        //       $rootScope.userInfo = successResponse.data;
        //       $window.sessionStorage.setItem("workerNumber", vm.userInfo.userId);
        //       $window.userInfo = successResponse.data;
        //       vm.initialLoad = true;
        //       vm.getPrivlages(vm.userInfo.userId);
        //       vm.getDefaults(vm.userInfo.userId);
        //       getUserWorkspaces(true);
        //     }
        //   }, function () {});
      };

      vm.reloadScreen = function () {
        getUserWorkspaces(false);
      };
      /* istanbul ignore next */
      function updateWidgetIdentifierToDefinition(workspace, i) {
        var parentScope = document.getElementById('myDashboard' + i).getElementsByClassName('widget');
        for (var a = 0; a < parentScope.length; a++) {
          var widget = angular.element(parentScope[a]).scope();
          for (var j = 0; j < workspace.rows.length; j++) {
            for (var k = 0; k < workspace.rows[j].columns.length; k++) {
              updateWidgetDefinition(j, k, workspace, widget);
            }
          }
        }
      }

      /**
       * Update widget definition
       */
      /* istanbul ignore next */
      function updateWidgetDefinition(j, k, workspace, widget) {
        if (angular.isDefined(workspace.rows[j].columns[k].widgets)) {
          for (var l = 0; l < workspace.rows[j].columns[k].widgets.length; l++) {
            if (workspace.rows[j].columns[k].widgets[l].existingTitle === widget.definition.existingTitle) {
              workspace.rows[j].columns[k].widgets[l].wid = widget.definition.wid;
              widget.definition.widgetIdentifier = workspace.rows[j].columns[k].widgets[l].widgetIdentifier;
              widget.definition.widgetTypeIdentifier = workspace.rows[j].columns[k].widgets[l].widgetTypeIdentifier;
              widget.definition.config = workspace.rows[j].columns[k].widgets[l].config;
              widget.definition.position = workspace.rows[j].columns[k].widgets[l].position;
              widget.definition.color = workspace.rows[j].columns[k].widgets[l].color;
              widget.definition.height = workspace.rows[j].columns[k].widgets[l].height;
              widget.definition.zoneWidth = workspace.rows[j].columns[k].widgets[l].zoneWidth;
              widget.definition.dataUrlText = workspace.rows[j].columns[k].widgets[l].dataUrlText;
            }
          }
        }
      }

      /* istanbul ignore next */
      vm.updateWorkspaces = function () {
        HttpFactory.getActions(CONSTANTS.URL.USER_WORKSPACE_WITH_PARAM + "userIdentifier=" + vm.userInfo.userId)
          .then(function (successResponse) {
            for (var i = 0; i < successResponse.data.userWorkspaces.length; i++) {
              updateWorkspaceRows(successResponse.data.userWorkspaces[i], i);
            }
            for (i = 0; i < successResponse.data.userWorkspaces.length; i++) {
              updateWidgetIdentifierToDefinition(vm.workspaces[i], i);
            }
          }, function () {});
      };

      // vm.getUserInfo();

      /*checks height of widget content when height of widgets changes*/
      var small = document.getElementsByClassName('panel-body');
      /* istanbul ignore next */
      function smallHeight(widgetHeightPixelQuality, height, i) {
        if (widgetHeightPixelQuality === 'widgetHeightSmall' || height === 'widgetHeightSmall') {
          angular.element(small[i]).addClass('smallheight');
          angular.element(small[i]).removeClass('largeheight');
          angular.element(small[i]).removeClass('mediumheight');
          angular.element(small[i]).removeClass('xlargeheight');
        }
      }
      /* istanbul ignore next */
      function mediumHeight(widgetHeightPixelQuality, height, i) {
        if (widgetHeightPixelQuality === 'widgetHeightMedium' || height === 'widgetHeightMedium') {
          angular.element(small[i]).addClass('mediumheight');
          angular.element(small[i]).removeClass('largeheight');
          angular.element(small[i]).removeClass('xlargeheight');
          angular.element(small[i]).removeClass('smallheight');
        }
      }
      /* istanbul ignore next */
      function largeHeight(widgetHeightPixelQuality, height, i) {
        if (widgetHeightPixelQuality === 'widgetHeightLarge' || height === 'widgetHeightLarge') {
          angular.element(small[i]).addClass('largeheight');
          angular.element(small[i]).removeClass('xlargeheight');
          angular.element(small[i]).removeClass('smallheight');
          angular.element(small[i]).removeClass('mediumheight');
        }
      }
      /* istanbul ignore next */
      function xlargeHeight(widgetHeightPixelQuality, height, i) {
        if (widgetHeightPixelQuality === 'widgetHeightXlarge' || height === 'widgetHeightXlarge') {
          angular.element(small[i]).addClass('xlargeheight');
          angular.element(small[i]).removeClass('largeheight');
          angular.element(small[i]).removeClass('mediumheight');
          angular.element(small[i]).removeClass('smallheight');
        }
      }
      /* istanbul ignore next */
      vm.setWidgetContentHeight = function (definition) {
        if (angular.isDefined(definition)) {
          for (var i = 0; i < small.length; i++) {
            if (definition.userWorkspaceWidgetIdentifier === angular.element(small[i]).scope().definition.widgetIdentifier ||
              definition.wid === angular.element(small[i]).scope().definition.wid) {
              smallHeight(definition.widgetHeightPixelQuality, definition.height, i);
              mediumHeight(definition.widgetHeightPixelQuality, definition.height, i);
              largeHeight(definition.widgetHeightPixelQuality, definition.height, i);
              xlargeHeight(definition.widgetHeightPixelQuality, definition.height, i);
            }
          }
        }
      };


      /*This function is used to collapse all widgets in a given workspace*/
      /* istanbul ignore next */
      function widgetCollapse(parentScope, count) {

        for (var k = 0; k < parentScope.length; k++) {
          var widgetTwo = angular.element(parentScope[k]).scope();
          if (count === parentScope.length) {
            if (angular.isDefined(widgetTwo.definition.styleClass) && !angular.element(parentScope[k]).hasClass(widgetTwo.definition.styleClass)) {
              angular.element(parentScope[k]).addClass(widgetTwo.definition.styleClass);
            }
            widgetTwo.widgetState.isCollapsed = false;
          } else if (widgetTwo.widgetState.isCollapsed === false) {
            if (angular.isDefined(widgetTwo.definition.height) && angular.element(parentScope[k]).hasClass(widgetTwo.definition.height)) {
              angular.element(parentScope[k]).removeClass(widgetTwo.definition.height);
              angular.element(parentScope[k]).addClass(widgetTwo.definition.color);
            }
            widgetTwo.widgetState.isCollapsed = true;
          }
        }

      }
      /* istanbul ignore next */
      function countCalculate(workspaces, index) {

        if (vm.workspaces[index].active === "active") {
          var parentScope = document.getElementById('myDashboard' + index).getElementsByClassName('widget');
          var count = 0;
          for (var j = 0; j < parentScope.length; j++) {
            var widget = angular.element(parentScope[j]).scope();
            if (widget.widgetState.isCollapsed === true) {
              count++;
            }
          }

          widgetCollapse(parentScope, count);
        }

      }

      /* istanbul ignore next */
      vm.collapseAll = function () {
        var scope = angular.element(document.getElementById('mainTabId')).scope();
        if (angular.isDefined(vm.workspaces[scope.activeTab])) {
          vm.workspaces[scope.activeTab].active = "active";
        }
        vm.isAllOpen = !vm.isAllOpen;
        for (var i = 0; i < vm.workspaces.length; i++) {
          countCalculate(vm.workspaces, i);
        }
      };

      /**
       * This function will open the add widget modal
       */
      vm.open = function () {
        ngDialog.open({
          template: 'app/components/widgets/addWidgetModal.html',
          controller: 'AddWidgetController',
          controllerAs: 'vm',
          width: '60%',
          showClose: false,
          closeByDocument: false,
          closeByEscape: false,
          resolve: {
            selectedWidgetToCopy: function () {
              return undefined;
            }
          }
        });
      };

      vm.toggleEditMode = function () {
        $scope.$broadcast('adfToggleEditMode');
      };


      /**
       * This will open the add workspace modal from the worksapce actions dropdown
       */
      /* istanbul ignore next */
      vm.openAddWorkspaceModal = function () {
        if (vm.workspaces.length >= $rootScope.maxNumberOfWorkspaces || vm.invalidUser) {
          vm.disableAddWp = true;
          angular.element(document.getElementById('addNewWorkspaceMenu'))[0].tabIndex = -1;
          vm.disabled = 'disabled';
          return;
        }


        ngDialog.open({
          template: 'app/components/workspace/addWorkspaceModal.html',
          controller: 'AddWorkSpaceController',
          controllerAs: 'vm',
          width: '50%',
          showClose: false,
          closeByDocument: false,
          closeByEscape: false,
          resolve: {
            items: function () {
              return vm.workspaces;
            }
          }
        }).closePromise.then(function (selectedLayout) {
          // document.getElementById("single-button").focus();
          addNewWorkspace(selectedLayout.value);

          if (vm.workspaces.length === 1) {
            vm.workspaces[0].active = "active";
          }
        }, function () {
          document.getElementById("single-button").focus();
        });
      };

      /**
       * This will retrieve the user workspace based on the worker number
       */
      /* istanbul ignore next */
      function getUserWorkspaces(displayToast) {
        vm.invalidUser = false;
        HttpFactory.getUser(CONSTANTS.URL.USER_WORKSPACE_WITH_PARAM + "userIdentifier=" + vm.userInfo.userId, vm.userInfo.userId)
          .then(function (successResponse) {

            vm.workspaces = [];
            for (var i = 0; i < successResponse.data.userWorkspaces.length; i++) {
              createWorkspace(successResponse.data.userWorkspaces[i], i);
            }
            if (displayToast) {
              CommonHelperService.setToastr("Retrieved " + vm.workspaces.length + " workspace(s) for user " + vm.userInfo.userId, "success");
            }
            if (vm.workspaces.length === $rootScope.maxNumberOfWorkspaces) {
              vm.disableAddWp = true;
              angular.element(document.getElementById('addNewWorkspaceMenu'))[0].tabIndex = -1;
            } else {
              vm.disableAddWp = false;
              angular.element(document.getElementById('addNewWorkspaceMenu'))[0].tabIndex = 0;
            }
            vm.deleteWp = false;
            vm.workspacesMoved = false;
            vm.configurationChanged = false;
            vm.initialLoad = false;
            calculateWorkspaceTabsWidth();

            $timeout(vm.checkHeight, 200, true, vm.workspaces.length);
          }, function (failureResponse) {
            if (failureResponse.status === 400) {
              vm.invalidUser = true;
              $location.url('caseViewer');
            } else {
              vm.initialWorkspace = true;
              CommonHelperService.setToastr("No workspaces found for user " + vm.userInfo.userId + ". Please create a workspace.", "warning");
            }
          });
      }
      /* istanbul ignore next */
      function updateWorkspaceRows(currentWorkspace, i) {
        var rows;
        //Start adding workspace structures
        dashboard.structures[currentWorkspace.userWorkspaceIdentifier] = [];
        dashboard.structures[currentWorkspace.userWorkspaceIdentifier].rows = dashboard.structures[currentWorkspace.structure].rows;
        rows = getWorkspaceRows(angular.copy(dashboard.structures[currentWorkspace.structure]).rows, currentWorkspace.userWorkspaceWidgetsData);
        dashboard.structures[currentWorkspace.userWorkspaceIdentifier].rows = rows;
        dashboard.structure(currentWorkspace.userWorkspaceIdentifier, rows); //initialize workspace structure

        vm.workspaces[i].rows = rows;
      }
      /* istanbul ignore next */
      function createWorkspace(currentWorkspace, i) {
        var workspace = {};
        workspace.userWorkspaceName = currentWorkspace.userWorkspaceName;
        workspace.tooltip = workspace.userWorkspaceName.replace(/&nbsp;/g, " ");
        workspace.structure = currentWorkspace.structure;
        workspace.defaultIndicator = currentWorkspace.defaultIndicator;
        workspace.userWorkspaceIdentifier = currentWorkspace.userWorkspaceIdentifier;
        workspace.active = "non-active";

        // Sets default workspace as active during initial load
        if (vm.initialLoad && workspace.defaultIndicator) {
          vm.initialLoad = false;
          activeWorkspace = currentWorkspace;
          workspace.active = "active";
          vm.tab = 'activeTab' + currentWorkspace.currentWorkspaceOrderNumber;
          vm.activeTabIndex = currentWorkspace.currentWorkspaceOrderNumber;
        }

        // Sets newly added tab as active
        if (vm.newWorkspace && vm.newWorkspaceNumber === i) {
          vm.newWorkspace = false;
          workspace.active = "active";
          vm.tab = "activeTab" + vm.workspaces.length;
          vm.activeTabIndex = vm.workspaces.length;
        }

        // Checks if default workspace has been modified
        if (vm.defaultUpdated && workspace.defaultIndicator) {
          vm.defaultUpdated = false;
          workspace.defaultIndicator = true;
          workspace.active = "active";
          vm.tab = "activeTab" + vm.current;
          vm.activeTabIndex = vm.current;
        }
        if ((vm.workspacesMoved || vm.configurationChanged) && vm.current === i) {
          workspace.active = "active";
          vm.tab = 'activeTab' + vm.current;
          vm.activeTabIndex = vm.current;

          $scope.activeTab = currentWorkspace.currentWorkspaceOrderNumber;
        }
        workspace.currentWorkspaceOrderNumber = currentWorkspace.currentWorkspaceOrderNumber;
        workspace.text = 'Workspace ' + i;
        workspace.value = i;

        //Start adding workspace structures
        addWorkspaceStructures(currentWorkspace, workspace);

        //initialize workspace structure
        vm.workspaces.push(workspace);
      }

      /* istanbul ignore next */
      function addWorkspaceStructures(currentWorkspace, workspace) {
        dashboard.structures[currentWorkspace.userWorkspaceIdentifier] = [];
        dashboard.structures[currentWorkspace.userWorkspaceIdentifier].rows = dashboard.structures[currentWorkspace.structure].rows;
        if (angular.isDefined(currentWorkspace.userWorkspaceWidgetsData)) {
          workspace.rows = getWorkspaceRows(angular.copy(dashboard.structures[currentWorkspace.structure]).rows, currentWorkspace.userWorkspaceWidgetsData);
        } else if (angular.isDefined(currentWorkspace.rows)) {
          workspace.rows = currentWorkspace.rows;
        } else {
          workspace.rows = getWorkspaceRows(angular.copy(dashboard.structures[currentWorkspace.structure]).rows, currentWorkspace.userWorkspaceWidgetsData);
        }
        dashboard.structures[currentWorkspace.userWorkspaceIdentifier].rows = workspace.rows;
        dashboard.structure(currentWorkspace.userWorkspaceIdentifier, workspace.rows);
      }

      /**
       * Utility: Get rows for workspace and display widgets
       */
      /* istanbul ignore next */
      function getWorkspaceRows(rows, widgets) {
        var pos = [];
        var widget = {};
        angular.forEach(widgets, function (item) {
          pos = item.widgetPositionText.split("||");
          if (angular.isUndefined(rows[pos[0]].columns[pos[1]].widgets)) {
            rows[pos[0]].columns[pos[1]].widgets = [];
          }
          widget = {
            editTemplateUrl: "../src/components/widgets/edit-widget-custom-Modal.html",
            styleClass: item.widgetHeightPixelQuality + " " + item.widgetColor,
            title: item.widgetCustomName,
            existingTitle: item.widgetCustomName,
            tooltip: item.widgetCustomName.replace(/&nbsp;/g, ' '),
            titleTemplateUrl: "../src/templates/widget-title.html",
            type: item.widgetData.widgetName,
            widgetTypeIdentifier: item.widgetData.widgetIdentifier,
            widgetIdentifier: item.userWorkspaceWidgetIdentifier,
            color: item.widgetColor,
            position: item.widgetPositionText,
            height: item.widgetHeightPixelQuality,
            config: item.configText,
            zoneWidth: item.zoneWidth,
            dataUrlText: item.dataUrlText
          };

          rows[pos[0]].columns[pos[1]].widgets.push(widget);
        });
        return rows;
      }

      /**
       * This will create a new workspace
       *
       */
      /* istanbul ignore next */
      function addNewWorkspace(selectedLayout) {
        var workspace = {};
        workspace.userWorkspaceName = selectedLayout.userWorkspaceName;
        workspace.structure = selectedLayout.structure;
        workspace.defaultIndicator = vm.initialWorkspace;
        workspace.currentWorkspaceOrderNumber = vm.workspaces.length;
        workspace.auditData = {};
        workspace.auditData.lastModifiedUserIdentifier = vm.userInfo.userId;
        workspace.auditData.createUserIdentifier = vm.userInfo.userId;

        HttpFactory.postActions(CONSTANTS.URL.USER_WORKSPACE, workspace)
          .then(function (response) {
            CommonHelperService.setToastr("Successfully created '" + selectedLayout.userWorkspaceName + "'", "success");
            deactivateAllTabs();
            $scope.$broadcast('updateActiveTab', {
              value: response.data.currentWorkspaceOrderNumber
            });
            activeWorkspace = response.data;
            vm.newWorkspace = true;
            vm.newWorkspaceNumber = activeWorkspace.currentWorkspaceOrderNumber;
            getUserWorkspaces(false);
            vm.initialWorkspace = false;
          }, function (failureResponse) {
            if (failureResponse.data.message) {
              CommonHelperService.setToastr(failureResponse.data.message, "error");
            } else {
              CommonHelperService.setToastr(failureResponse.data, "error");
            }
          });
      }

      /**
       * This will pop up a confirmation modal to delete a workspace
       *
       * @param {*} index
       */
      /* istanbul ignore next */
      vm.deleteWorkspace = function () {

        ngDialog.open({
          template: 'app/components/workspace/deleteWorkspaceModal.html',
          controller: 'DeleteWorkSpaceController',
          controllerAs: 'vm',
          width: '50%',
          showClose: false,
          closeByEscape: false,
          resolve: {
            items: function () {
              return activeWorkspace;
            },
            work: function () {
              return vm.workspaces;
            }
          }
        }).closePromise.then(function (selectedLayout) {
          vm.current = selectedLayout.value.currentWorkspaceOrderNumber;
          vm.deleteWp = true;
          // checks if its the last workspace
          if (vm.current === vm.workspaces.length - 1) {
            vm.next = vm.current - 1;
          } else {
            vm.next = vm.current;
          }

          HttpFactory.deleteActions(CONSTANTS.URL.USER_WORKSPACE + activeWorkspace.userWorkspaceIdentifier)
            .then(function () {
              CommonHelperService.setToastr("Successfully deleted '" + selectedLayout.value.userWorkspaceName + "' workspace", "success");
              vm.disableAddWp = false;
              angular.element(document.getElementById('addNewWorkspaceMenu'))[0].tabIndex = 0;
              var defaultIndCheck = false;
              if (vm.workspaces[vm.current].defaultIndicator) {
                defaultIndCheck = true;
              }
              vm.workspaces.splice(vm.current, 1);

              for (var i = 0; i < vm.workspaces.length; i++) {
                vm.workspaces[i].currentWorkspaceOrderNumber = i;
                vm.workspaces[i].value = i;
                vm.workspaces[i].active = "non-active";
                angular.element(document.getElementById('activeTab' + i)).removeClass('active');
                angular.element(document.getElementById('activeTab' + i)).removeClass('non-active');
              }
              if (defaultIndCheck) {
                vm.workspaces[vm.next].defaultIndicator = true;
              }
              activeWorkspace = vm.workspaces[vm.next];

              angular.element(document.getElementById('activeTab' + vm.next)).removeClass('non-active');
              $scope.activeTab = vm.next;
              angular.element(document.getElementById('activeTab' + vm.next)).addClass('active');
              vm.workspaces[vm.next].active = "active";
              vm.tab = 'activeTab' + vm.next;
              vm.activeTabIndex = vm.next;

              calculateWorkspaceTabsWidth();
            }, function (failureResponse) {
              CommonHelperService.setToastr(failureResponse, "error");
            });
        }, function () {

        });
        // }

      };

      /**
       * This will pop up a confirmation modal to delete a workspace
       *
       * @param {*} index
       */
      /* istanbul ignore next */
      vm.openManageWorkspaceModal = function () {

        ngDialog.open({
          template: 'app/components/workspace/manageWorkspaceModal.html',
          controller: 'ManageWorkSpaceController',
          controllerAs: 'vm',
          width: '30%',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false,
          resolve: {
            items: function () {
              return vm.workspaces;
            },
            user: function () {
              return vm.userInfo.userId;
            }
          }
        }).closePromise.then(function (newLayout) {
          HttpFactory.putActions('/user-workspaces/order', newLayout.value)
            .then(function (successResponse) {
              vm.initialLoad = true;
              vm.workspaces = [];
              angular.forEach(successResponse.data.userWorkspaces, function (workspace) {
                createWorkspace(workspace);
              });
            }, function () {});

        }, function () {

        });

      };


      /**
       * This will pop up a modal that will allow the user to change the workspace title
       *
       * @param {*} index
       */
      /* istanbul ignore next */
      vm.configureWorkspace = function () {
        activeWorkspace.configurationChanged = true;
        vm.tempTitle = activeWorkspace.userWorkspaceName;
        vm.tempStructure = activeWorkspace.structure
        ngDialog.open({
          preCloseCallback: function (editedWorkspace) {
            if (angular.isUndefined(editedWorkspace)) {
              return true;
            }
            if (editedWorkspace.save === 'false') {
              vm.configureUpdate(editedWorkspace);
              return false;
            } else if (editedWorkspace.save === 'true') {
              vm.configureUpdate(editedWorkspace);
              return true;
            } else {
              return true;
            }
          },
          template: 'app/components/workspace/editTitleModal.html',
          controller: 'EditTitleController',
          controllerAs: 'vm',
          width: '70%',
          showClose: false,
          closeByDocument: false,
          closeByEscape: false,
          resolve: {
            title: function () {
              return activeWorkspace;
            },
            allWorkspaces: function () {
              return vm.workspaces;
            }
          }

        }).closePromise.then(function () {}, function () {

        });
      };

      /* istanbul ignore next */
      vm.configureUpdate = function (editedWorkspace) {
        var workspace = {};
        vm.configurationChanged = editedWorkspace.configurationChanged;

        delete editedWorkspace.configurationChanged;
        delete editedWorkspace.save;
        workspace.userWorkspaceName = editedWorkspace.userWorkspaceName;
        workspace.structure = editedWorkspace.structure;
        workspace.defaultIndicator = editedWorkspace.defaultIndicator;
        workspace.currentWorkspaceOrderNumber = editedWorkspace.currentWorkspaceOrderNumber;
        workspace.userWorkspaceIdentifier = editedWorkspace.userWorkspaceIdentifier;
        workspace.layoutChanged = editedWorkspace.layoutChanged;
        workspace.auditData = {};
        workspace.auditData.lastModifiedUserIdentifier = vm.userInfo.userId;
        workspace.auditData.createUserIdentifier = vm.userInfo.userId;

        vm.updateWorkspace(workspace);
      }

      vm.setActiveWorkspace = function (currentWorkspace) {
        activeWorkspace = currentWorkspace;
      };

      /* istanbul ignore next */
      vm.setCurrentWorkspaceAsDefault = function () {
        deactivateAllTabs(true);
        var index = activeWorkspace.currentWorkspaceOrderNumber;

        vm.workspaces[index].defaultIndicator = true;
        vm.workspaces[index].active = "active";

        vm.defaultUpdated = true;
        vm.updateWorkspace(vm.workspaces[index]);
      };

      vm.updateWorkspace = function (workspace) {
        var updateUrl = CONSTANTS.URL.USER_WORKSPACE;
        if (vm.configurationChanged || workspace.layoutChanged || vm.defaultUpdated) {
          vm.current = angular.copy(workspace.currentWorkspaceOrderNumber);
        }

        if (workspace.layoutChanged) {
          updateUrl = CONSTANTS.URL.USER_WORKSPACE + CONSTANTS.URL.LAYOUT_CHANGE;
          vm.configurationChanged = true;
        }
        if (vm.workspacesMoved) {
          vm.current = angular.copy(workspace.newWorkspaceOrderNumber);
        }
        delete workspace.text;
        delete workspace.value;
        delete workspace.selected;
        delete workspace.active;
        delete workspace.layoutChanged;


        workspace.auditData = {};
        workspace.auditData.lastModifiedUserIdentifier = vm.userInfo.userId;
        workspace.auditData.createUserIdentifier = vm.userInfo.userId;
        /* istanbul ignore next */
        HttpFactory.putActions(updateUrl, workspace)
          .then(function (response) {
            var tempWorkspaces = angular.copy(vm.workspaces);
            tempWorkspaces[response.data.userWorkspaces[0].currentWorkspaceOrderNumber] = response.data.userWorkspaces[0];
            vm.workspaces = [];
            for (var i = 0; i < tempWorkspaces.length; i++) {
              tempWorkspaces[i].currentWorkspaceOrderNumber = i;
              createWorkspace(tempWorkspaces[i], i);
            }
            activeWorkspace = vm.workspaces[response.data.userWorkspaces[0].currentWorkspaceOrderNumber];
            $scope.originalActiveWorkspace = angular.copy(activeWorkspace);
            vm.tempTitle = angular.copy(activeWorkspace.userWorkspaceName);
            vm.tempStructure = angular.copy(activeWorkspace.structure);
            CommonHelperService.setToastr("Successfully updated '" + workspace.userWorkspaceName + "'", "success");
            if (vm.workspacesMoved) {
              vm.workspacesMoved = false;
              $scope.$broadcast('updateActiveTab', {
                value: activeWorkspace.currentWorkspaceOrderNumber
              });
            } else {
              $scope.$broadcast('updateActiveTab', {
                value: activeWorkspace.currentWorkspaceOrderNumber,
                widgets: response.data.userWorkspaces[0].userWorkspaceWidgetsData
              });
            }
          }, function (failureResponse) {
            CommonHelperService.setToastr(failureResponse, "error");
          });
      }

      /* istanbul ignore next */
      vm.editWidgets = function () {
        vm.disableWhileEditing = true;
        var scope = angular.element(document.getElementById('mainTabId')).scope();
        if (angular.isDefined(vm.workspaces[scope.vm.activeTabIndex])) {
          vm.workspaces[scope.vm.activeTabIndex].active = "active";
        }
        for (var i = 0; i < vm.workspaces.length; i++) {
          if (angular.element(document.getElementById('activeTab' + i)).hasClass('non-active')) {
            angular.element(document.getElementById('activeTab' + i))[0].tabIndex = -1;
            angular.element(document.getElementById('addWorkspaceBtn'))[0].tabIndex = -1;
          }
          if (angular.element(document.getElementById('activeTab' + i)).hasClass('active')) {
            var dashboardScope = angular.element(document.getElementById('myDashboard' + i)).scope();
            var parentScope = document.getElementById('myDashboard' + i).getElementsByClassName('widget');
            for (var j = 0; j < parentScope.length; j++) {
              var editMode = angular.element(parentScope[j]).scope();
              editMode.$$childHead.editMode = true;
            }
            dashboardScope.editMode = true; //to show column border
            vm.workspaces[i].editMode = true;
            vm.inEditMode = true;
          }
        }
      };

      /* istanbul ignore next */
      vm.doneEditing = function () {
        vm.disableWhileEditing = false;
        for (var i = 0; i < vm.workspaces.length; i++) {
          angular.element(document.getElementById('activeTab' + i))[0].tabIndex = 17 + i;
          angular.element(document.getElementById('addWorkspaceBtn'))[0].tabIndex = 24;
          if (vm.workspaces[i].active === "active") {
            var dashboardScope = angular.element(document.getElementById('myDashboard' + i)).scope();
            var parentScope = document.getElementById('myDashboard' + i).getElementsByClassName('widget');
            for (var j = 0; j < parentScope.length; j++) {
              var editMode = angular.element(parentScope[j]).scope();
              editMode.$$childHead.editMode = false;
            }
            dashboardScope.editMode = false; //to hide column border
            vm.workspaces[i].editMode = false;
            vm.inEditMode = false;
          }
        }
      };

      /* istanbul ignore next */
      vm.getWidgetZone = function (widget) {
        for (var i = 0; i < vm.workspaces.length; i++) {
          var parentScope = document.getElementById('myDashboard' + i).getElementsByClassName('widget');
          for (var j = 0; j < parentScope.length; j++) {
            var zone = angular.element(parentScope[j]).scope();
            if (zone.definition.widgetIdentifier === widget.widgetIdentifier || zone.definition.widgetIdentifier === widget.userWorkspaceWidgetIdentifier) {
              return zone.definition.zoneWidth;
            }
          }
        }
        return 0;
      };
      /* istanbul ignore next */
      function deleteWidgetServiceCall(widget) {
        HttpFactory.deleteActions(CONSTANTS.URL.USER_WORKSPACE_WIDGET + widget.id)
          .then(function () {
            CommonHelperService.setToastr("Successfully deleted '" + widget.title + "'", "success");
            var doneEditing = document.getElementById("doneEditButton");
            doneEditing.focus();
            //update the workspace in case DELETED
            var scope = angular.element(document.getElementById('mainTabId')).scope();
            scope.vm.updateWorkspaces();
          }, function (failureResponse) {
            CommonHelperService.setToastr(failureResponse.data.message, "error");
            //reload the workspace in case DELETE failed
            var scope = angular.element(document.getElementById('mainTabId')).scope();
            scope.vm.reloadScreen();
          });
      }
      /**
       * Utility: This method is to set all widgets inside the "Edit Mode Workspace" to Edit Mode
       */
      /* istanbul ignore next */
      function setAllWidgetsToEditMode(index) {
        if (vm.workspaces[index].editMode) {
          var parentScope = document.getElementById('myDashboard' + index).getElementsByClassName('widget');
          for (var j = 0; j < parentScope.length; j++) {
            var editMode = angular.element(parentScope[j]).scope();
            editMode.$$childHead.editMode = true;
          }
        }
      }
      /* istanbul ignore next */
      function moveWidgetServiceCall(widget) {
        var data = {
          "userWorkspaceWidgetIdentifier": widget.userWorkspaceWidgetIdentifier,
          "userWorkspaceData": {
            "userWorkspaceIdentifier": widget.userWorkspaceIdentifier
          },
          "widgetData": {
            "widgetIdentifier": widget.typeIdentifier
          },
          "widgetPositionText": widget.widgetPositionText,
          "widgetCustomName": widget.title,
          "configText": widget.config,
          "widgetHeightPixelQuality": widget.height,
          "widgetColor": widget.color,
          "auditData": {
            "lastModifiedUserIdentifier": vm.userInfo.userId,
            "createUserIdentifier": vm.userInfo.userId
          }
        };


        HttpFactory.putActions(CONSTANTS.URL.USER_WORKSPACE_WIDGET, data)
          .then(function (response) {
            if (widget.customize === true) {
              CommonHelperService.setToastr("Successfully customized '" + widget.title + "'.", "success");
            } else {
              CommonHelperService.setToastr("Successfully arranged '" + widget.title + "'.", "success");
            }
            //update the workspace in case DELETED
            var scope = angular.element(document.getElementById('mainTabId')).scope();
            setAllWidgetsToEditMode(vm.activeTabIndex);
            scope.vm.updateWorkspaces();
            $rootScope.$broadcast('broadcastZoneWidth', {
              zoneWidth: response.data.zoneWidth,
              widgetIdentifier: response.data.userWorkspaceWidgetIdentifier
            });
            scope.vm.setWidgetContentHeight(response.data);
          }, function (failureResponse) {
            CommonHelperService.setToastr(failureResponse.data.message, "error");
            //reload the workspace in case DELETE failed
            var scope = angular.element(document.getElementById('mainTabId')).scope();
            scope.vm.reloadScreen();
          });
      }



      /**
       * This method is to listen to delete widget function
       */
      /* istanbul ignore next */
      $rootScope.$on('adfWidgetDeleteServiceCall', function (event, widget) {
        deleteWidgetServiceCall(widget);
      });

      /**
       * This method is to listen to move widget function
       */
      /* istanbul ignore next */
      $rootScope.$on('adfWidgetMoveServiceCall', function (event, widget) {
        moveWidgetServiceCall(widget);
      });

      /**
       * This function is to listen to customize widget function
       */
      /* istanbul ignore next */
      $rootScope.$on('adfCustomizeWidgetServiceCall', function (event, widget) {
        moveWidgetServiceCall(widget);
      });

      /* istanbul ignore next */
      function calculateWorkspaceTabsWidth() {
        vm.workspaceStyle = {
          "width": 63 / vm.workspaces.length + "vw"
        };
      }
      /**
       * This method is to reset active tab after adding workspace
       */
      /* istanbul ignore next */
      var updateActiveTabAfterAddWorkspace = function (activeTab) {
        $scope.activeTab = activeTab;
        vm.tab = 'activeTab' + activeTab;
        angular.element(document.getElementById('activeTab' + activeWorkspace.currentWorkspaceOrderNumber)).removeClass('active');
        angular.element(document.getElementById('activeTab' + activeTab)).addClass('active');
      };
      /* istanbul ignore next */
      $scope.$on('updateActiveTab', function (event, activeTab) {
        setTimeout(function () {
          updateActiveTabAfterAddWorkspace(activeTab.value);
          if (angular.isArray(activeTab.widgets)) {
            for (var i = 0; i < activeTab.widgets.length; i++) {
              vm.setWidgetContentHeight(activeTab.widgets[i]);
            }
          }
        }, 300);
      });
      /* istanbul ignore next */
      $scope.$on('settingWigetsToEditMode', function (event, tabIndex) {
        setTimeout(function () {
          setAllWidgetsToEditMode(tabIndex.value);
        }, 100);
      });
      /* istanbul ignore next */
      function expandCollapseWidget(definition) {
        var widgetDefinition = JSON.parse(definition);
        var parentScope = document.getElementById('myDashboard' + $scope.vm.activeTabIndex).getElementsByClassName('widget');
        for (var i = 0; i < parentScope.length; i++) {
          var widgetState = angular.element(parentScope[i]).scope().widgetState.isCollapsed;
          var attrValue = parentScope[i].attributes['adf-id'].value;
          var hasStyleClass = angular.element(parentScope[i]).hasClass(widgetDefinition.styleClass);
          var hasHeight = angular.element(parentScope[i]).hasClass(widgetDefinition.height)
          if (!widgetState && widgetDefinition.wid === attrValue && angular.isDefined(widgetDefinition.styleClass) && !hasStyleClass) {
            angular.element(parentScope[i]).addClass(widgetDefinition.styleClass);
          } else if (widgetState && widgetDefinition.wid === attrValue && angular.isDefined(widgetDefinition.height) && hasHeight) {
            angular.element(parentScope[i]).removeClass(widgetDefinition.height);
            angular.element(parentScope[i]).addClass(widgetDefinition.color);
          }
        }
      }
      /* istanbul ignore next */
      $scope.$on('adfExpandCollapseWidget', function (event, definition) {
        expandCollapseWidget(definition);
      });

      /* istanbul ignore next */
      vm.keyPressForTabs = function (event, index) {
        if (vm.disableWhileEditing) {
          return;
        }
        if (event.keyCode === 13) {
          vm.setActiveWorkspace(vm.workspaces[index]);
          deactivateAllTabs(false);
          vm.workspaces[index].active = "active";
          vm.tab = 'activeTab' + index;
          vm.activeTabIndex = index;
        }
        // Check for left arrow key press
        if (event.keyCode === 37) {
          deactivateAllTabs();
          if (index - 1 !== 0) {
            vm.workspaces[index - 1].active = "active";
            vm.tab = 'activeTab' + (index - 1);
          }
        }
      };
      /* istanbul ignore next */
      function deactivateAllTabs(homeIcon) {
        angular.forEach(vm.workspaces, function (workspace) {
          workspace.active = "non-active";
          if (homeIcon) {
            workspace.defaultIndicator = false;
          }
        });
      }

      /* istanbul ignore next */
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });

      /* istanbul ignore next */
      $scope.onKeydown = function ($event) {
        var KeyCodes = {
          BACKSPACE: 8,
          TABKEY: 9,
          RETURNKEY: 13,
          ESCAPE: 27,
          SPACEBAR: 32,
          LEFTARROW: 37,
          UPARROW: 38,
          RIGHTARROW: 39,
          DOWNARROW: 40
        };

        var myEvent = $event;
        var $target = $(myEvent.target);
        var nextTab;
        switch (myEvent.keyCode) {
          case KeyCodes.ESCAPE:
            $target.blur();
            break;
          case KeyCodes.UPARROW:
            nextTab = -1;
            break;
          case KeyCodes.RETURNKEY:
            $scope.status.isopen = false;
            $target.click();
            break;
          case KeyCodes.DOWNARROW:
            nextTab = 1;
            break;
          case 9:
            if (parseInt($target.attr("data-index"), CONSTANTS.GLOBAL.RADIX) === 7) {
              $scope.status.isopen = false;
            }
            break;
        }

        if (angular.isDefined(nextTab)) {
          $timeout(function () {
            $('[data-index=' + (parseInt($target.attr("data-index"), CONSTANTS.GLOBAL.RADIX) + nextTab) + ']').focus()
          }, 1);
        }
      };

    });
})(jQuery);
