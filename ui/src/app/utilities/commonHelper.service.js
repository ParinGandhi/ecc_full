'use strict';
angular.module('ptabe2e').factory('CommonHelperService', function ($filter, $http, $window, SearchHelperService, CONSTANTS, HttpFactory, uiGridConstants, $rootScope, toastr) {

  var commonHelperService = {
    alphabetizeAvailableColumns: alphabetizeAvailableColumns,
    getCurrentTime: getCurrentTime,
    setCommonGridOptions: setCommonGridOptions,
    setColumnDefinitions: setColumnDefinitions,
    setGridData: setGridData,
    setGridWidthMap: setGridWidthMap,
    setColumnsToUpdate: setColumnsToUpdate,
    download_csv: download_csv,
    setDropDowns: setDropDowns,
    moveListItem: moveListItem,
    getExternalUrls: getExternalUrls,
    setToastr: setToastr,
    showHelpPDF: showHelpPDF,
    isIE: isIE,
    addAlertFilters: addAlertFilters,
    setPagination: setPagination,
    getRedirectUrl: getRedirectUrl
  };

  function showHelpPDF(location) {
    HttpFactory.getActions("/ptab-help?id=" + location)
      .then(function (successResponse) {
        var url = successResponse.data.fileContent;
        var contentsPreview = 'data:application/pdf;base64,' + url;
        getPreview(contentsPreview);
        //$window.open('assets/docs/WorkspaceHelp.pdf', '_blank');
      }, function (failureResponse) {
        toastr.error(failureResponse, {
          iconClass: 'toast-danger'
        });
      });

  }

  /* istanbul ignore next */
  function getPreview(contents) {
    $http.get(contents, {
        responseType: 'arraybuffer'
      })
      .success(function (data) {
        var file = new Blob([data], {
          type: 'application/pdf'
        });
        var fileURL = URL.createObjectURL(file);
        // if (null !== $scope.pdfContent) {
        //var pdfContent = $sce.trustAsResourceUrl(fileURL);
        $window.open(fileURL, '_blank');
        // }
        // if (fileURL !== '' || angular.isDefined(fileURL)) {
        //   $scope.show = false;
        //   $scope.editable = false;
        //   $scope.pdfStyle = {
        //     "border": "1px solid grey"
        //   };
        // }
      }).error(function (res) {

      });
  };

  function getExternalUrls() {
    var externalUrls;
    HttpFactory.getActions(CONSTANTS.URL.EXTERNALURLS)
      .then(function (successResponse) {
        externalUrls = successResponse.data;
      }, function () {});
    return externalUrls;
  }

  function download_csv(columnsData, mygridData) {
    var headers = [];
    angular.forEach(columnsData, function (coldata) {
      headers.push(coldata.columnLabel);

    })
    var fields = [];
    angular.forEach(columnsData, function (coldata) {

      if (coldata.columnName[0] === 'FK_ASSIGNEE_BE_NO') {
        fields.push([coldata.columnName[1], coldata.columnType]);
      } else {
        fields.push([coldata.columnName[0], coldata.columnType]);
      }
    });
    var replacer = function (key, value) {
      return value === null ? '' : value
    }
    var csv = mygridData.map(function (row) {
      return fields.map(function (fieldName) {
        if (fieldName[0] != 'actions' && fieldName[0] != 'auditLog' && fieldName[0] != 'auditLog' ) {
          if (fieldName[1] == 'date') {
            if (fieldName[0] == 'LAST_MODIFIED_TS') {
              return " " + $filter('date')(row[fieldName[0]], 'MM/dd/yyyy hh:mm:ss a') + " ";
            } else {
              return " " + $filter('date')(row[fieldName[0]], 'MM/dd/yyyy') + " ";
            }
          } else if (fieldName[0] === "supervisorsData[0].assigneeFullNameText") {
            var obj = row["supervisorsData"];
            return JSON.stringify(obj[0].assigneeFullNameText, replacer)
           
          }
          else if (fieldName[0] === "additionalProdCredits") {
            if(row[fieldName[0]] && row[fieldName[0]].length >8 ){
              return JSON.stringify("", replacer)
            }else {
              return JSON.stringify(row[fieldName[0]], replacer)
            }
           
           
          }  else {
            return JSON.stringify(row[fieldName[0]], replacer)
          }
        }
      }).join(',')
    });
    csv.unshift(headers.join(','))
    csv = csv.join('\r\n');
    return csv;


  }

  function alphabetizeAvailableColumns(a, b) {
    if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
      return -1;
    }
    if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  function getCurrentTime() {
    var date = new Date();
    return $filter('date')(date, 'MM_dd_yyyy_hh_mm_ss a');
  }

  function setCommonGridOptions() {
    var gridOptions = {
      enableGridMenu: true,
      enableSelectAll: false,
      useExternalFiltering: true,
      exporterMenuExcel: false,
      exporterMenuPdf: false,
      gridMenuShowHideColumns: true,
      exporterOlderExcelCompatibility: true,
      enableFiltering: true,
      multiSelect: false,
      paginationPageSizes: [10, 25, 50, 100]
    };

    return gridOptions;
  }

  function setDropDowns(assignmentType, caseType, creditsAwardedTo) {
    var assignmentTypesArray = assignmentType;
    var caseTypesArray = caseType;
    var awardedToArray = creditsAwardedTo;
  }

  function setColumnDefinitions(columnDetails) {
    var setColumnsResponse = {};
    setColumnsResponse.colDefs = [];
    setColumnsResponse.filterCount = 0;

    angular.forEach(columnDetails, function (fetchedColumn) {
      var columnToBeAdded = {};


      if (!fetchedColumn.headerTooltip) {
        columnToBeAdded.headerTooltip = fetchedColumn.columnLabel;
      } else {
        columnToBeAdded.headerTooltip = fetchedColumn.headerTooltip;
      }

      if (!fetchedColumn.visible) {
        setColumnsResponse.selectUnselect = false;
      }

      // Adding the column display name
      columnToBeAdded.displayName = fetchedColumn.columnLabel;

      // Checking if the field mapped to the column as an alias name
      if (fetchedColumn.columnName.length > 1) {
        columnToBeAdded.field = fetchedColumn.columnName[1];
      } else {
        columnToBeAdded.field = fetchedColumn.columnName[0];
      }
      if (columnToBeAdded.field === "alert") {
        columnToBeAdded.cellTemplate = 'app/components/widgets/assignmentBasedDocket/src/assignmentBasedDocketFlags.html';
      }
      if (columnToBeAdded.field === 'ASSIGNMENT_DUE_DT') {
        columnToBeAdded.cellTemplate = 'app/components/widgets/assignmentBasedDocket/src/assignmentBasedDocketRowTemplate.html';
      }
      if (columnToBeAdded.field === 'ALL_DISPOSITION_TX') {
        columnToBeAdded.cellTemplate = 'app/components/widgets/viewCaseDockets/src/keyDates.html';
      }

      // Setting column type
      columnToBeAdded.type = fetchedColumn.columnType;
      if (columnToBeAdded.type) {
        columnToBeAdded.type = columnToBeAdded.type.toLowerCase();
      }

      // Setting custom cell filter if one exists
      if (angular.isDefined(fetchedColumn.cellFilter)) {
        columnToBeAdded.cellFilter = fetchedColumn.cellFilter;
      }
      if (fetchedColumn.aggregationType) {
        if (fetchedColumn.aggregationType.indexOf("avg") >= 0) {
          columnToBeAdded.aggregationType = uiGridConstants.aggregationTypes.avg;
        } else {
          columnToBeAdded.aggregationType = uiGridConstants.aggregationTypes.sum;
        }
        columnToBeAdded.aggregationLabel = fetchedColumn.aggregationLabel;
        columnToBeAdded.footerCellFilter = 'number:2';
      }
      // Setting visibility of the column
      if (fetchedColumn.mandatory) {
        columnToBeAdded.visible = true;
        columnToBeAdded.enableHiding = false;
      } else {
        columnToBeAdded.visible = fetchedColumn.visible;
      }
      if (fetchedColumn.pinned === 'right') {
        columnToBeAdded.pinnedRight = true;
      } else if (fetchedColumn.pinned === 'left') {
        columnToBeAdded.pinnedLeft = true;
      }

      // Setting column width
      columnToBeAdded.width = fetchedColumn.width;

      // Setting custom template if one exists
      if (angular.isDefined(fetchedColumn.cellTemplate)) {
        columnToBeAdded.cellTemplate = fetchedColumn.cellTemplate;
      }

      // Setting sort properties on column
      columnToBeAdded.sort = fetchedColumn.sort;

      // Setting column filters
      if (angular.isDefined(fetchedColumn.filters[0].selectOptions)) {
        columnToBeAdded.filters = [{
          term: fetchedColumn.filters[0].term,
          type: uiGridConstants.filter.SELECT,
          width: '*'
        }]
        if (fetchedColumn.columnName[0] === 'caseType') {
          columnToBeAdded.filters[0].selectOptions = $rootScope.caseTypesArray;
          columnToBeAdded.filters[0].ariaLabel = fetchedColumn.ariaLabel;
        }
        if (fetchedColumn.columnName[0] === 'assignmentType') {
          columnToBeAdded.filters[0].selectOptions = $rootScope.assignmentTypesArray;
          columnToBeAdded.filters[0].ariaLabel = fetchedColumn.ariaLabel;
        }
        if (fetchedColumn.columnName[0] === 'decisionalUnitsAwarded') {
          columnToBeAdded.filters[0].selectOptions = $rootScope.awardedToArray;
          columnToBeAdded.filters[0].ariaLabel = fetchedColumn.ariaLabel;
        }
      } else {
        columnToBeAdded.filters = fetchedColumn.filters;
      }
      // Incrementing the filter flag
      if (columnToBeAdded.filters[0].term) {
        setColumnsResponse.filterCount++;
      }

      setColumnsResponse.colDefs.push(columnToBeAdded);

    });

    return setColumnsResponse;
  }


  function setGridData(filterCount, gridData, columns) {
    if (filterCount > 0) {
      return SearchHelperService.filterTable(gridData, columns);
    } else {
      return gridData;
    }
  }

  function setGridWidthMap(gridStateInput) {
    var gridState = {};

    gridState.widthMap = gridStateInput.columns.reduce(function (map, col) {
      map[col.name] = col;
      return map;
    }, {});
    gridState.paginationSize = gridStateInput.pagination.paginationPageSize;
    gridState.columns = gridStateInput.columns;
    return gridState;
  }


  function setColumnsToUpdate(columnsSelected, fromModal, gridState, widgetIdentifier, fromAssignments) {
    angular.forEach(columnsSelected, function (row) {
      if (row.mandatory) {
        row.visible = true;
        row.enableHiding = false;
      }
      var colWidth;
      if (row.columnName.length > 1) {
        colWidth = gridState.widthMap[row.columnName[1]];
      } else {
        colWidth = gridState.widthMap[row.columnName[0]];
      }



      if (angular.isDefined(colWidth)) {
        row.pinned = colWidth.pinned;
        if (angular.isDefined(colWidth.sort)) {
          row.sort = colWidth.sort;
        }

        if (fromModal) {
          row.visible = row.visible;

        } else {
          row.visible = colWidth.visible;
        }

        row.filters = colWidth.filters;

        if (angular.isDefined(colWidth.width)) {
          row.width = colWidth.width;
        } else {
          row.width = 200;
        }
      }
    });

    if (!fromAssignments) {
      if (!fromModal) {
        var columnsWithProp = angular.copy(columnsSelected);
        var columnsMap = columnsWithProp.reduce(function (map, col) {
          if (col.columnName.length === 2) {
            map[col.columnName[1]] = col;
          } else {
            map[col.columnName[0]] = col;
          }
          return map;
        }, {});
        columnsSelected = [];
        angular.forEach(gridState.columns, function (eachRowOfGrid) {
          var colWithProp = columnsMap[eachRowOfGrid.name];
          columnsSelected.push(colWithProp);

        })
      }
    }

    return {
      userWorkspaceWidgetIdentifier: widgetIdentifier,
      paginationSize: gridState.paginationSize ? gridState.paginationSize : 10,
      selectedColumns: columnsSelected
    }
  }


  /** This function will handle moving list items up or down */
  function moveListItem(itemsList, origin, destination) {
    var temp = itemsList[destination];
    itemsList[destination] = itemsList[origin];
    itemsList[origin] = temp;
    return itemsList;
  }

  function setToastr(message, type, timeOut, extendedTimeOut, allowHtml) {
    var toastrOptions = {
      iconClass: 'toast-' + type
    }
    if (type === "error") {
      toastrOptions.iconClass = 'toast-danger'
    }
    if (timeOut) {
      toastrOptions.timeOut = timeOut;
    }
    if (extendedTimeOut) {
      toastrOptions.extendedTimeOut = extendedTimeOut;
    }
    if (allowHtml) {
      toastrOptions.allowHtml = allowHtml;
    }
    switch (type) {
      case "success":
        toastr.success(message, toastrOptions);
        break;
      case "warning":
        toastr.warning(message, toastrOptions);
        break;
      case "error":
        toastr.error(message, toastrOptions);
        break;
      case "info":
        toastr.error(message, toastrOptions);
        break;
      case "clear":
        toastr.clear();
    }
  }

  function isIE() {
    var ua = navigator.userAgent,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      return 'IE';
    }
    return false;
  }

  function getAlertSelectOptions(widgetName) {
    var selectOptions = [{
      value: '',
      label: 'All',

    }, {
      value: CONSTANTS.ALERTS.NEW.value,
      label: CONSTANTS.ALERTS.NEW.label
    }, {
      value: CONSTANTS.ALERTS.CRITICAL.value,
      label: CONSTANTS.ALERTS.CRITICAL.label
    }, {
      value: CONSTANTS.ALERTS.DUE_TODAY.value,
      label: CONSTANTS.ALERTS.DUE_TODAY.label
    }, {
      value: CONSTANTS.ALERTS.PAST_DUE.value,
      label: CONSTANTS.ALERTS.PAST_DUE.label
    }, {
      value: CONSTANTS.ALERTS.NO_ALERTS.value,
      label: CONSTANTS.ALERTS.NO_ALERTS.label
    }];

    if (widgetName && widgetName.indexOf("case") >= 0) {
      selectOptions[2].label = CONSTANTS.ALERTS.UPCOMING.label;
      selectOptions[2].value = CONSTANTS.ALERTS.UPCOMING.value;
      selectOptions.splice(3, 1);
      selectOptions.splice(1, 1);
    }

    return selectOptions;
  }

  function addAlertFilters(col, widgetName) {
    var term = "";
    if (col.filters && col.filters.length > 0 && col.filters[0].term) {
      term = col.filters[0].term;
    }

    var theSelectOptions = getAlertSelectOptions(widgetName);

    col.enableFiltering = true;
    col.enableSorting = true;
    col.dataType = 'select';
    col.type = "string";
    col.sortingAlgorithm = function (a, b, rowA, rowB) {
      if (widgetName === 'View case dockets') {
        return sortCaseAlerts(rowA, rowB);
      } else {
        return sortAlerts(rowA, rowB);
      }
    };
    col.filters = [];
    col.filters.push({
      term: term,
      type: uiGridConstants.filter.SELECT,
      width: '*',
      selectOptions: theSelectOptions,
      ariaLabel: 'Filter for alerts column'
    });
    return col;
  }

  function sortAlerts(rowA, rowB) {
    var aVal = rowA.entity.ASSIGNMENT_DUE_DT;
    var bVal = rowB.entity.ASSIGNMENT_DUE_DT;
    if (aVal > bVal) {
      return 1;
    } else if (aVal < bVal) {
      return -1;
    } else {
      return 0;
    }
  }



  function sortCaseAlerts(rowA, rowB) {
    var nulls = null; // gridCore.sortHandleNulls(rowA, rowB);
    if (nulls !== null) {
      return -1 * nulls;
    } else {
      return sortTheCaseAlerts(rowA.entity, rowB.entity);
    }
  }


  function sortTheCaseAlerts(a, b) {
    var aVal = getCaseAlertValue(a);
    var bVal = getCaseAlertValue(b);

    if (!a && !b) {
      return 0;
    } else if (!aVal && bVal) {
      return 1
    } else if (aVal && !bVal) {
      return -1;
    } else if (aVal < bVal) {
      return -1;
    } else if (aVal > bVal) {
      return 1;
    } else {
      return 0;
    }
  }

  function getCaseAlertValue(row) {

    if (row.PROCEEDING_TYPE_CT === 'TRIAL') {
      return row.DECISION_DUE_DAYS
    } else {
      return row.APPEAL_DECISION_DUE_DAYS
    }

  }


  function setPagination() {
    var pageSize;
    switch ($rootScope.widgetHeight) {
      case "widgetHeightSmall":
        pageSize = CONSTANTS.PAGINATION.TEN;
        break;
      case "widgetHeightMedium":
        pageSize = CONSTANTS.PAGINATION.TWENTY_FIVE;
        break;
      case "widgetHeightLarge":
        pageSize = CONSTANTS.PAGINATION.FIFTY;
        break;
      case "widgetHeightXlarge":
        pageSize = CONSTANTS.PAGINATION.ONE_HUNDRED;
        break;
      default:
        break;
    }
    return pageSize;
  }

  function getRedirectUrl(url) {
    var prefix = "fromAppeals";
    HttpFactory.getActions(CONSTANTS.URL.REDIRECT_TO_TRIALS + $window.sessionStorage.getItem("workerNumber"))
      .then(function (successResponse) {
        var jwtToken = (successResponse.data.jwtToken.split("Bearer ").pop());
        window.open(successResponse.data.redirectorURL, prefix + JSON.stringify({
          "url": url,
          "token": jwtToken
        }));
      }, function (failureResponse) {
        $log.debug(failureResponse);
      });
  };


  return commonHelperService;
});
