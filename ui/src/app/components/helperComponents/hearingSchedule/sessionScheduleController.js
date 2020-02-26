'use strict';
/**
 * The file add/updates the Point of Contact for a Tech Center
 */
angular.module('ptabe2e').controller('SessionScheduleController', function ($timeout, $scope, ngDialog, $log, sessionData, HttpFactory, $window, CONSTANTS, $filter) {

  var vm = this;
  vm.sessionDetailsData = sessionData;
  vm.disablePrint = true;
  /* istanbul ignore next*/
  vm.getSessionData = function () {
    $scope.isLoading = true;
    HttpFactory.getActions(CONSTANTS.URL.WEEKLYSCHEDULES + "?sessionDate=" + vm.sessionDetailsData.sessionDate / 1000 + "&locationIdentifier=" +
        vm.sessionDetailsData.locationIdentifier + "&hearingTime=" + vm.sessionDetailsData.hearingTime)
      .then(function (successResponse) {
          $scope.isLoading = false;
          vm.sessionUsedData = successResponse.data;
          vm.sessioncontentData = successResponse.data[0].hearingSchdules;
          vm.newSessionArray = vm.sessioncontentData.filter(function (el) {
            return el.status === 'Confirmed - Video hearing' || el.status === 'Confirmed - Telephonic hearing' ||
              el.status === 'Telephonic hearing request granted' || el.status === 'Telephonic hearing request denied' ||
              el.status === 'Video hearing request granted' || el.status === 'Video hearing request denied' ||
              el.status === 'Confirmed - In-person hearing' || el.status === 'Hearing Postponement Denied';
          });
          vm.newSortedSessionArray = vm.newSessionArray.sort(function (a, b) {
            return a.calendarNumber - b.calendarNumber;
          });

          vm.newHearingData = [];

          for (var i = 0; i < vm.newSortedSessionArray.length; i++) {
            vm.userData = {};
            vm.userData.calendarNumber = vm.newSortedSessionArray[i].calendarNumber;
            vm.userData.appealNumber = vm.newSortedSessionArray[i].appealNumber;
            vm.userData.appellants = vm.newSortedSessionArray[i].appellants;
            vm.userData.counselFullName = vm.newSortedSessionArray[i].counselFullName;
            vm.userData.disciplineText = vm.newSortedSessionArray[i].disciplineText;
            if (vm.newSortedSessionArray[i].status === 'Confirmed - Video hearing') {
              vm.userData.status = 'Video';
            } else if (vm.newSortedSessionArray[i].status === 'Confirmed - Telephonic hearing') {
              vm.userData.status = 'Telephonic';
            } else if (vm.newSortedSessionArray[i].status === 'Telephonic hearing request granted') {
              vm.userData.status = 'Telephonic';
            } else if (vm.newSortedSessionArray[i].status === 'Video hearing request granted') {
              vm.userData.status = 'Video';
            } else {
              vm.userData.status = '';
            }

            if (vm.newSortedSessionArray[i].publication === 'Public') {
              vm.userData.publication = 'Yes';
            } else {
              vm.userData.publication = 'No';
            }
            if (i != vm.newSortedSessionArray.length - 1) {
              if (vm.differentPanel(vm.newSortedSessionArray[i].panels, vm.newSortedSessionArray[i + 1].panels)) {
                vm.userData.panels = vm.newSortedSessionArray[i].panels;
              }
            } else {
              vm.userData.panels = vm.newSortedSessionArray[i].panels;
            }
            vm.newHearingData.push(vm.userData);
          }
          $log.info(vm.newHearingData);
        },
        function (failureResponse) {
          $log.info(failureResponse);
        });

  };

  /* istanbul ignore next*/
  vm.differentPanel = function (a, b) {
    var idsA = a.map(function (x) {
      return x.apjName;
    }).sort();
    var idsB = b.map(function (x) {
      return x.apjName;
    }).sort();
    return (idsA.join(',') !== idsB.join(','));
  };
  vm.convertDateToHuenFormat = function (dateInLong) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var convertedDate = new Date(dateInLong);
    vm.convertedDateMonth = convertedDate.getMonth();
    vm.monthName = months[convertedDate.getMonth()];
    vm.convertedDateDay = convertedDate.getDay();
    vm.dayName = days[vm.convertedDateDay];
    vm.year = convertedDate.getFullYear();
    vm.convertedDateDate = convertedDate.getDate();
    vm.timeInhumanReadbleForamt = vm.dayName + " " + vm.monthName + " " + vm.convertedDateDate + ", " + vm.year + " ";
  };
  vm.convertDateToHuenFormat(vm.sessionDetailsData.sessionDate);

  vm.date = new Date();
  vm.rooms = [];
  vm.rooms.push("Abandoned");
  vm.rooms.push("Appearance made");
  vm.rooms.push("Awaiting response to NOH");
  vm.rooms.push("Confirmed - In-person hearing");
  vm.rooms.push("Confirmed - Telephonic hearing");
  vm.rooms.push("Confirmed - Video hearing");
  vm.rooms.push("Dismissed");
  vm.rooms.push("Hearing postponment denied");
  vm.rooms.push("Hearing postponment granted");
  vm.rooms.push("Hearing postponement requested");
  vm.rooms.push("Hearing vacated");
  vm.rooms.push("No show");
  vm.rooms.push("Other");
  vm.rooms.push("Pending NOH upload/mailing");



  vm.rooms.push("Waived");

  $log.info("got here");

  vm.dialogData = $scope.ngDialogData;
  $scope.myAssigne = {
    assignees: []
  };

  // $scope.myAssigne.assignees.push("John Paul");
  /*istanbul ignore next: timeout error */
  vm.showDateSelection = function () {
    ngDialog.open({
      template: 'app/components/helperComponents/hearingSchedule/hearingRoomPicker.html',
      controller: 'HearingRoomPickerController',
      controllerAs: 'vm',
      width: '15%',
      showClose: false,
      closeByEscape: false,
      closeByDocument: false,
      resolve: {
        items: function () {
          return vm.announcement;
        }
      }
    }).closePromise.then(function () {
      vm.announcement.flag = null;
      $log.info("closed add new announcement module before timeout");
      $timeout(vm.getAllAnnouncements, 700);
      $log.info("closed add new announcement module after timeout");
    });


  };
  /*istanbul ignore next: timeout error */
  vm.showRoomPicker = function () {
    ngDialog.open({
      template: 'app/components/helperComponents/hearingSchedule/hearingRoomPicker.html',
      controller: 'HearingRoomPickerController',
      controllerAs: 'vm',
      width: '20%',
      showClose: false,
      closeByEscape: false,
      closeByDocument: false,
      resolve: {
        items: function () {
          return;
        }
      }
    }).closePromise.then(function () {
      vm.announcement.flag = null;
      $log.info("closed add new announcement module before timeout");
      $timeout(vm.getAllAnnouncements, 700);
      $log.info("closed add new announcement module after timeout");
    });

  };

  vm.printSchedule = function () {
    ngDialog.open({
      template: 'app/components/helperComponents/hearingSchedule/printSchedule.html',
      width: '60%',
      showClose: false,
      closeByEscape: false,
      closeByDocument: false,
    });
  };

  vm.printDiv = function (divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var popupWin = window.open('', '_blank', 'width=1500,height=1000');
    popupWin.document.open();
    popupWin.document.write(
      '<html><head><style>table { border-collapse: collapse; width: 100%;} @media print{th, td { text-align: left; padding: 8px;}label { display: inline-block; max-width: 100%; margin-bottom: 5px; font-weight: bold;}}@media print' +
      '{tr.vendorListHeading { background-color: #e9eaeb !important; -webkit-print-color-adjust: exact;}}.col-print-1 {width:8%;  float:left;}.col-print-2 {width:16%; float:left;}.col-print-6 {width:50%; float:left;}.col-print-9' +
      '{width:75%; float:left;}.col-print-12{width:100%; float:left;}</style></head><body onload="window.print()">'
    );
    popupWin.document.write('<h2 style="text-align: center;">Patent Trial and Appeal Board</h2><h3 style="text-align: center;">Hearing docket</h3>');
    popupWin.document.write(printContents);
    popupWin.document.write('</body></html>');
    popupWin.document.close();
  };

  /*istanbul ignore next */
  vm.editHearingSchedule = function (appealNumber) {
    ngDialog.open({
      template: 'app/components/helperComponents/hearingSchedule/editSessionSchedule.html',
      controller: 'EditSessionController',
      controllerAs: 'vm',
      width: '60%',
      showClose: false,
      closeByEscape: false,
      closeByDocument: false,
      resolve: {
        items: function () {
          return appealNumber;
        }
      }
    }).closePromise.then(function (checkTargetId) {

      vm.getSessionData();

    }, function () {
      // intentional
    });
  };
  vm.openCaseViewer = function (serialNumber, appealNumber) {
    $window.open("#/caseViewer/" + serialNumber + "/" + appealNumber);
  };
  vm.multiSelectSettings = {
    scrollableHeight: '400px',
    scrollable: true,
    externalIdProp: '',
    showCheckAll: true,
    showUncheckAll: true
  };
  /* istanbul ignore next*/
  vm.getUshers = function () {
    HttpFactory.getActions(CONSTANTS.URL.PANELADMINISTRATORS + "identifier=UsherUsers")
      .then(function (successResponse) {
        vm.usherDataList = successResponse.data;
        vm.usherList = successResponse.data.assigneeFullNameText;
      }, function (failureResponse) {
        $log.info(failureResponse);
      });
  };
  vm.getUshers();
  /* istanbul ignore next*/
  vm.setSelectedUsher = function (usherName) {

    vm.slectedUsher = usherName;
    vm.disablePrint = false;
  };




});
