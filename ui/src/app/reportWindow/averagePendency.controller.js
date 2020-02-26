(function () {
  "use strict";

  angular.module('ptabe2e')
    .controller('AveragePendencyController', function ($scope, $window, uiGridConstants, $log, ngDialog, SearchHelperService, HttpFactory, CONSTANTS) {

      $window.document.title = "Pending cases that are assigned to APJ with average pendency";

      $scope.sortPendencyNumber = function (number1, number2) {
        var resultNumberPendency;
        number1 = number1 === null ? '-1' : number1;
        number2 = number2 === null ? '-1' : number2;
        number1 = parseInt(number1, CONSTANTS.GLOBAL.RADIX);
        number2 = parseInt(number2, CONSTANTS.GLOBAL.RADIX);
        if (number1 === number2) {
          resultNumberPendency = 0;
        } else if (number1 < number2) {
          resultNumberPendency = -1;
        } else if (number1 > number2) {
          resultNumberPendency = 1;
        }

        return resultNumberPendency;
      };

      $scope.sortPendencyString = function (firstString, secondString) {
        var resultStringPendency;
        firstString = firstString == null ? ' ' : firstString;
        secondString = secondString == null ? ' ' : secondString;
        firstString = firstString.toLowerCase();
        secondString = secondString.toLowerCase();
        if (firstString === secondString) {
          resultStringPendency = 0;
        } else if (firstString < secondString) {
          resultStringPendency = -1;
        } else if (firstString > secondString) {
          resultStringPendency = 1;
        }

        return resultStringPendency;
      };

      $scope.pendencyGridOptions = {
        enableGridMenu: true,
        enableSelectAll: true,
        useExternalFiltering: true,
        exporterExcelFilename: 'averagePendency.xlsx',
        exporterMenuExcel: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        gridMenuShowHideColumns: false,
        paginationPageSizes: [10, 25, 50, 100],
        paginationPageSize: 10,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
        onRegisterApi: function (gridApi) {

          $scope.gridApi = gridApi;
          /* istanbul ignore next: filterChanged */
          $scope.gridApi.core.on.filterChanged($scope, function () {
            var grid = this.grid;
            $scope.numberOfFilters = SearchHelperService.getNumberOfFilters(grid.columns);
            if ($scope.numberOfFilters === 0) {
              $scope.pendencyGridOptions.data = $scope.myData.caseDetailsData;

            } else {
              var pendencyFilteredData = SearchHelperService.filterGrid(grid, $scope.myData);
              $scope.pendencyGridOptions.data = pendencyFilteredData;

            }
          });
        }
      };


      $scope.isLoading = true;
      $scope.showFilters = false;

      HttpFactory.getActions(CONSTANTS.URL.AVERAGEPENDENCY)
        .then(function (successResponse) {

          $scope.myData = successResponse.data;

          var pendencyColDefs = [];
          for (var i = 0; i < $scope.myData.columnDetails.length; i++) {
            var pendencyCol = {};

            pendencyCol.enableHiding = false;
            pendencyCol.displayName = $scope.myData.columnDetails[i].label;
            pendencyCol.headerTooltip = $scope.myData.columnDetails[i].label;
            pendencyCol.field = $scope.myData.columnDetails[i].name;
            pendencyCol.showItems = $scope.myData.columnDetails[i].selected;
            pendencyCol.width = "33%";
            if (pendencyCol.showItems === true) {
              pendencyCol.visible = true;
            } else {
              pendencyCol.visible = false;
            }
            if (pendencyCol.field === "judgeFullName") {
              pendencyCol.sort = {
                direction: uiGridConstants.ASC
              };
              pendencyCol.cellTemplate =

                '<div style="cursor: pointer; margin-left: 8px; padding-top:5px">' +
                '<a ng-click="grid.appScope.openPendencyReport(row.entity.userId, row.entity.judgeFullName)" target="_blank" class="reportListName" id="{{COL_FIELD}}" >' +
                "{{COL_FIELD}}" + '</a>' +
                '</div>';
            }

            if ($scope.myData.columnDetails[i].typeDefinition === "String") {
              pendencyCol.sortCellFiltered = true;
              pendencyCol.sortingAlgorithm = $scope.sortPendencyString;
            }

            if ($scope.myData.columnDetails[i].typeDefinition === "Number") {
              pendencyCol.type = 'number';
              pendencyCol.sortCellFiltered = true;
              pendencyCol.sortingAlgorithm = $scope.sortPendencyNumber;
            }

            if (pendencyCol.field !== "userId" && pendencyCol.field !== "proceedingId") {
              pendencyColDefs.push(pendencyCol);
            }
          }

          $scope.pendencyGridOptions.columnDefs = pendencyColDefs;
          $scope.pendencyGridOptions.data = $scope.myData.caseDetailsData;
          $scope.isLoading = false;

        }, function (failureResponse) {
          $log.info(failureResponse);
          $scope.isLoading = false;
        });

      $scope.openPendencyReport = function (userId, judgeFullName) {
        $window.open("#/viewReport/" + userId + "/judgeName=" + judgeFullName);
      };

      $scope.toggleFilteringPendency = function () {
        $scope.showFilters = !$scope.showFilters;
        $scope.pendencyGridOptions.enableFiltering = !$scope.pendencyGridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        if (!$scope.showFilters) {
          $scope.gridApi.grid.clearAllFilters();
          $scope.pendencyGridOptions.data = $scope.myData.caseDetailsData;
          $scope.numberOfFilters = 0;

        }
      };

      $scope.showFilteringPendency = function () {
        ngDialog.open({
          template: 'app/components/helperComponents/filterHelp/filteringHelp.html',
          controller: 'CommonDialogController',
          controllerAs: 'vm',
          showClose: false
        }).then(function () {}, function () {});
      };

    });
})();
