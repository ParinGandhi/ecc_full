'use strict';
/**
 * Date picker controller.  This is an angular element directive
 */
angular.module('ptabe2e').controller(
  'datePickerDirectiveController',
  function ($scope, $filter, ngDialog) {
    var vm = this;
    vm.previousDate = vm.selectedDate;
    /* istanbul ignore next */
    $scope.change = function (e) {
      var thisValue = document.getElementById(vm.dateId).value;
      var numChars = thisValue.length;
      var dateParts = thisValue.split('/');
      if (dateParts.length > 2) {
        return;
      }
      if (numChars === 2 || numChars === 5) {
        document.getElementById(vm.dateId).value += '/';
      }
    };

    $scope.today = function () {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      showWeeks: false,
      minDate: new Date()
    };

    $scope.toggleMin = function () {

      if (vm.minimumDate === 'today') {
        $scope.inlineOptions.minDate = new Date();
      } else {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      }
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['MM/dd/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];
    /* istanbul ignore next */
    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }
    /* istanbul ignore next */
    vm.togglePopup = function ($event, newValue) {
      $event.preventDefault();
      $event.stopPropagation();
      /* if there is a closeAllDatePicker method in parent scope then
     call. Otherwise, don't call */
      if (!!$scope.$parent.vm.closeAllDatePicker) {
        $scope.$parent.vm.closeAllDatePicker();
      }
      if (newValue === true || newValue === false) {
        vm.isDatepickerOpen = newValue;
      } else {
        vm.isDatepickerOpen = !vm.isDatepickerOpen;
      }
    };

    vm.onChange = function () {
      /* istanbul ignore if */
      if (vm.onDateChanged) {
        vm.onDateChanged(vm.selectedDate);
      }
    };

    vm.onCustomDisabled = function () {
      if (vm.customDisabled) {
        return true;
      }
      return false;
    };
    /* istanbul ignore next */
    vm.onBlur = function () {
      if (vm.selectedDate) {
        if (!vm.pastDate) {
          processSelectedDate();
        } else {
          if (vm.onDateBlur) {
            vm.onDateBlur();
          }
        }
      } else {
        if (vm.onDateBlur) {
          vm.onDateBlur();

        }
      }
    };
    /* istanbul ignore next*/
    function processSelectedDate() {
      var selectedDate = new Date(vm.selectedDate);
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        openDatePassedDialog();
      } else {
        if (vm.onDateBlur) {
          vm.onDateBlur();
        }
      }
    }
    /* istanbul ignore next*/
    function openDatePassedDialog() {
      ngDialog.openConfirm({
        template: 'app/components/helperComponents/datepicker/datePastDialog.html',
        controller: 'ConfirmManagePastDateController',
        controllerAs: 'vm',
        width: '25%',
        showClose: false,
        closeByEscape: false,
        closeByDocument: false
      }).then(function () {
        if (vm.onDateBlur) {
          vm.onDateBlur();
        }
      }, function () {
        if (vm.previousDate == null) {
          vm.selectedDate = "";
        } else {
          vm.selectedDate = new Date(vm.previousDate).setHours(0, 0, 0, 0);
        }
      });
    }

    vm.formats = ['MM/dd/yy', 'MM/dd/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    vm.format = vm.formats[1];

    vm.dateOptions = {
      showWeeks: false
    };

  });
