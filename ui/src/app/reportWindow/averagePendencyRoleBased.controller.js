(function () {
  "use strict";

  angular.module('ptabe2e')
    .controller('averagePendencyRoleBasedController', function ($route, $log, $scope, uiGridConstants, ngDialog, $filter, SearchHelperService, HttpFactory, CONSTANTS) {

      var vm = this;
      window.document.title = "Judge Report - APJ";

      vm.userId = $route.current.params.userId;
      $scope.judgesAssigned = ($route.current.params.judgesAssigned).replace(/,/g, " ");

      $scope.sortNumbersForRoles = function (firstNumber, secondNumber) {
        var resultNumber;
        firstNumber = firstNumber === null ? '-1' : firstNumber;
        secondNumber = secondNumber === null ? '-1' : secondNumber;
        firstNumber = parseInt(firstNumber, CONSTANTS.GLOBAL.RADIX);
        secondNumber = parseInt(secondNumber, CONSTANTS.GLOBAL.RADIX);
        if (firstNumber === secondNumber) {
          resultNumber = 0;
        }
        if (firstNumber < secondNumber) {
          resultNumber = -1;
        }
        if (firstNumber > secondNumber) {
          resultNumber = 1;
        }

        return resultNumber;
      };

      $scope.sortDatesForRoles = function (firstDate, secondDate) {
        var resultDate;
        firstDate = firstDate === null ? new Date('12/31/1899') : new Date(firstDate);
        secondDate = secondDate === null ? new Date('12/31/1899') : new Date(secondDate);
        /* istanbul ignore if */
        if (firstDate === secondDate) {
          resultDate = 0;
        }
        if (firstDate < secondDate) {
          resultDate = -1;
        }
        if (firstDate > secondDate) {
          resultDate = 1;
        }

        return resultDate;
      };

      function testPendencyRoles(apjPart1, apjPart2, apjLen, isDigitPartApj) {
        var result;
        for (var i = 0; i < apjLen; i++) {
          var aPartApj = apjPart1[i];
          var bPartApj = apjPart2[i];

          if (isDigitPartApj) {
            aPartApj = parseInt(aPartApj, 10);
            bPartApj = parseInt(bPartApj, 10);
          }

          if (aPartApj !== bPartApj) {
            result = aPartApj < bPartApj ? -1 : 1;
            break;
          }
          isDigitPartApj = !isDigitPartApj;
        }
        return result;
      }

      $scope.cmpStringsWithNumbersRoles = function (stringNumber1, stringNumber2) {

        var rePartsApj = /\d+|\D+/g;
        var reDigitApj = /\d/;

        stringNumber1 = stringNumber1 == null ? ' ' : stringNumber1;
        stringNumber2 = stringNumber2 == null ? ' ' : stringNumber2;

        stringNumber1 = stringNumber1.toUpperCase();
        stringNumber2 = stringNumber2.toUpperCase();

        var apjPart1 = stringNumber1.match(rePartsApj);
        var apjPart2 = stringNumber2.match(rePartsApj);

        var isDigitPartApj;

        if (apjPart1 && apjPart2 &&
          (isDigitPartApj = reDigitApj.test(apjPart1[0])) == reDigitApj.test(apjPart2[0])) {

          var apjLen = Math.min(apjPart1.length, apjPart2.length);

          return testPendencyRoles(apjPart1, apjPart2, apjLen, isDigitPartApj);
        }
        /* istanbul ignore next */
        return (stringNumber1 >= stringNumber2) - (stringNumber1 <= stringNumber2);
      };

      $scope.apjGridOptions = {
        enableGridMenu: true,
        enableSelectAll: true,
        useExternalFiltering: true,
        exporterExcelFilename: 'AveragePendencyView.xlsx',
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
              $scope.apjGridOptions.data = $scope.myData.caseDetailsData;

            } else {
              var apjFilteredData = SearchHelperService.filterGrid(grid, $scope.myData);
              $scope.apjGridOptions.data = apjFilteredData;

            }
          });
        }

      };

      $scope.isLoading = true;
      $scope.showFilters = false;

      HttpFactory.getActions(CONSTANTS.URL.ASSIGNEDAPJ + vm.userId)
        .then(function (successResponse) {

          $scope.myData = successResponse.data;

          var apjColDefs = [];
          for (var i = 0; i < $scope.myData.columnDetails.length; i++) {
            var apjRoleCol = {};

            apjRoleCol.enableHiding = false;
            if ($scope.myData.columnDetails[i].typeDefinition === "Date") {
              apjRoleCol.type = 'date';
              apjRoleCol.cellFilter = 'date:"MM/dd/yyyy"';
              apjRoleCol.sortCellFiltered = true;
              apjRoleCol.sortingAlgorithm = $scope.sortDatesForRoles;
            } else {
              apjRoleCol.type = 'string';
            }
            apjRoleCol.displayName = $scope.myData.columnDetails[i].label;
            apjRoleCol.headerTooltip = $scope.myData.columnDetails[i].label;
            apjRoleCol.field = $scope.myData.columnDetails[i].name;
            apjRoleCol.showItems = $scope.myData.columnDetails[i].selected;
            apjRoleCol.width = "15%";

            if (apjRoleCol.showItems === true) {
              apjRoleCol.visible = true;
            } else {
              apjRoleCol.visible = false;
            }

            if (apjRoleCol.field === "proceedingNumber") {
              apjRoleCol.sort = {
                direction: uiGridConstants.ASC
              };
            }

            if ($scope.myData.columnDetails[i].typeDefinition === "String") {
              apjRoleCol.sortCellFiltered = true;
              apjRoleCol.sortingAlgorithm = $scope.cmpStringsWithNumbersRoles;

            }
            if ($scope.myData.columnDetails[i].typeDefinition === "Number") {
              apjRoleCol.type = 'number';
              apjRoleCol.sortCellFiltered = true;
              apjRoleCol.sortingAlgorithm = $scope.sortNumbersForRoles;
            }

            apjColDefs.push(apjRoleCol);
          }

          $scope.apjGridOptions.columnDefs = apjColDefs;
          $scope.apjGridOptions.data = dataProcessPendency($scope.myData.caseDetailsData, $scope.myData.columnDetails);
          $scope.isLoading = false;

        }, function (failureResponse) {
          $log.info(failureResponse);
          $scope.isLoading = false;
        });

      function dataProcessPendency(apjData, apjColumns) {
        apjData.forEach(function (row) {
          apjColumns.forEach(function (apjColumn) {

            if (apjColumn.typeDefinition === 'Date') {
              row[apjColumn.name] = row[apjColumn.name] ? $filter('date')(new Date(row[apjColumn.name]), 'MM/dd/yyyy') : null;
            }
          });

        });
        return apjData;
      }

      $scope.toggleFilteringRoles = function () {
        $scope.showFilters = !$scope.showFilters;
        $scope.apjGridOptions.enableFiltering = !$scope.apjGridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        if (!$scope.showFilters) {
          $scope.gridApi.grid.clearAllFilters();
          $scope.apjGridOptions.data = $scope.myData.caseDetailsData;
          $scope.numberOfFilters = 0;
        }
      };

      $scope.showFilteringRoles = function () {
        ngDialog.open({
          template: 'app/components/helperComponents/filterHelp/filteringHelp.html',
          controller: 'CommonDialogController',
          controllerAs: 'vm',
          showClose: false
        }).then(function () {}, function () {});
      };

    });
})();
