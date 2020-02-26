'use strict';
/**
 * The file add/updates the Point of Contact for a Tech Center
 */
angular.module('ptabe2e').controller('EditSessionController', function ($scope, ngDialog, items, $log, HttpFactory, $timeout, $window, CONSTANTS) {

  var vm = this;
  vm.appealNumber = items;
  vm.specialHearingType = {};

  $timeout(function () {
    document.getElementById('calendarNumber').focus();
  }, 500);

  vm.enternohData = function () {
    HttpFactory.getActions(CONSTANTS.URL.ENOH + "appealNumber=" + vm.appealNumber)
      .then(function (successResponse) {
          vm.eroh = successResponse.data;
          vm.specialHearingType.selectedStatusType = successResponse.data.specialTypeIndicator;
          vm.specialHearingType.selectedStatusDisplay = successResponse.data.specialTypeDescription;
        },
        function (failureResponse) {
          $log.info(failureResponse);
        });
  };
  vm.enternohData();

  vm.specialHearing = function () {
    HttpFactory.getActions(CONSTANTS.URL.SPECIALSTATUSNOH)
      .then(function (successResponse) {
          vm.special = successResponse.data;
        },
        function (failureResponse) {
          $log.info(failureResponse);
        });
  };
  vm.specialHearing();

  vm.setSelectedSpecialType = function (selectedSpecialType, selectedSpecialDisplay) {
    vm.specialHearingType.selectedStatusType = selectedSpecialType;
    vm.specialHearingType.selectedStatusDisplay = selectedSpecialDisplay;

  };

  /* istanbul ignore next*/
  vm.submitResponse = function () {
    var dataValid = vm.checkCalendertx();
    if (dataValid) {
      vm.eroh.specialTypeIndicator = vm.specialHearingType.selectedStatusType;
      vm.hearingRoomRoster = vm.eroh;
      var data = {
        "hearingRoomRoster": vm.hearingRoomRoster
      };

      HttpFactory.putActions(CONSTANTS.URL.SUBMITENOH, data)
        .then(function (successResponse) {
          closeSaveDialog(1);

        }, function (failureResponse) {
          closeSaveDialog(1);
        });
    }


  };

  vm.checkCalendertx = function () {
    if (angular.isUndefined(vm.eroh.calendarNumber) || vm.eroh.calendarNumber === null || vm.eroh.calendarNumber === "") {
      vm.showErrorMsgTitletx = true;
      vm.errorMessageTitletx = "Calendar number must be zero or greater.";
      vm.readyToSaveTitle = false;
      return vm.readyToSaveTitle;
    }
    vm.showErrorMsgTitletx = false;
    vm.readyToSaveTitle = true;
    return vm.readyToSaveTitle;

  };

  /* istanbul ignore next*/
  function closeSaveDialog(popupsToClose) {
    var openDialogs = ngDialog.getOpenDialogs();
    if (openDialogs.length > 1) {
      ngDialog.close(openDialogs[openDialogs.length - popupsToClose], true);
    } else {
      ngDialog.closeAll(true);
    }
  }

});
