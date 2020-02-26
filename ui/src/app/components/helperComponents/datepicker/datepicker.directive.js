'use strict';
/**
 * Date picker directive.  Displays pop-up calendar
 */
angular.module('ptabe2e').directive('datePicker', function () {

  return {
    restrict: 'E',
    templateUrl: 'app/components/helperComponents/datepicker/datepicker.html',
    scope: {
      dateId: "=",
      copyDateTo: '=?',
      selectedDate: '=',
      minimumDate: '=?',
      maximumDate: "=?",
      ageValidate: '&',
      errorDescribedby: '=?',
      isDatepickerOpen: '=?',
      readOnly: "=?",
      onDateChanged: "=?",
      pastDate: "=?",
      customDisabled:"=?",
	  customClass:"=?",
      onDateBlur:"=?",
      customName:"=?"


    },
    controller: 'datePickerDirectiveController',
    controllerAs: 'vm',
    bindToController: true
  };

});
