(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('NotificationsModalController', function ($scope, toastr, $timeout, userInfo, HttpFactory, i18nService, uiGridConstants, $window, SearchHelperService, $filter) {
      var vm = this;
      i18nService.get('en').gridMenu.exporterAllAsCsv = 'Export full list as csv';
      i18nService.get('en').gridMenu.exporterVisibleAsCsv = 'Export filtered data as csv';

      var isFilterChanged = false;
      vm.userInfo = userInfo;
      vm.pauseTimer = false;
      $scope.isLoading = true;
      $scope.gridOptions = {
        enableFiltering: true,
        enableRowSelection: true,
        enableSelectAll: true,
        enableGridMenu: true,
        enableSorting: true,
        exporterCsvFilename: 'Notifications.csv',
        exporterOlderExcelCompatibility: true,
        exporterFieldCallback: function (grid, row, col, value) {
          if (col.colDef.type === 'date') {
            if (col.field === 'sentTimestamp') {
              value = $filter('date')(value, 'MM/dd/yyyy hh:mm:ss a');
            } else {
              value = $filter('date')(value, 'MM/dd/yyyy');
            }
            if (angular.isUndefined(value) || value === null) {
              value = "";
            } else {
              value = " " + value;
            }
          }


          return value;
        },
        exporterMenuCsv: true,
        exporterMenuExcel: false,
        exporterMenuPdf: false,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
        gridMenuShowHideColumns: true,
        treeRowHeaderAlwaysVisible: false,
        useExternalFiltering: true,
        gridMenuCustomItems: [{
          title: 'Show hidden filters',
          action: function () {
            showHiddenFilteredColumns();
          },
          order: 190
        }]
      };
      $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApiNoti = gridApi;
        $scope.gridApiNoti.selection.setMultiSelect(true);
        $scope.gridApiNoti.selection.on.rowSelectionChanged($scope, function (row) {
          $scope.getSelectedRows = $scope.gridApiNoti.selection.getSelectedRows();
        });
        $scope.gridApiNoti.selection.on.rowSelectionChangedBatch($scope, function () {
          $scope.getSelectedRows = $scope.gridApiNoti.selection.getSelectedRows();
        });
        $scope.gridApiNoti.core.on.filterChanged($scope, function () {
          isFilterChanged = true;
          var grid = this.grid;
          $scope.numberOfFilters = SearchHelperService.getNumberOfFilters(grid.columns);
          if ($scope.numberOfFilters === 0) {
            $scope.gridOptions.data = $scope.myData;
          } else {
            var filteredData = SearchHelperService.filterGrid(grid, $scope.myData);
            $scope.gridOptions.data = filteredData;
          }
        });

      };

      /* istanbul ignore next  */
      function showHiddenFilteredColumns() {
        var hiddenFilteredColumns = SearchHelperService.hasHiddenColumnFilters($scope.gridApiNoti.grid.columns);

        angular.forEach(hiddenFilteredColumns, function (column) {
          column.showColumn();
          $scope.preferencesChanged = true;
        });
        $scope.gridApiNoti.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      }

      $scope.getNotifications = function () {

        $scope.lastRefresh = new Date();

        HttpFactory.getActions("/alerts?recipientUserId=" + $window.sessionStorage.getItem("workerNumber"))
          .then(function (successResponse) {
              console.log("Constant", uiGridConstants.DESC);
              $scope.alertList = [];
              $scope.countOfNewAlerts = 0;
              $scope.countOfAllAlerts = 0;
              $scope.gridOptions.columnDefs = successResponse.data.alertsColumns;
              angular.forEach($scope.gridOptions.columnDefs, function (column) {
                if (column.field === "sentTimestamp") {
                  column.sort = {
                    direction: uiGridConstants.DESC,
                    priority: 0
                  };
                }
              });



              $scope.countOfNewAlerts = successResponse.data.alertsWithCount.countOfNewAlerts;
              $scope.countOfAllAlerts = successResponse.data.alertsWithCount.countOfAllAlerts;
              getAlertArray(successResponse.data.alertsWithCount.allAlertsBag);
              $scope.gridOptions.data = successResponse.data.alertsWithCount.allAlertsBag;
              $scope.myData = successResponse.data.alertsWithCount.allAlertsBag;
              if (!vm.pauseTimer) {
                $timeout(function () {
                  $scope.getNotifications();
                }, 30000);
              }
              $scope.isLoading = false;
            },
            function (failureResponse) {
              console.log("Constant", uiGridConstants.DESC);
              toastr.error(failureResponse.data.message, {
                iconClass: 'toast-danger'
              });
              if (!vm.pauseTimer) {
                $timeout(function () {
                  $scope.getNotifications();
                }, 30000);
              }
              $scope.isLoading = false;
            });
      };

      $scope.closeNotification = function () {
        vm.pauseTimer = true;
      };

      function getAlertArray(addedAlerts, makeUnread) {
        angular.forEach(addedAlerts, function (alert) {
          if (makeUnread) {
            var read = false;
          }
          $scope.alertList.push(alert);
        });
      }

      $scope.getNotifications();

      $scope.oldRow = function (row) {
        var oldList = [];
        var oldSelected = {
          "alertIdentifier": row.entity.alertIdentifier,
          "audit": {
            "lastModifiedUserIdentifier": vm.userInfo.userId
          },
          "read": true,
          "alertRecipientId": row.entity.alertRecipientId
        };
        oldList.push(oldSelected);
        HttpFactory.putActions("/alerts", oldList)
          .then(function (successResponse) {
            $scope.getNotifications();
          }, function (failureResponse) {
            // intentional
          });
      };


      $scope.openCaseViewer = function (row) {
        row.entity.read = true;
        $window.open("#/caseViewer/" + row.entity.serialNumber + "/" + row.entity.appealNumber);
        $scope.oldRow(row);
      };


      $scope.deleteRows = function (row) {
        var selectedRows = [];
        if (row) {
          selectedRows.push(row.entity);
        } else {
          selectedRows = $scope.getSelectedRows;
        }

        var deleteList = [];
        selectedRows.forEach(function (element) {
          if (vm.userInfo.userId === undefined) {
            vm.userInfo.userId = vm.userInfo.appUserInfo[0].loginId;
          }
          var deleteSelected = {
            "alertIdentifier": element.alertIdentifier,
            "audit": {
              "lastModifiedUserIdentifier": vm.userInfo.userId
            },
            "clearIndicator": true,
            "alertRecipientId": element.alertRecipientId
          };
          deleteList.push(deleteSelected);
        });
        HttpFactory.putActions("/alerts", deleteList)
          .then(function (successResponse) {
            toastr.success('Selected notifcation(s) deleted', {
              iconClass: 'toast-success',
              timeOut: 2000
            });

            $scope.getNotifications();
            $scope.getSelectedRows.length = "0";
          }, function (failureResponse) {
            toastr.error('Selected notifcation(s) was/were not deleted', {
              iconClass: 'toast-danger',
            });
          });
      };


      $scope.importantRows = function () {
        var importantList = [];
        $scope.getSelectedRows.forEach(function (element) {
          if (vm.userInfo.userId === undefined) {
            vm.userInfo.userId = vm.userInfo.appUserInfo[0].loginId;
          }
          var keepUnread = {
            "alertIdentifier": element.alertIdentifier,
            "audit": {
              "lastModifiedUserIdentifier": vm.userInfo.userId
            },
            "alertPriorityCategory": "High",
            "alertRecipientId": element.alertRecipientId
          };
          importantList.push(keepUnread);
        });

        HttpFactory.putActions("/alerts", importantList)
          .then(function (successResponse) {
            toastr.success('Selected row(s) marked important', {
              iconClass: 'toast-success',
              timeOut: 2000
            });
            $scope.getSelectedRows.length = "0";
            $scope.getNotifications();

          }, function (failureResponse) {
            toastr.error('Selected row(s) could not be marked important', {
              iconClass: 'toast-danger',
              timeOut: 2000
            });
          });
      };

      $scope.allAlertStatus = function () {
        var allAlertList = [];
        $scope.gridOptions.data.forEach(function (element) {
          if (element.read === false) {
            if (vm.userInfo.userId === undefined) {
              vm.userInfo.userId = vm.userInfo.appUserInfo[0].loginId;
            }
            var allAlert = {
              "alertIdentifier": element.alertIdentifier,
              "audit": {
                "lastModifiedUserIdentifier": vm.userInfo.userId
              },
              "read": true,
              "alertRecipientId": element.alertRecipientId
            };
            allAlertList.push(allAlert);
          }
        });
        HttpFactory.putActions("/alerts", allAlertList)
          .then(function (successResponse) {
            //intentional
          }, function (failureResponse) {
            //intentional
          });
      };
    });
})();
