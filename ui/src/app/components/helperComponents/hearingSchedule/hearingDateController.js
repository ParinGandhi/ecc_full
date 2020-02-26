'use strict';
/**
 * The file add/updates the Point of Contact for a Tech Center
 */
angular.module('ptabe2e').controller('HearingDateController', function ($scope, ngDialog, $timeout, $window, hearingData) {

  var vm = this;
  vm.dialogData = $scope.ngDialogData;
  $scope.hearingData = hearingData;

  /* istanbul ignore next*/
  $timeout(function () {
    document.getElementById('reportFromDate').focus();
  }, 500);
  $scope.hearingDateTime = null;

  /* istanbul ignore next*/
  vm.openHearingSchedule = function () {
    if ($scope.hearingData) {
      $window.open("#/hearingSchedule/" + $scope.hearingDateTime.getTime() / 1000);
    }
    ngDialog.closeAll($scope.hearingDateTime);
  };
});
