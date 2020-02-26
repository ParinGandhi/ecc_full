(function () {
  "use strict";

  angular.module('ptabe2e')
    .controller('WaivedPreliminaryResponseController', function ($scope, $log, $filter, ngDialog, uiGridConstants, SearchHelperService, HttpFactory, CONSTANTS) {

      window.document.title = "Submitted cases with waived preliminary response";

      $scope.sortNumberWaived = function (waivedNumber1, waivedNumber2) {
        var resultNumberWaived;
        waivedNumber1 = waivedNumber1 === null ? '-1' : waivedNumber1;
        waivedNumber2 = waivedNumber2 === null ? '-1' : waivedNumber2;
        waivedNumber1 = parseInt(waivedNumber1, CONSTANTS.GLOBAL.RADIX);
        waivedNumber2 = parseInt(waivedNumber2, CONSTANTS.GLOBAL.RADIX);
        if (waivedNumber1 === waivedNumber2) {
          resultNumberWaived = 0;
        }
        if (waivedNumber1 < waivedNumber2) {
          resultNumberWaived = -1;
        }
        if (waivedNumber1 > waivedNumber2) {
          resultNumberWaived = 1;
        }

        return resultNumberWaived;
      };

      $scope.sortDateWaived = function (waivedDate1, waivedDate2) {
        var resultDateWaived;
        waivedDate1 = waivedDate1 === null ? new Date('12/31/1899') : new Date(waivedDate1);
        waivedDate2 = waivedDate2 === null ? new Date('12/31/1899') : new Date(waivedDate2);
        /* istanbul ignore if */
        if (waivedDate1 === waivedDate2) {
          resultDateWaived = 0;
        }
        if (waivedDate1 < waivedDate2) {
          resultDateWaived = -1;
        }
        if (waivedDate1 > waivedDate2) {
          resultDateWaived = 1;
        }

        return resultDateWaived;
      };

      function testWaived(waivedPart1, waivedPart2, waivedLen, isDigitPartWaived) {
        var result3;
        for (var i = 0; i < waivedLen; i++) {
          var aWaived = waivedPart1[i];
          var bWaived = waivedPart2[i];

          if (isDigitPartWaived) {
            aWaived = parseInt(aWaived, 10);
            bWaived = parseInt(bWaived, 10);
          }

          if (aWaived !== bWaived) {
            result3 = aWaived < bWaived ? -1 : 1;
            break;
          }
          isDigitPartWaived = !isDigitPartWaived;
        }
        return result3;
      }

      $scope.waivedStringsWithNumbers = function (waivedStr1, waivedStr2) {

        var rePartsWaived = /\d+|\D+/g;
        var reDigitWaived = /\d/;

        waivedStr1 = waivedStr1 == null ? ' ' : waivedStr1;
        waivedStr2 = waivedStr2 == null ? ' ' : waivedStr2;

        waivedStr1 = waivedStr1.toUpperCase();
        waivedStr2 = waivedStr2.toUpperCase();

        var waivedPart1 = waivedStr1.match(rePartsWaived);
        var waivedPart2 = waivedStr2.match(rePartsWaived);

        var isDigitPartWaived;

        if (waivedPart1 && waivedPart2 &&
          (isDigitPartWaived = reDigitWaived.test(waivedPart1[0])) == reDigitWaived.test(waivedPart2[0])) {

          var waivedLen = Math.min(waivedPart1.length, waivedPart2.length);

          return testWaived(waivedPart1, waivedPart2, waivedLen, isDigitPartWaived);
        }
        /* istanbul ignore next */
        return (waivedStr1 >= waivedStr2) - (waivedStr1 <= waivedStr2);
      };

      $scope.waivedGridOptions = {
        enableGridMenu: true,
        enableSelectAll: true,
        useExternalFiltering: true,
        exporterExcelFilename: 'preliminaryResponse.xlsx',
        exporterMenuExcel: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        paginationPageSizes: [10, 25, 50, 100],
        paginationPageSize: 10,

        onRegisterApi: function (gridApi) {
          $scope.gridApi = gridApi;
          /* istanbul ignore next: filterChanged */
          $scope.gridApi.core.on.filterChanged($scope, function () {
            var grid = this.grid;
            $scope.numberOfFilters = SearchHelperService.getNumberOfFilters(grid.columns);
            if ($scope.numberOfFilters === 0) {
              $scope.waivedGridOptions.data = $scope.myData.caseDetailsData;

            } else {
              var waivedFilteredData = SearchHelperService.filterGrid(grid, $scope.myData);
              $scope.waivedGridOptions.data = waivedFilteredData;

            }
          });

        }
      };


      $scope.isLoading = true;
      $scope.showFilters = false;

      HttpFactory.getActions(CONSTANTS.URL.PRELIMINARYRESPONSE)
        .then(function (successResponse) {
          $scope.myData = successResponse.data;

          var waivedColDefs = [];
          for (var i = 0; i < $scope.myData.columnDetails.length; i++) {
            var waivedCol = {};
            if ($scope.myData.columnDetails[i].typeDefinition === "Date") {
              waivedCol.type = 'date';
              waivedCol.cellFilter = 'date:"MM/dd/yyyy"';
              waivedCol.sortCellFiltered = true;
              waivedCol.sortingAlgorithm = $scope.sortDateWaived;
            } else {
              waivedCol.type = 'string';
            }
            waivedCol.displayName = $scope.myData.columnDetails[i].label;
            waivedCol.headerTooltip = $scope.myData.columnDetails[i].label;
            waivedCol.field = $scope.myData.columnDetails[i].name;
            waivedCol.showItems = $scope.myData.columnDetails[i].selected;
            waivedCol.width = "20%";

            if (waivedCol.showItems === true) {
              waivedCol.visible = true;
            } else {
              waivedCol.visible = false;
            }

            if (waivedCol.field === "proceedingNumber") {
              waivedCol.sort = {
                direction: uiGridConstants.ASC
              };
            }

            if ($scope.myData.columnDetails[i].typeDefinition === "String") {
              waivedCol.sortCellFiltered = true;
              waivedCol.sortingAlgorithm = $scope.waivedStringsWithNumbers;
            }

            if ($scope.myData.columnDetails[i].typeDefinition === "Number") {
              waivedCol.type = 'number';
              waivedCol.sortCellFiltered = true;
              waivedCol.sortingAlgorithm = $scope.sortNumberWaived;
            }

            waivedColDefs.push(waivedCol);
          }

          $scope.waivedGridOptions.columnDefs = waivedColDefs;
          $scope.waivedGridOptions.data = dataProcessWaived($scope.myData.caseDetailsData, $scope.myData.columnDetails);
          $scope.isLoading = false;

        }, function (failureResponse) {
          $log.info(failureResponse);
          $scope.isLoading = false;
        });

      function dataProcessWaived(waivedData, waivedColumns) {
        waivedData.forEach(function (row) {
          waivedColumns.forEach(function (waivedColumn) {

            if (waivedColumn.typeDefinition === 'Date') {
              row[waivedColumn.name] = row[waivedColumn.name] ? $filter('date')(new Date(row[waivedColumn.name]), 'MM/dd/yyyy') : null;
            }
          });

        });
        return waivedData;
      }

      $scope.toggleFilteringWaived = function () {
        $scope.showFilters = !$scope.showFilters;
        $scope.waivedGridOptions.enableFiltering = !$scope.waivedGridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        if (!$scope.showFilters) {
          $scope.gridApi.grid.clearAllFilters();
          $scope.waivedGridOptions.data = $scope.myData.caseDetailsData;
          $scope.numberOfFilters = 0;

        }
      };

      $scope.showFilteringWaived = function () {
        ngDialog.open({
          template: 'app/components/helperComponents/filterHelp/filteringHelp.html',
          controller: 'CommonDialogController',
          controllerAs: 'vm',
          showClose: false
        }).then(function () {}, function () {});
      };

    });
})();
