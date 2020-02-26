(function () {
  'use strict';

  angular
    .module('ptabe2e')
    .controller('NoCirculationController', function (ngDialog) {
      var vm = this;

      vm.closeCurrentDialog = function () {
        ngDialog.close(lastDialog(), false);
      };

      function lastDialog() {
        var openDialogs = ngDialog.getOpenDialogs();
        return openDialogs[openDialogs.length - 1];
      }

    });
})();
