'use strict';
/**
 * The file add/updates the Point of Contact for a Tech Center
 */
angular.module('ptabe2e').controller('HearingRoomPickerController', function ($scope, ngDialog, $log, HttpFactory, $timeout, CONSTANTS) {

  var vm = this;
  vm.dialogData = $scope.ngDialogData;
  $scope.openSession = true;
  $scope.disableTime = true;
  $scope.disableRoom = true;
  $scope.noPastdateValidation = true;

  $timeout(function () {
    document.getElementById('hearingRoomDate').focus();
  }, 500);

  var utcSeconds = new Date().getTime() / 1000;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  vm.sessionDate = d;
  /* istanbul ignore next*/
  vm.validateBusinnessdateSelected = function () {
    $timeout(function () {
      if (vm.sessionDate) {
        return HttpFactory.getActions(CONSTANTS.URL.HOLIDAYCHECKS + "selectedDate=" + vm.sessionDate.getTime())
          .then(function (successResponse) {
              var ResponseDate = successResponse;
              if (ResponseDate.data.isValid !== true) {
                ngDialog.open({
                  template: 'app/components/helperComponents/hearingSchedule/sessionBussinessDate.html',
                  scope: $scope,
                  width: '25%',
                  showClose: false,
                  closeByEscape: false,
                  closeByDocument: false,
                });
                vm.locationName = "";
                vm.selectedTime = "";
                $scope.openSession = true;
                $scope.disableTime = true;
                $scope.disableRoom = true;

              } else {
                vm.getSessionData();
              }

              return successResponse;
            },
            function (failureResponse) {
              return failureResponse;
            });
      } else {
        vm.locationName = "";
        vm.selectedTime = "";
        $scope.openSession = true;
        $scope.disableTime = true;
        $scope.disableRoom = true;
      }
    }, 200);

  };
  vm.validateBusinnessdateSelected();


  vm.getSessionData = function () {
    HttpFactory.getActions(CONSTANTS.URL.WEEKLYSCHEDULES + "?sessionDate=" + vm.sessionDate.getTime() / 1000)
      .then(function (successResponse) {
          vm.sessionData = successResponse.data;
          $scope.disableRoom = false;
        },
        function (failureResponse) {
          $log.info(failureResponse);

        });

  };
  vm.times = [];
  /* istanbul ignore next*/
  vm.setSelectedRoom = function (content) {
    $scope.disableTime = false;
    vm.getDistinctAssignmentTypes(content);
    vm.locationIdentifier = content.locationIdentifier;
    vm.locationName = content.locationDescription;
  };

  vm.setSelectedTime = function (datanoe) {
    $scope.openSession = false;
    vm.selectedTime = datanoe;
  };
  /*istanbul ignore next*/
  vm.getDistinctAssignmentTypes = function (data) {
    var lookup = {};

    var items = data.hearingSchdules;

    $scope.assignmentTypes = [];

    for (var item, i = 0; item = items[i++];) {
      var assignmentType = item.hearingTime;
      if (!(assignmentType in lookup)) {
        lookup[assignmentType] = 1;
        $scope.assignmentTypes.push(assignmentType);

      }


    }


  };

  /* istanbul ignore next*/
  vm.showSessionSchedule = function () {
    $scope.sessionDetailsData = {
      "sessionDate": vm.sessionDate.getTime(),
      "locationIdentifier": vm.locationIdentifier,
      "hearingTime": vm.selectedTime
    };
    ngDialog.closeAll();
    ngDialog.open({
      template: 'app/components/helperComponents/hearingSchedule/sessionSchedule.html',
      controller: 'SessionScheduleController',
      controllerAs: 'vm',
      width: '80%',
      showClose: false,
      closeByEscape: false,
      closeByDocument: false,
      resolve: {
        sessionData: function () {
          return $scope.sessionDetailsData;
        }
      }
    }).closePromise.then(function () {
      //intentional
    });

  };

}).filter('split', function () {
  return function (input, splitChar, splitIndex) {
    // do some bounds checking here to ensure it has that index
    return input.split(splitChar)[splitIndex];
  };
});
