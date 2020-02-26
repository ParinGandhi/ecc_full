(function () {
  "use strict";

  angular.module('ptabe2e')
    .controller('LessThanThreeJudgesController', function ($scope, $filter, $log, SearchHelperService, HttpFactory, ngDialog, uiGridConstants, CONSTANTS) {

      window.document.title = "Pending cases that have less than three judges";

      $scope.sortNumberFunction = function (sortNumber1, sortNumber2) {
        var resultNumberJudges;
        sortNumber1 = sortNumber1 === null ? '-1' : sortNumber1;
        sortNumber2 = sortNumber2 === null ? '-1' : sortNumber2;
        sortNumber1 = parseInt(sortNumber1, CONSTANTS.GLOBAL.RADIX);
        sortNumber2 = parseInt(sortNumber2, CONSTANTS.GLOBAL.RADIX);
        if (sortNumber1 === sortNumber2) {
          resultNumberJudges = 0;
        }
        if (sortNumber1 < sortNumber2) {
          resultNumberJudges = -1;
        }
        if (sortNumber1 > sortNumber2) {
          resultNumberJudges = 1;
        }

        return resultNumberJudges;
      };

      $scope.sortDateFunction = function (sortDate1, sortDate2) {
        var resultDateJudges;
        sortDate1 = sortDate1 === null ? new Date('12/31/1899') : new Date(sortDate1);
        sortDate2 = sortDate2 === null ? new Date('12/31/1899') : new Date(sortDate2);
        /* istanbul ignore if */
        if (sortDate1 === sortDate2) {
          resultDateJudges = 0;
        }
        if (sortDate1 < sortDate2) {
          resultDateJudges = -1;
        }
        if (sortDate1 > sortDate2) {
          resultDateJudges = 1;
        }

        return resultDateJudges;
      };

      function testJudges(threeJudgesPart1, threeJudgesPart2, judgesLen, isDigitPartJudges) {
        var result1;
        for (var i = 0; i < judgesLen; i++) {
          var aPartJudges = threeJudgesPart1[i];
          var bPartJudges = threeJudgesPart2[i];

          if (isDigitPartJudges) {
            aPartJudges = parseInt(aPartJudges, 10);
            bPartJudges = parseInt(bPartJudges, 10);
          }

          if (aPartJudges !== bPartJudges) {
            result1 = aPartJudges < bPartJudges ? -1 : 1;
            break;
          }
          isDigitPartJudges = !isDigitPartJudges;
        }

        return result1;
      }

      $scope.cmpStringsWithNumbers = function (firstNumberString, secondNumberString) {

        var rePartsJudges = /\d+|\D+/g;
        var reDigitJudges = /\d/;

        firstNumberString = firstNumberString == null ? ' ' : firstNumberString;
        secondNumberString = secondNumberString == null ? ' ' : secondNumberString;

        firstNumberString = firstNumberString.toUpperCase();
        secondNumberString = secondNumberString.toUpperCase();

        var threeJudgesPart1 = firstNumberString.match(rePartsJudges);
        var threeJudgesPart2 = secondNumberString.match(rePartsJudges);

        var isDigitPartJudges;

        if (threeJudgesPart1 && threeJudgesPart2 &&
          (isDigitPartJudges = reDigitJudges.test(threeJudgesPart1[0])) == reDigitJudges.test(threeJudgesPart2[0])) {

          var judgesLen = Math.min(threeJudgesPart1.length, threeJudgesPart2.length);

          return testJudges(threeJudgesPart1, threeJudgesPart2, judgesLen, isDigitPartJudges);
        }
        /* istanbul ignore next */
        return (firstNumberString >= secondNumberString) - (firstNumberString <= secondNumberString);
      };

      $scope.threeJudgesGridOptions = {
        enableGridMenu: true,
        enableSelectAll: true,
        useExternalFiltering: true,
        exporterExcelFilename: 'pendingCasesWithJudges.xlsx',
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
              $scope.threeJudgesGridOptions.data = $scope.myData.caseDetailsData;

            } else {
              var judgeFilteredData = SearchHelperService.filterGrid(grid, $scope.myData);
              $scope.threeJudgesGridOptions.data = judgeFilteredData;
            }
          });
        }
      };


      $scope.isLoading = true;
      $scope.showFilters = false;

      HttpFactory.getActions(CONSTANTS.URL.THREEJUDGES)
        .then(function (successResponse) {
          $scope.myData = successResponse.data;

          var judgeColDefs = [];
          for (var i = 0; i < $scope.myData.columnDetails.length; i++) {
            var threeJudgesCol = {};
            if ($scope.myData.columnDetails[i].typeDefinition === "Date") {
              threeJudgesCol.type = 'date';
              threeJudgesCol.cellFilter = 'date:"MM/dd/yyyy"';
              threeJudgesCol.sortCellFiltered = true;
              threeJudgesCol.sortingAlgorithm = $scope.sortDateFunction;
            } else {
              threeJudgesCol.type = 'string';
            }
            threeJudgesCol.displayName = $scope.myData.columnDetails[i].label;
            threeJudgesCol.headerTooltip = $scope.myData.columnDetails[i].label;
            threeJudgesCol.field = $scope.myData.columnDetails[i].name;
            threeJudgesCol.showItems = $scope.myData.columnDetails[i].selected;
            threeJudgesCol.width = "15%";

            if (threeJudgesCol.showItems === true) {
              threeJudgesCol.visible = true;
            } else {
              threeJudgesCol.visible = false;
            }
            if (threeJudgesCol.field === "noticeOfAccordedFilingDate") {
              threeJudgesCol.sort = {
                direction: uiGridConstants.ASC
              };
            }
            if ($scope.myData.columnDetails[i].typeDefinition === "String") {

              threeJudgesCol.sortCellFiltered = true;
              threeJudgesCol.sortingAlgorithm = $scope.cmpStringsWithNumbers;
            }
            if ($scope.myData.columnDetails[i].typeDefinition === "Number") {
              threeJudgesCol.type = 'number';
              threeJudgesCol.sortCellFiltered = true;
              threeJudgesCol.sortingAlgorithm = $scope.sortNumberFunction;
            }
            judgeColDefs.push(threeJudgesCol);
          }

          $scope.threeJudgesGridOptions.columnDefs = judgeColDefs;
          $scope.threeJudgesGridOptions.data = dataProcessJudges($scope.myData.caseDetailsData, $scope.myData.columnDetails);

          $scope.isLoading = false;

        }, function (failureResponse) {
          $log.info(failureResponse);
          $scope.isLoading = false;
        });

      function dataProcessJudges(judgesData, judgesColumns) {
        judgesData.forEach(function (row) {
          judgesColumns.forEach(function (judgesColumn) {

            if (judgesColumn.typeDefinition === 'Date') {
              row[judgesColumn.name] = row[judgesColumn.name] ? $filter('date')(new Date(row[judgesColumn.name]), 'MM/dd/yyyy') : null;
            }
          });

        });
        return judgesData;
      }

      $scope.toggleFilteringJudges = function () {
        $scope.showFilters = !$scope.showFilters;
        $scope.threeJudgesGridOptions.enableFiltering = !$scope.threeJudgesGridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        if (!$scope.showFilters) {
          $scope.gridApi.grid.clearAllFilters();
          $scope.threeJudgesGridOptions.data = $scope.myData.caseDetailsData;
          $scope.numberOfFilters = 0;
        }
      };

      $scope.showFilteringJudges = function () {
        ngDialog.open({
          template: 'app/components/helperComponents/filterHelp/filteringHelp.html',
          controller: 'CommonDialogController',
          controllerAs: 'vm',
          showClose: false
        }).then(function () {}, function () {});
      };

    });
})();
