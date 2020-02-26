'use strict';
/**
 * The file add/updates the Point of Contact for a Tech Center
 */
angular.module('ptabe2e').controller('HearingScheduleController', function ($scope, ngDialog, $window, $log, $timeout, $route, HttpFactory, CONSTANTS) {

  var vm = this;
  var workerNumber;
  window.document.title = "View Weekly Hearing Docket";
  ngDialog.closeAll();

  vm.loadHearingSchedule = function (userInfo) {
    // workerNumber = $window.sessionStorage.getItem("workerNumber");

    workerNumber = userInfo.appUserInfo[0].loginId;
    $scope.workerNumber = workerNumber;
    $scope.userInfo = {
      "userId": userInfo.appUserInfo[0].userIdentiifier,
      "loginId": userInfo.appUserInfo[0].loginId
    };

    /* istanbul ignore if */
    // if (workerNumber === null || undefined) {
    //   if ($window.parent != null) {
    //     workerNumber = $window.opener.userInfo.userId;
    //     $window.sessionStorage.setItem("workerNumber", workerNumber);
    //   } else {
    //     workerNumber = $window.sessionStorage.getItem("workerNumber");
    //   }
    // }
    vm.workerNumber = workerNumber;

    vm.dialogData = $scope.ngDialogData;
    vm.viewWeek = "current";
    vm.hearingStartDateTime = $route.current.params.hearingdate;

    var utcSeonds = vm.hearingStartDateTime;
    var dopn = new Date(0);
    dopn.setUTCSeconds(utcSeonds);
    vm.hearingStartDate = dopn;


    /* istanbul ignore next */
    vm.previousWeekChanged = function () {
      var previousWeek = new Date(vm.monday);
      previousWeek.setDate(vm.monday.getDate() - 7);
      vm.hearingStartDate = previousWeek;
      vm.getWeekDates();
    };
    /* istanbul ignore next */
    vm.dateChanged = function (newDate) {
      if (angular.isDefined(newDate) && newDate !== null) {
        vm.hearingStartDate = newDate;
      }
      vm.getWeekDates();
    };
    /* istanbul ignore next */
    vm.weekChanged = function () {
      var nextWeek = new Date(vm.monday);
      nextWeek.setDate(vm.monday.getDate() + 7);
      vm.hearingStartDate = nextWeek;
      vm.getWeekDates();
    };


    /* istanbul ignore next */
    vm.openSessionSchedule = function (data, locationIdentifier) {
      $scope.sessionDetailsData = {
        "sessionDate": data.hearingDate,
        "locationIdentifier": locationIdentifier,
        "hearingTime": data.hearingTime
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


    vm.getWeekDates = function () {
      function getMonday(date) {
        var day = date.getDay() || 7;
        if (day !== 1)
          date.setHours(-24 * (day - 1));
        return date;
      }
      var utcSeconds = new Date(vm.hearingStartDate).getTime() / 1000;
      var d = new Date(0);
      d.setUTCSeconds(utcSeconds);
      vm.monday = getMonday(d);
      vm.mondayTime = vm.monday.getTime();
      var dayname = vm.monday.getDate();
      var monthname = vm.monday.getMonth() + 1;
      var tuesday = new Date(vm.monday);
      tuesday.setDate(vm.monday.getDate() + 1);
      vm.tuesday = tuesday.getTime();
      var wednesday = new Date(vm.monday);
      wednesday.setDate(vm.monday.getDate() + 2);
      vm.wednesday = wednesday.getTime();
      var thursday = new Date(vm.monday);
      thursday.setDate(vm.monday.getDate() + 3);
      vm.thursday = thursday.getTime();
      var friday = new Date(vm.monday);
      friday.setDate(vm.monday.getDate() + 4);
      vm.friday = friday;
      vm.fridayTime = friday.getTime();
      vm.diaplayMonday = monthname + "/" + dayname;
      vm.diaplayTuesday = tuesday.getMonth() + 1 + "/" + tuesday.getDate();
      vm.diaplayWednesday = wednesday.getMonth() + 1 + "/" + wednesday.getDate();
      vm.diaplayThursday = thursday.getMonth() + 1 + "/" + thursday.getDate();
      vm.diaplayFriday = friday.getMonth() + 1 + "/" + friday.getDate();
      vm.getWeekleyData(vm.monday);
    };


    vm.getWeekleyData = function (heatingDate) {
      $scope.isLoading = true;
      HttpFactory.getActions(CONSTANTS.URL.WEEKLYSCHEDULES + "?hearingDate=" + heatingDate.getTime() / 1000)
        // $http.get('app/components/helperComponents/hearingSchedule/sasi.json')
        .then(function (successResponse) {
            $scope.hearingData = successResponse.data;
            $scope.isLoading = false;
          },
          function (failureResponse) {
            $scope.isLoading = false;
            $log.info(failureResponse);
          });

    };
    vm.getWeekDates();

    vm.openCaseViewer = function (serialNumber, appealNumber) {
      $window.open("#/caseViewer/" + serialNumber + "/" + appealNumber);
    };


    window.onbeforeunload = closingCode;
    /* istanbul ignore next */
    function closingCode() {
      vm.workerNumber = $window.sessionStorage.removeItem("workerNumber");
    }
  };

}).filter('unique', function () {
  return function (collection, keyname) {
    var output = [],
      keys = [];
    angular.forEach(collection, function (item) {
      var key = item[keyname];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item);
      }
    });
    return output;
  };
});
