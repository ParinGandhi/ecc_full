(function () {
  "use strict";

  angular.module('ptabe2e')
    .controller('MilestoneDatesController', function ($scope, ngDialog, $log, $filter, SearchHelperService, uiGridConstants, HttpFactory, CONSTANTS) {

      window.document.title = "Submitted cases with milestone dates";

      $scope.sortNumberMilestones = function (milestoneNumber1, milestoneNumber2) {
        var resultMilestones;
        milestoneNumber1 = milestoneNumber1 === null ? '-1' : milestoneNumber1;
        milestoneNumber2 = milestoneNumber2 === null ? '-1' : milestoneNumber2;
        milestoneNumber1 = parseInt(milestoneNumber1, CONSTANTS.GLOBAL.RADIX);
        milestoneNumber2 = parseInt(milestoneNumber2, CONSTANTS.GLOBAL.RADIX);
        if (milestoneNumber1 === milestoneNumber2) {
          resultMilestones = 0;
        }
        if (milestoneNumber1 < milestoneNumber2) {
          resultMilestones = -1;
        }
        if (milestoneNumber1 > milestoneNumber2) {
          resultMilestones = 1;
        }

        return resultMilestones;
      };

      $scope.sortDateMilestones = function (milestoneDate1, milestoneDate2) {
        var resultString;
        milestoneDate1 = milestoneDate1 === null ? new Date('12/31/1899') : new Date(milestoneDate1);
        milestoneDate2 = milestoneDate2 === null ? new Date('12/31/1899') : new Date(milestoneDate2);
        /* istanbul ignore if */
        if (milestoneDate1 === milestoneDate2) {
          resultString = 0;
        }
        if (milestoneDate1 < milestoneDate2) {
          resultString = -1;
        }
        if (milestoneDate1 > milestoneDate2) {
          resultString = 1;
        }

        return resultString;
      };

      function testMilestones(milestonesPart1, milestonesPart2, milestonesLen, isDigitPartMilestone) {
        var result2;
        for (var i = 0; i < milestonesLen; i++) {
          var aMilestone = milestonesPart1[i];
          var bMilestone = milestonesPart2[i];

          if (isDigitPartMilestone) {
            aMilestone = parseInt(aMilestone, 10);
            bMilestone = parseInt(bMilestone, 10);
          }

          if (aMilestone !== bMilestone) {
            result2 = aMilestone < bMilestone ? -1 : 1;
            break;
          }
          isDigitPartMilestone = !isDigitPartMilestone;
        }

        return result2;
      }

      $scope.milestonesStringsWithNumbers = function (milestonestr1, milestonestr2) {

        var rePartsMilestone = /\d+|\D+/g;
        var reDigitMilestone = /\d/;

        milestonestr1 = milestonestr1 == null ? ' ' : milestonestr1;
        milestonestr2 = milestonestr2 == null ? ' ' : milestonestr2;

        milestonestr1 = milestonestr1.toUpperCase();
        milestonestr2 = milestonestr2.toUpperCase();

        var milestonesPart1 = milestonestr1.match(rePartsMilestone);
        var milestonesPart2 = milestonestr2.match(rePartsMilestone);

        var isDigitPartMilestone;

        if (milestonesPart1 && milestonesPart2 &&
          (isDigitPartMilestone = reDigitMilestone.test(milestonesPart1[0])) == reDigitMilestone.test(milestonesPart2[0])) {

          var milestonesLen = Math.min(milestonesPart1.length, milestonesPart2.length);

          return testMilestones(milestonesPart1, milestonesPart2, milestonesLen, isDigitPartMilestone);
        }
        /* istanbul ignore next */
        return (milestonestr1 >= milestonestr2) - (milestonestr1 <= milestonestr2);
      };

      $scope.gridOptions = {
        enableGridMenu: true,
        enableSelectAll: true,
        useExternalFiltering: true,
        exporterExcelFilename: 'milestoneDates.xlsx',
        exporterMenuExcel: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
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
              $scope.gridOptions.data = $scope.myData.caseDetailsData;

            } else {
              var milestonesFilteredData = SearchHelperService.filterGrid(grid, $scope.myData);
              $scope.gridOptions.data = milestonesFilteredData;

            }
          });
        }

      };



      $scope.isLoading = true;
      $scope.showFilters = false;

      HttpFactory.getActions(CONSTANTS.URL.MILESTONEDATES)
        .then(function (successResponse) {

          $scope.myData = successResponse.data;

          var milestoneColDefs = [];
          for (var i = 0; i < $scope.myData.columnDetails.length; i++) {
            var milestonesCol = {};
            if ($scope.myData.columnDetails[i].typeDefinition === "Date") {
              milestonesCol.type = 'date';
              milestonesCol.cellFilter = 'date:"MM/dd/yyyy"';
              milestonesCol.sortCellFiltered = true;
              milestonesCol.sortingAlgorithm = $scope.sortDateMilestones;
            } else {
              milestonesCol.type = 'string';
            }
            milestonesCol.displayName = $scope.myData.columnDetails[i].label;
            milestonesCol.headerTooltip = $scope.myData.columnDetails[i].label;
            milestonesCol.field = $scope.myData.columnDetails[i].name;
            milestonesCol.showItems = $scope.myData.columnDetails[i].selected;
            milestonesCol.width = "15%";

            if (milestonesCol.showItems === true) {
              milestonesCol.visible = true;
            } else {
              milestonesCol.visible = false;
            }

            if (milestonesCol.field === "noticeOfAccordedFilingDate") {
              milestonesCol.sort = {
                direction: uiGridConstants.DESC
              };
            }
            if ($scope.myData.columnDetails[i].typeDefinition === "String") {
              milestonesCol.sortCellFiltered = true;
              milestonesCol.sortingAlgorithm = $scope.milestonesStringsWithNumbers;

            }
            if ($scope.myData.columnDetails[i].typeDefinition === "Number") {
              milestonesCol.type = 'number';
              milestonesCol.sortCellFiltered = true;
              milestonesCol.sortingAlgorithm = $scope.sortNumberMilestones;
            }

            milestoneColDefs.push(milestonesCol);
          }

          $scope.gridOptions.columnDefs = milestoneColDefs;
          $scope.gridOptions.data = dataProcessMilestones($scope.myData.caseDetailsData, $scope.myData.columnDetails);

          $scope.isLoading = false;

        }, function (failureResponse) {
          $log.info(failureResponse);
          $scope.isLoading = false;
        });

      function dataProcessMilestones(milestonesData, milestonesColumns) {
        milestonesData.forEach(function (row) {
          milestonesColumns.forEach(function (milestonesColumn) {

            if (milestonesColumn.typeDefinition === 'Date') {
              row[milestonesColumn.name] = row[milestonesColumn.name] ? $filter('date')(new Date(row[milestonesColumn.name]), 'MM/dd/yyyy') : null;
            }
          });

        });
        return milestonesData;
      }


      $scope.toggleFilteringMilestones = function () {
        $scope.showFilters = !$scope.showFilters;
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        if (!$scope.showFilters) {
          $scope.gridApi.grid.clearAllFilters();
          $scope.gridOptions.data = $scope.myData.caseDetailsData;
          $scope.numberOfFilters = 0;

        }
      };

      $scope.showFilteringMilestones = function () {
        ngDialog.open({
          template: 'app/components/helperComponents/filterHelp/filteringHelp.html',
          controller: 'CommonDialogController',
          controllerAs: 'vm',
          showClose: false
        }).then(function () {}, function () {});
      };

    });
})();
