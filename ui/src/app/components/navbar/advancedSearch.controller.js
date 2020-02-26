(function () {
  'use strict';

  angular
    .module('ptabe2e')
    .controller('AdvancedSearchController', function ($scope, uiGridConstants, CommonHelperService, HttpFactory, CONSTANTS, $window, ngDialog) {
      var vm = this;
      $scope.searchOption = "Case #";
      $scope.searchTerm = "CASE_NUMBER";
      $scope.searchThis = "";
      vm.showResults = false;
      vm.noNumberSelected = false;
      vm.optionCase = function () {
        $scope.searchTerm = "CASE_NUMBER";
        $scope.searchOption = "Case #";
        vm.showResults = false;
      };
      vm.optionTrials = function () {
        $scope.searchTerm = "TRIAL_NUMBER";
        $scope.searchOption = 'AIA Trials #';
        vm.showResults = false;
      };
      vm.optionApplication = function () {
        $scope.searchTerm = "APPLICATION_NUMBER";
        $scope.searchOption = "Application #";
        vm.showResults = false;
      };
      vm.optionPatent = function () {
        $scope.searchTerm = "PATENT_NUMBER";
        $scope.searchOption = "Patent #";
        vm.showResults = false;
      };



      vm.gridOptions = {
        enableColumnResizing: false,
        enableSelectAll: false,
        enableRowSelection: false,
        enableHorizontalScrollbar: 2,
        useExternalFiltering: false,
        enableGridMenu: false,
        exporterOlderExcelCompatibility: false,
        exporterMenuCsv: false,
        exporterMenuExcel: false,
        exporterMenuPdf: false,
        enableFiltering: false,
        enableSorting: false,
        // rowHeight: 10,
        columnDefs: [{
            displayName: 'Case #',
            cellTemplate: "<div  class='ui-grid-cell-contents' ><a  ng-click=\"grid.appScope.openCaseViewer(row)\" target=\"_blank\" title=\"Open case viewer\"><span class=\"acExaminerList\"> &nbsp {{row.entity.appealNumber}}<\/span><\/a><\/div>",
            field: 'appealNumber',
            headerTooltip: 'Case #',
            cellTooltip: true,
            width: '27%',
            type: 'number',
            allowCellFocus: false,
            enableColumnMenu: false
            // sort: {
            //   direction: 'asc',
            //   priority: 0
            // }
          },
          {
            displayName: 'Application #',
            field: 'serialNumber',
            type: 'number',
            cellTooltip: true,
            width: '27%',
            headerTooltip: 'Application #',
            allowCellFocus: false,
            enableColumnMenu: false
          },
          {
            displayName: 'Patent #',
            field: 'patentNumber',
            headerTooltip: 'Patent #',
            cellTooltip: true,
            width: '27%',
            allowCellFocus: false,
            enableColumnMenu: false
          },
          {
            // cellTemplate: "<div data-toggle=\"tooltip\" class=\"truncateTitle\" style=\"cursor: pointer; margin-left:2em; padding-top:5px;\"> <a style=\"margin-right:9px;\" title=\"Circulation manager\" ng-click=\"grid.appScope.openCirculationManager(row)\"> <i class=\"fas fa-binoculars\"><\/i>&nbsp;<\/a> <a title=\"Open case viewer\" ng-click=\"grid.appScope.openCaseViewer(row)\"> <i class=\"fas fa-tasks\"><\/i><\/a> <\/div>",
            cellTemplate: "<div data-toggle=\"tooltip\" class=\"truncateTitle\" style=\"cursor: pointer; margin-left:2em; padding-top:5px;\"> <a title=\"Open case viewer\" ng-click=\"grid.appScope.openCaseViewer(row)\"> <i class=\"fas fa-binoculars\"><\/i><\/a><a style=\"margin-left:10px;\" title=\"Circulation manager\" ng-click=\"grid.appScope.getCaseInfo(row)\"> <i class=\"fas fa-tasks\"><\/i><\/a><\/div>",

            displayName: 'Actions',
            field: 'actions',
            headerTooltip: 'Actions',
            cellTooltip: true,
            width: '19%',
            allowCellFocus: false,
            enableColumnMenu: false
          },
        ]
      };

      $scope.openCaseViewer = function (row) {
        $window.open("#/caseViewer/" + row.entity.serialNumber + "/" + row.entity.appealNumber);
      };



      $scope.getCaseInfo = function (row) {
        HttpFactory.getActions("/case-information/details?serialNumber=" + row.entity.serialNumber + "&appealNumber=" + row.entity.appealNumber)
          .then(function (successResponse) {
            // vm.ptabReadOnlyUser = successResponse.data.ptabReadOnlyUser;
            // vm.circulationReorderExists = successResponse.data.circulationReorderExists;
            vm.caseInfo = successResponse.data;
            vm.circulationViewable = vm.caseInfo.circulationViewable;
            $scope.openCirculationManager(row);
          }, function (failureResponse) {
            // intentional
          });
      };

      $scope.openCirculationManager = function (row) {
        var url = '/circulation/isCirculationAccessible?appealNumber=' + row.entity.serialNumber + '&serialNumber=' + row.entity.appealNumber + '&userId=' + $scope.userInfo.userId;
        HttpFactory.getActions(url)
          .then(function () {
            if (vm.circulationViewable) {
              $window.open("#/circulation/" + row.entity.serialNumber + "/" + row.entity.appealNumber);
            } else {
              ngDialog.open({
                template: 'app/components/navbar/noCirculation.modal.html',
                controller: 'NoCirculationController',
                controllerAs: 'vm',
                width: '25%',
                showClose: false,
                closeByEscape: false,
                closeByDocument: false,
                resolve: {
                  rowToDelete: function () {
                    return null;
                  },
                  flag: function () {
                    return 'noCirculation';
                  }
                }
              });
            }
          }, function (failureResponse) {
            console.log(failureResponse);
          });
      };



      vm.advancedSearch = function () {
        vm.gridOptions.data = [];


        if ($scope.searchThis === "") {
          vm.gridOptions.data = [];
          vm.showResults = false;
          vm.noNumberSelected = true;
        } else {
          HttpFactory.getActions("/case-information/caseNumber-search?searchType=" + $scope.searchTerm + "&caseNumber=" + $scope.searchThis)
            .then(function (successResponse) {
              vm.gridOptions.data = successResponse.data.searchNumbers;
              $scope.searchTotalLength = vm.gridOptions.data.length;
              if ($scope.searchThis === "") {
                vm.gridOptions.data = [];
                vm.showResults = false;
                vm.noNumberSelected = true;
              } else {
                vm.showResults = true;
              }
            }, function () {});
          vm.showResults = true;
        }




      };



      vm.numberLook = function () {
        vm.showResults = false;
        vm.noNumberSelected = false;
      }

      /* istanbul ignore next: toaster error*/
      //   $scope.openupdateAssignmentModal = function (row) {
      //     if (angular.isDefined(row)) {
      //       $scope.mySelectedRows = [];
      //       $scope.mySelectedRows.push(row.entity);
      //     } else {
      //       $scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
      //     }
      //     if ($scope.mySelectedRows.length === 0) {
      //       toastr.clear();
      //       toastr.error("Please select at least one row.", {
      //         iconClass: 'toast-danger'
      //       });
      //     } 
      // else 
      // {
      // vm.getAssignmentById($scope.mySelectedRows[0].assignmentIdentifier).then(function () {
      //   if (($scope.itemsSelected[0].assigneeRoleCode.toLowerCase() === 'ptabe2e_judge' && $scope.circulationJudgeAssignments.includes($scope.itemsSelected[0].assignmentType)) || $scope.circulationAssignments.includes($scope.itemsSelected[0].assignmentType)) {
      //     window.open("#/circulation/" + row.entity.FK_AD_FK_AA_SERIAL_NO + "/" + row.entity.FK_AD_FK_APPEAL_NO);
      //   } else {
      //     $scope.itemsSelected[0].priorityIndicator = $scope.itemsSelected[0].priorityIndicator === 'Y' ? true : false;
      //     ngDialog.open({
      //       template: "app/components/widgets/assignments/src/updateAssignmentModal.html",
      //       controller: 'updateAssignmentManagementController',
      //       scope: $scope,
      //       width: '62%',
      //       showClose: false,
      //       closeByEscape: false,
      //       closeByDocument: false,
      //       resolve: {
      //         items: function () {
      //           return $scope.itemsSelected;
      //         },
      //         readOnly: function () {
      //           return false;
      //         }
      //       }
      //     }).closePromise.then(function (refreshGrid) {
      //       if (refreshGrid.value) {
      //         $scope.refreshGrid();
      //         $scope.$$childTail.$$prevSibling.searchText = undefined;
      //       } else {
      //         startAutoRefresh();
      //       }

      //       delete $rootScope.sharedItems;
      //     }, function () {
      // intentional
      //     });
      //   }
      // });
      // }
      //   };

    });
})();
