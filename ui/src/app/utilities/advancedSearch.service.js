'use strict';
angular.module('ptabe2e').factory('SearchHelperService', function ($filter, $log, CONSTANTS) {

  var searchHelperService = {
    getNumberOfFilters: getNumberOfFilters,
    filterTable: filterTable,
    filterTableForImportManager: filterTableForImportManager,
    filterGrid: filterGrid,
    filterGridImportManager: filterGridImportManager,
    hasHiddenColumnFilters: hasHiddenColumnFilters
  };

  function hasHiddenColumnFilters(columns) {
    var hiddenColumnFilters = [];
    angular.forEach(columns, function (column) {
      if (column.filters[0].term && !column.visible) {
        hiddenColumnFilters.push(column);
      }
    });
    return hiddenColumnFilters;
  }

  /** Types are filters are:
   * <=1234 Less than or equal to
   * >=1234  Greater than or equal to
   * <1234   Less than
   * >1234   Greater than
   * <>  Not equal to
   * !=1234  Not equal to
   * =1234   Exactly equal to (case insensitive)
   * 12* Starts with
   * !=12*   Does not start with
   * *34 Ends with
   * [ODD]   Ends with an odd number
   * [EVEN]  Ends with an even number
   * [0-4]   Ends with a number in the given range
   * [00-49] Ends with a number in the given range
   *
   * The filterNotApplicable indicates that the filter value does not contain a particular special character filter.
   * Therefore a function that looks for a special compare value does not return true/false, instead it returns
   * filterNotApplicable which indicates to look for other special filters.
   */
  var filterNotApplicable = '~filterNotApplicable';

  function filterGrid(grid, currentData) {
    if (getNumberOfFilters(grid.columns) === 0) {
      return currentData;
    }
    return filterTable(currentData, grid.columns);
  }

  function filterGridImportManager(grid, currentData) {
    if (getNumberOfFilters(grid.columns) === 0) {
      return currentData;
    }
    return filterTableForImportManager(currentData, grid.columns);
  }

  function getNumberOfFilters(columns) {
    var numberOfFilters = 0;
    angular.forEach(columns, function (column) {
      numberOfFilters += hasTerm(columns, column.field);
    });

    return numberOfFilters;
  }

  function hasTerm(columns, field) {
    var term = "";
    angular.forEach(columns, function (column) {
      if (column.field === field) {
        term = column.filters[0].term;
      }
    });
    return term ? 1 : 0;
  }

  function getColumnsWithTerms(columns) {
    if (angular.isDefined(columns)) {
      var columnList = [];
      for (var i = 0; i < columns.length; i++) {
        var termAndColumn = {
          "term": "",
          "columnName": "",
          "dataType": ""
        };
        if (columns[i].filters[0].term) {
          termAndColumn.term = columns[i].filters[0].term;
          termAndColumn.columnName = columns[i].field;
          if (angular.isDefined(columns[i].colDef)) {
            termAndColumn.dataType = columns[i].colDef.type;
          } else {
            termAndColumn.dataType = columns[i].type;
          }
          columnList.push(termAndColumn);
        }
      }
      return columnList;
    }
  }

  function filterTable(unfilteredArray, columns) {
    var newList = [];
    var match, data, blankFound, currentRow, currentColumn;
    var columnList = getColumnsWithTerms(columns);
    // var data;
    var blankList = [];
    // var blankFound;
    // var currentRow;

    if (!unfilteredArray) {
      return null;
    } else if (angular.isDefined(unfilteredArray.caseDetailsData)) {
      data = unfilteredArray.caseDetailsData;
    } else if (angular.isDefined(unfilteredArray)) {
      data = unfilteredArray;
    }

    /** Will remove any column in the current row that contains blank cells if '?' is passed as the search criteria */
    for (currentRow = 0; currentRow < data.length; currentRow++) {
      blankFound = false;
      for (currentColumn = 0; currentColumn < columnList.length; currentColumn++) {
        if (!blankFound) {
          if (columnList[currentColumn].term === "?" && columnList[currentColumn].dataType !== 'date' && data[currentRow][columnList[currentColumn].columnName]) {
            if (columnList[currentColumn].columnName === 'ADDITIONAL_APJ_WORKER_ID_TX') {
              if (checkForBlanks(data[currentRow])) {
                blankList.push(data[currentRow]);
                blankFound = true;
                break;
              }
            }
            if (!data[currentRow][columnList[currentColumn].columnName].toString().trim()) {
              blankList.push(data[currentRow]);
              blankFound = true;
              break;
            }
          } else {
            if (columnList[currentColumn].term === "/") {

            } else if (columnList[currentColumn].columnName === 'ADDITIONAL_APJ_WORKER_ID_TX') {
              if (checkForBlanks(data[currentRow])) {
                blankList.push(data[currentRow]);
                blankFound = true;
                break;
              }
            } else if (columnList[currentColumn].columnName.indexOf('alert') >= 0 || columnList[currentColumn].columnName.indexOf('APPEAL_SEQUENCE_NO') >= 0) {} else if (!data[currentRow][columnList[currentColumn].columnName]) {
              blankList.push(data[currentRow]);
              blankFound = true;
              break;
            }
          }
        }
      }
    }

    /** Will remove all rows containing blank calls from the dataset */
    data = data.filter(function (row) {
      return blankList.indexOf(row) < 0;
    });

    blankList = [];

    var removeBlankList = [];


    /** Will keep any column in the current row that contains blank cells if '/' is passed as the search criteria */
    for (currentColumn = 0; currentColumn < columnList.length; currentColumn++) {
      blankList = [];
      if (columnList[currentColumn].term === "/") {
        for (currentRow = 0; currentRow < data.length; currentRow++) {
          var columnNameBeingLookedAt = data[currentRow][columnList[currentColumn].columnName];
          if (columnList[currentColumn].columnName === 'ADDITIONAL_APJ_WORKER_ID_TX') {
            if (checkForBlanks(data[currentRow])) {
              blankList.push(data[currentRow]);
            }
          } else if (data[currentRow][columnList[currentColumn].columnName] !== 0 && (!data[currentRow][columnList[currentColumn].columnName] ||
              !data[currentRow][columnList[currentColumn].columnName].toString().trim())) {
            blankList.push(data[currentRow]);
          }
        }
        /** Will remove all rows containing blank calls from the dataset */
        data = angular.copy(blankList);
      }
    }

    angular.forEach(data, function (currentRow) {
      var firstRun = true;
      angular.forEach(columnList, function (currentColumn) {
        if (currentColumn.term !== "?" && currentColumn.term !== "/") {
          // Filter all APJ fields for Panel column in view case docket
          if (currentColumn.columnName === 'ADDITIONAL_APJ_WORKER_ID_TX') {
            match = compareConcatValue(currentColumn.term, currentRow);
          } else if ((angular.isDefined(currentRow[currentColumn.columnName]) && currentRow[currentColumn.columnName] !== null) || currentColumn.columnName.indexOf('alert') === 0 || currentColumn.columnName.indexOf('APPEAL_SEQUENCE_NO') >= 0) {
            if (angular.isArray(currentRow[currentColumn.columnName]) && currentColumn.columnName.indexOf('alert') < 0) {
              for (var i = 0; i < 4; i++) {
                match = compareValue(currentColumn.term, currentRow[currentColumn.columnName][i], currentColumn.dataType, null, currentColumn.columnName);
                if (match) {
                  break;
                }
              }
            } else {

              var data;

              if (currentColumn.columnName.indexOf('alert') >= 0 || currentColumn.columnName.indexOf('APPEAL_SEQUENCE_NO') >= 0) {
                data = currentRow['alerts'];
                if (!data) {
                  data = currentRow;
                }
              } else if (currentColumn.columnName === 'reviewDispositionCode') {
                data = currentRow['reviewDispositionCodeDescription'];
              } else {
                data = currentRow[currentColumn.columnName];
              }

              if (firstRun) {
                match = compareValue(currentColumn.term, data, currentColumn.dataType, null, currentColumn.columnName);
              } else {
                match = match && compareValue(currentColumn.term, data, currentColumn.dataType, null, currentColumn.columnName);
              }
              firstRun = false;
            }
          } else {
            if (firstRun) {
              match = false;
            } else {
              match = match && false;
              firstRun = false;
            }
          }
        } else {
          if (firstRun) {
            match = true;
            firstRun = false;
          } else {
            match = match && true;
          }
        }
      });

      if (match) {
        newList.push(currentRow);
      }
    });
    return newList;
  }

  function checkAlertValue(term, alerts) {
    var match = false;
    if (term === CONSTANTS.ALERTS.NEW.value && alerts[1].trim()) {
      match = true;
    } else if (term === CONSTANTS.ALERTS.CRITICAL.value && alerts[0].trim()) {
      match = true;
    } else if (term === CONSTANTS.ALERTS.DUE_TODAY.value && alerts[2].trim()) {
      match = true;
    } else if (term === CONSTANTS.ALERTS.PAST_DUE.value && alerts[3].trim()) {
      match = true;
    } else if (term === CONSTANTS.ALERTS.USER_INACTIVE.value && alerts[4].trim()) {
      match = true;
    } else if (term === CONSTANTS.ALERTS.NO_ALERTS.value && alerts[5].trim()) {
      match = containsAlertValue(alerts);
    }
    return match;
  }

  function containsAlertValue(alerts) {
    var alertValues = "";
    angular.forEach(alerts, function (value) {
      alertValues += value.trim();
    });

    return alertValues === CONSTANTS.ALERTS.NO_ALERTS.value;
  }

  function filterTableForImportManager(unfilteredArray, columns) {
    var newList = [];
    var match;
    var columnList = getColumnsWithTerms(columns);

    angular.forEach(unfilteredArray.caseDetailsData, function (currentRow) {
      var firstRun = true;
      angular.forEach(columnList, function (currentColumn) {
        if (firstRun) {
          match = compareValue(currentColumn.term, currentRow.preAppealInfo[currentColumn.columnName], currentColumn.dataType, null, currentColumn.columnName);
        } else {
          match = match && compareValue(currentColumn.term, currentRow.preAppealInfo[currentColumn.columnName], currentColumn.dataType, null, currentColumn.columnName);
        }
        firstRun = false;
      });

      if (match) {
        newList.push(currentRow.preAppealInfo);
      }
    });
    return newList;
  }

  function compareConcatValue(filter, thisRow) {
    var upperCaseFilter = filter.toUpperCase();

    // Assignment docket docket judge objects
    if (thisRow.appealPanelJudgeOne && thisRow.appealPanelJudgeOne.toUpperCase().indexOf(upperCaseFilter) >= 0) {
      return thisRow.appealPanelJudgeOne.toUpperCase().indexOf(upperCaseFilter) >= 0
    }
    if (thisRow.appealPanelJudgeTwo && thisRow.appealPanelJudgeTwo.toUpperCase().indexOf(upperCaseFilter) >= 0) {
      return thisRow.appealPanelJudgeTwo.toUpperCase().indexOf(upperCaseFilter) >= 0
    }
    if (thisRow.appealPanelJudgeThree && thisRow.appealPanelJudgeThree.toUpperCase().indexOf(upperCaseFilter) >= 0) {
      return thisRow.appealPanelJudgeThree.toUpperCase().indexOf(upperCaseFilter) >= 0
    }

    // View case docket docket judge objects
    if (thisRow.APJ1_WORKER_ID && thisRow.APJ1_WORKER_ID.toUpperCase().indexOf(upperCaseFilter) >= 0) {
      return thisRow.APJ1_WORKER_ID.toUpperCase().indexOf(upperCaseFilter) >= 0
    }
    if (thisRow.APJ2_WORKER_ID && thisRow.APJ2_WORKER_ID.toUpperCase().indexOf(upperCaseFilter) >= 0) {
      return thisRow.APJ2_WORKER_ID.toUpperCase().indexOf(upperCaseFilter) >= 0
    }
    if (thisRow.APJ3_WORKER_ID && thisRow.APJ3_WORKER_ID.toUpperCase().indexOf(upperCaseFilter) >= 0) {
      return thisRow.APJ3_WORKER_ID.toUpperCase().indexOf(upperCaseFilter) >= 0
    }

    if (thisRow.ATTORNEY_WORKER_ID && thisRow.ATTORNEY_WORKER_ID.toUpperCase().indexOf(upperCaseFilter) >= 0) {
      return thisRow.ATTORNEY_WORKER_ID.toUpperCase().indexOf(upperCaseFilter) >= 0
    }

    return false;
  }

  function checkCaseAlertValue(row, filter) {

    if (row.PROCEEDING_TYPE_CT === 'TRIAL') {

      //Less than 90 days until a final decision is due
      if (row.DECISION_DUE_DAYS !== null && row.INSTITUTION_DECISION_DT !== null && row.PROCEEDING_STATUTORY_DT &&
        row.DECISION_DUE_DAYS < 90 &&
        row.DECISION_DUE_DAYS >= 30) {
        return filter === CONSTANTS.ALERTS.UPCOMING.value;
      }

      //Less than 30 days until a Final Decision is due
      if (row.DECISION_DUE_DAYS !== null && row.INSTITUTION_DECISION_DT !== null &&
        row.DECISION_DUE_DAYS < 30 &&
        row.DECISION_DUE_DAYS >= 0) {
        return filter === CONSTANTS.ALERTS.UPCOMING.value;
      }

      if (row.DECISION_DUE_DAYS !== null && row.INSTITUTION_DECISION_DT !== null && row.PROCEEDING_STATUTORY_DT !== null &&
        row.DECISION_DUE_DAYS < 0) {
        return filter === CONSTANTS.ALERTS.PAST_DUE.value;
      }


      if (row.DECISION_DUE_DAYS !== null && row.INSTITUTION_DECISION_DT === null && row.PROCEEDING_STATUTORY_DT !== null &&
        row.DECISION_DUE_DAYS < 60 &&
        row.DECISION_DUE_DAYS >= 30) {
        return filter === CONSTANTS.ALERTS.UPCOMING.value;
      }



      //Less than 60 days until an Institution Decision is due
      if (row.DECISION_DUE_DAYS !== null && row.INSTITUTION_DECISION_DT === null && row.PROCEEDING_STATUTORY_DT !== null &&
        row.DECISION_DUE_DAYS < 30 &&
        row.DECISION_DUE_DAYS >= 0) {
        return filter === CONSTANTS.ALERTS.UPCOMING.value;
      }


      if (row.DECISION_DUE_DAYS !== null && row.INSTITUTION_DECISION_DT === null && row.PROCEEDING_STATUTORY_DT !== null &&
        row.DECISION_DUE_DAYS < 0) {
        return filter === CONSTANTS.ALERTS.PAST_DUE.value;
      }

    } else {

      if (row.APPEAL_DECISION_DUE_DAYS !== null &&
        (row.PROCEEDING_STATE_NM !== 'Pending Disposal' && row.PROCEEDING_STATE_NM != 'Disposed') &&
        (row.APPEAL_DECISION_DUE_DAYS < 90 && row.APPEAL_DECISION_DUE_DAYS >= 45)) {
        return filter === CONSTANTS.ALERTS.UPCOMING.value;
      }


      if (row.APPEAL_DECISION_DUE_DAYS !== null &&
        (row.PROCEEDING_STATE_NM !== 'Pending Disposal' && row.PROCEEDING_STATE_NM != 'Disposed') &&
        (row.APPEAL_DECISION_DUE_DAYS < 45 && row.APPEAL_DECISION_DUE_DAYS >= 0)) {
        return filter === CONSTANTS.ALERTS.UPCOMING.value;
      }


      if (row.APPEAL_DECISION_DUE_DAYS !== null &&
        (row.PROCEEDING_STATE_NM !== 'Pending Disposal' && row.PROCEEDING_STATE_NM != 'Disposed') &&
        row.APPEAL_DECISION_DUE_DAYS < 0) {
        return filter === CONSTANTS.ALERTS.PAST_DUE.value;
      }
    }

    return (filter === CONSTANTS.ALERTS.NO_ALERTS.value);
  }


  function checkForBlanks(thisRow) {
    // Assignment docket judge objects
    var panel = (thisRow.appealPanelJudgeOne ? thisRow.appealPanelJudgeOne.toUpperCase().trim() : "");
    panel += (thisRow.appealPanelJudgeTwo ? thisRow.appealPanelJudgeTwo.toUpperCase().trim() : "");
    panel += (thisRow.appealPanelJudgeThree ? thisRow.appealPanelJudgeThree.toUpperCase().trim() : "");
    panel += (thisRow.ATTORNEY_WORKER_ID ? thisRow.ATTORNEY_WORKER_ID.toUpperCase().trim() : "");

    // View case docket docket judge objects
    panel += (thisRow.APJ1_WORKER_ID ? thisRow.APJ1_WORKER_ID.toUpperCase().trim() : "");
    panel += (thisRow.APJ2_WORKER_ID ? thisRow.APJ2_WORKER_ID.toUpperCase().trim() : "");
    panel += (thisRow.APJ3_WORKER_ID ? thisRow.APJ3_WORKER_ID.toUpperCase().trim() : "");
    panel += (thisRow.ATTORNEY_WORKER_ID ? thisRow.ATTORNEY_WORKER_ID.toUpperCase().trim() : "");
    return !panel;
  }


  function compareValue(filter, value, dateType, noSpecialCompare, columnName) {

    var filter1 = filter;
    var str = filter1;
    var result = /^(?!\[)\W*\d/.test(str);
    var result1 = /^[A-Za-z]/.test(str);
    var result2 = /(^[[A-Za-z]*]$)/.test(str);
    var result3 = /(^[[0-9]*\W[0-9]*]$)/.test(str);
    var result4 = /^(?!\[)\W*[A-Za-z0-9]/.test(str);
    var result5 = /^\W*\d/.test(str);
    var dateRangeFilter = /^(\[\s?[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}\s?[Tt][Oo]\s?([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}|\*)\s?\])/.test(str);


    if (!filter) {
      return true;
    }


    if (columnName.indexOf('alert') >= 0) {
      return checkAlertValue(filter, value);
    } else if (columnName.indexOf('APPEAL_SEQUENCE_NO') >= 0) {
      return checkCaseAlertValue(value, filter);
    }

    if (dateType === 'date') {
      if (filter.indexOf("[") === 0 && filter.indexOf("]") < 0) {
        return true;
      }
      if (dateRangeFilter) {
        var dateRange = filter.replace(" ", "").replace("[", "").replace("]", "").toUpperCase().replace("TO", "-");
        var rangedates = dateRange.split("-");
        var beginDate = rangedates[0];
        var endDate = rangedates[1];

        return compareDateRange(beginDate, endDate, value);

      } else if (result5) {
        return compareDateValue(filter, value, columnName);
      } else {
        return true;
      }
    }


    if ((result && !isNaN(value)) || (result1 && isNaN(value)) || result2 || result3 || result4) {

      return compareFilter(filter, value, noSpecialCompare);

    } else {
      return true;
    }
  }



  function compareDateRange(beginDate, endDate, dateValue) {
    beginDate = new Date(beginDate).setHours(0, 0, 0, 0);
    var value = new Date(dateValue);
    if (endDate.indexOf("*") < 0) {
      endDate = new Date(endDate).setHours(23, 59, 59, 999);

      return beginDate <= value && value <= endDate;
    } else
      return beginDate <= value || dateValue === null;


  }

  function compareLessThan(filter, value) {
    var filterValue = filter.substring(1);
    try {
      var intFilter = parseInt(filterValue);
      var intValue = parseInt(value);
      return (intValue < intFilter);
    } catch (error) {
      $log.info("filter or Value does not contain integer to compare less than" + error);
      return false;
    }
  }

  function compareAngles(filter, value) {
    if (filter.indexOf("<") === 0 && filter.indexOf(">") < 0 && filter.indexOf("=") < 0) {
      return compareLessThan(filter, value);
    }
    if (filter.indexOf("<") === 0 && filter.indexOf("=") === 1) {
      return compareLessThanEqual(filter, value);
    }

    return compareIsNotEquest(filter, value);
  }

  function compareIsNotEquest(filter, value) {
    if (filter.indexOf("*") === 0) {
      return compareEndsWith(filter, value);
    }

    if (filter.indexOf(">") === 0 && filter.indexOf("=") < 0) {
      return compareGreaterThan(filter, value);
    }
    if (filter.indexOf(">") === 0 && filter.indexOf("=") === 1) {
      return compareGreaterThanEqual(filter, value);
    }

    return compareNotEqualValues(filter, value);
  }

  function compareNotEqualValues(filter, value) {
    var hasTwoAngles = (filter.indexOf("<") === 0 && filter.indexOf(">") === 1);
    if (filter.indexOf("*") < 0 && (hasTwoAngles ||
        (filter.indexOf("!") === 0 && filter.indexOf("=") === 1))) {
      return compareNotEqual(filter, value);
    }
    return filterNotApplicable;
  }

  function compareFilter(filter, value, noSpecialCompare) {
    if (!noSpecialCompare) {
      var compareValue = compareAngles(filter, value);
      if (compareValue !== filterNotApplicable) {
        return compareValue;
      }
      var oddEven = compareOddEven(filter, value);
      if (oddEven !== filterNotApplicable) {
        return oddEven;
      }
      if (filter.indexOf("=") === 0) {
        return compareEqual(filter, value);
      }
    }
    return compareOtherFilters(filter, value, noSpecialCompare);
  }

  function compareOtherFilters(filter, value, noSpecialCompare) {
    if (!noSpecialCompare) {
      if (filter.indexOf("[") === 0 && filter.indexOf("-") === 2 && filter.indexOf("]") === 4) {
        return compareLastDigitRange(filter, value);
      }
      if (filter.indexOf("[") === 0 && filter.indexOf("-") === 3 && filter.indexOf("]") === 6) {
        return compareLastTwoDigitRange(filter, value);
      }
    }

    return compareFinalTypes(filter, value, noSpecialCompare);
  }

  function compareFinalTypes(filter, value, noSpecialCompare) {
    if (!noSpecialCompare) {
      if (filter.indexOf("*") === filter.length - 1 && (filter.indexOf("!") === 0 && filter.indexOf("=") === 1)) {
        return compareDoesNotStartsWith(filter, value);
      }
      if (filter.indexOf("*") === filter.length - 1) {
        return compareStartsWith(filter, value);
      }
    }
    return compareLikeText(filter, value);
  }

  function compareOddEven(filter, value) {
    if (filter.toUpperCase() === '[ODD]') {
      return compareEndsOddNumber(value);
    }
    if (filter.toUpperCase() === '[EVEN]') {
      return compareEndsEvenNumber(value);
    }
    return filterNotApplicable;
  }

  function compareEqualDateValue(filter, filterValue, value) {
    if (filter.indexOf("<=") === 0) {
      if (value <= filterValue) {
        return true;
      }
      return false;
    } else if (filter.indexOf(">=") === 0) {
      if (value >= filterValue) {
        return true;
      }
      return false;
    }

    return filterNotApplicable;
  }

  function compareDateValue(filter, value1, columnName) {
    var date;
    // var value = new Date(parseInt(value1));
    var value = new Date(value1);
    if (filter.indexOf("=") === 1) {
      return compareEqualDateValue(filter, value);
    }
    if (filter.indexOf("<") === 0) {
      date = new Date(filter.substring(1));
      return value < date;
    } else if (filter.indexOf(">") === 0) {
      date = new Date(filter.substring(1));
      return value > date;
    }



    var dateCompare = compareEqualDateValue(filter, value);

    if (dateCompare !== filterNotApplicable) {
      return dateCompare;
    }
    var strDate;
    // If the date is a last modified user then we display a time and we need to compare that
    if (columnName !== 'LAST_MODIFIED_TS') {
      strDate = $filter('date')(value, "MM/dd/yyyy ");
    } else {
      strDate = $filter('date')(value, "MM/dd/yyyy hh:mm:ss a");
    }
    return compareFilter(filter, strDate);
  }

  function compareLikeText(filter, value) {
    var upperCaseValue;
    var upperCaseFilter;
    if (!value && value !== 0) {
      return false;
    }
    if (angular.isNumber(value) && !angular.isArray(value)) {
      upperCaseValue = value.toString().toUpperCase();
    } else {
      if (angular.isDefined(value) && value !== "" && !angular.isArray(value)) {
        upperCaseValue = value.toUpperCase();
      } else {
        upperCaseValue = value;
      }
    }
    if (angular.isNumber(filter)) {
      upperCaseFilter = filter.toString().toUpperCase();
    } else {
      upperCaseFilter = filter.toUpperCase();
    }
    if (angular.isArray(upperCaseValue)) {
      angular.forEach(upperCaseValue, function (currentValue) {
        if (currentValue.indexOf(upperCaseFilter) >= 0) {
          return upperCaseValue;
        }
      });
    } else {
      return upperCaseValue.indexOf(upperCaseFilter) >= 0;
    }
  }

  function compareStartsWith(filter, value) {
    var upperCaseValue;
    var upperCaseFilter;
    if (!value && value !== 0) {
      return false;
    }
    if (angular.isNumber(value)) {
      upperCaseValue = value.toString().toUpperCase();
    } else {
      upperCaseValue = value.toUpperCase();
    }
    if (angular.isNumber(filter)) {
      upperCaseFilter = filter.toString().toUpperCase().substring(0, filter.length - 1);
    } else {
      upperCaseFilter = filter.toUpperCase().substring(0, filter.length - 1);
    }

    return upperCaseValue.indexOf(upperCaseFilter) === 0;
  }

  function compareEndsWith(filter, value) {
    var upperCaseValue;
    var upperCaseFilter;
    if (!value && value !== 0) {
      return false;
    }
    if (angular.isNumber(value)) {
      upperCaseValue = value.toString().toUpperCase();
    } else {
      upperCaseValue = value.toUpperCase();
    }
    if (angular.isNumber(filter)) {
      upperCaseFilter = filter.toString().toUpperCase().substring(1);
    } else {
      upperCaseFilter = filter.toUpperCase().substring(1);
    }
    return upperCaseValue.indexOf(upperCaseFilter, upperCaseValue.length - upperCaseFilter.length) !== -1;
  }

  function compareLessThanEqual(filter, value) {
    var filterValue = filter.substring(2);
    try {
      var intFilter = parseInt(filterValue);
      var intValue = parseInt(value);
      return (intValue <= intFilter);
    } catch (error) {
      $log.info("filter or Value does not contain integer to compare less than" + error);
      return false;
    }
  }

  function compareGreaterThan(filter, value) {
    var filterValue = filter.substring(1);
    try {
      var intFilter = parseInt(filterValue);
      var intValue = parseInt(value);
      return (intValue > intFilter);
    } catch (error) {
      $log.info("filter or Value does not contain integer to compare less than" + error);
      return false;
    }
  }

  function compareGreaterThanEqual(filter, value) {
    var filterValue = filter.substring(2);
    try {
      var intFilter = parseInt(filterValue);
      var intValue = parseInt(value);
      return (intValue >= intFilter);
    } catch (error) {
      $log.info("filter or Value does not contain integer to compare less than" + error);
      return false;
    }
  }

  function compareNotEqual(filter, value) {
    var filterValue = filter.substring(2);
    var intFilter;
    var valueParse;
    try {
      intFilter = parseInt(filterValue);
      if (isNaN(intFilter)) {
        intFilter = filterValue.toUpperCase().trim();
      }
    } catch (error) {
      $log.info("Not a number");
    }
    try {
      valueParse = parseInt(value);
      if (isNaN(valueParse)) {
        valueParse = value.toUpperCase().trim();
      }
    } catch (error) {
      $log.info("Not a number");
      valueParse = value;
    }

    try {

      return (intFilter !== valueParse);
    } catch (error) {
      $log.info("filter or Value does not contain integer to compare less than" + error);
      return false;
    }
  }

  function compareEqual(filter, value) {
    var filterValue = filter.substring(1);
    try {
      return (filterValue == value);
    } catch (error) {
      $log.info("filter or Value does not contain integer to compare less than" + error);
      return false;
    }
  }

  function compareDoesNotStartsWith(filter, value) {
    var upperCaseValue;
    var upperCaseFilter;
    if (!value && value !== 0) {
      return false;
    }
    if (angular.isNumber(value)) {
      upperCaseValue = value.toString().toUpperCase();
    } else {
      upperCaseValue = value.toUpperCase();
    }
    filter = filter.substring(2);
    if (angular.isNumber(filter)) {
      upperCaseFilter = filter.toString().toUpperCase().substring(0, filter.length - 1);
    } else {
      upperCaseFilter = filter.toUpperCase().substring(0, filter.length - 1);
    }

    return upperCaseValue.indexOf(upperCaseFilter) !== 0;
  }

  function compareEndsOddNumber(value) {
    try {
      var intValue = parseInt(value);
      return (intValue % 2 === 1);
    } catch (error) {
      $log.info("Value does not contain integer to compare odd numbers" + error);
      return false;
    }
  }

  function compareEndsEvenNumber(value) {
    try {
      var intValue = parseInt(value);
      return (intValue % 2 === 0);
    } catch (error) {
      $log.info("Value does not contain integer to compare even numbers" + error);
      return false;
    }
  }

  function compareLastDigitRange(filter, value) {
    if (!value && value !== 0) {
      return false;
    }
    var lowerRange = filter.substring(1, filter.indexOf('-'));
    var upperRange = filter.substring(filter.indexOf('-') + 1, filter.length - 1);
    var valueString = value.toString().substring(value.toString().length - 1);
    try {
      var intValue = parseInt(valueString);
      var intLowerRange = parseInt(lowerRange);
      var intUpperRange = parseInt(upperRange);
      return (intValue >= intLowerRange && intValue <= intUpperRange);
    } catch (error) {
      $log.info("Filter or Value does not contain integer to compare range" + error);
      return false;
    }
  }

  function compareLastTwoDigitRange(filter, value) {
    if (!value && value !== 0) {
      return false;
    }
    var lowerRange = filter.substring(1, filter.indexOf('-'));
    var upperRange = filter.substring(filter.indexOf('-') + 1, filter.length - 1);
    var valueString = value.toString().substring(value.toString().length - 2);
    try {
      var intValue = parseInt(valueString);
      var intLowerRange = parseInt(lowerRange);
      var intUpperRange = parseInt(upperRange);
      return (intValue >= intLowerRange && intValue <= intUpperRange);
    } catch (error) {
      $log.info("Value does not contain integer to compare even numbers" + error);
      return false;
    }
  }

  return searchHelperService;
});
