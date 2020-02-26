(function () {
  "use strict";

  angular
    .module('ptabe2e')
    .controller('DateRangeController', function (ngDialog, $scope, $rootScope, items) {
      var vm = this;
      vm.startDate = null;
      vm.endDate = null;
      vm.payPeriod = null;
      vm.items = items;
      $scope.showErrorMessage = false;
      $scope.noPastdateValidation = true;
      $scope.isParalegal = $rootScope.userInfo.roleDescription.toUpperCase().indexOf('PARALEGALS') > -1;
      /* istanbul ignore next*/

      vm.confirm = function () {
        if (vm.items == 'PAYPERIOD') {
          ngDialog.closeAll(vm.payPeriod);
        } else {
          if (vm.startDate == null || vm.endDate == null) {
            $scope.showErrorMessage = true;
            $scope.errorMessage = "Please provide valid start date and end date.";
            return;
          } else if ((angular.equals(vm.startDate, vm.endDate)) || ((new Date(vm.endDate).getTime()) <= (new Date(vm.startDate).getTime()))) {
            $scope.errorMessage = "End date should be after start date.";
            $scope.showErrorMessage = true;
            return;
          }
          $scope.Dates = {
            startDate: vm.startDate,
            endDate: vm.endDate
          };
          ngDialog.closeAll($scope.Dates);
        }
      };
    });
})();
