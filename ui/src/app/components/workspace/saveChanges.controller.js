(function () {
  'use strict';

  angular
    .module('ptabe2e')
    .controller('saveChangesController', function (ngDialog, $scope, $timeout, flags) {
      var vm = this;
      vm.setCancel = flags.setCancel;
      var mainScope = angular.element(document.getElementById('mainTabId')).scope();

      /**
       * Function to close the announcement dialog
       * @param {*} popupsToClose - number of popups to close
       */
      function closeAnnouncementDialog(popupsToClose) {
        var openDialogs = ngDialog.getOpenDialogs();
        if (openDialogs.length > 1) {
          ngDialog.close(openDialogs[openDialogs.length - popupsToClose]);
        } else {
          ngDialog.close();
          return;
        }
      }

      /**
       * Function to confirm cancelling of the modal window
       * @param {*} value - values are 'Yes', 'No', 'save' and 'cancel'
       */
      /* istanbul ignore next */
      function checkNoStatus() {
        if (flags.vm.newTitle.userWorkspaceName !== mainScope.vm.tempTitle.trim().replace(/&nbsp;/g, " ") || flags.vm.newTitle.structure !== mainScope.vm.tempStructure) {
          flags.content = true;
          flags.widgetArrange = true;
          flags.vm.newTitle.userWorkspaceName = mainScope.vm.tempTitle.trim().replace(/&nbsp;/g, " ");
          flags.vm.newTitle.structure = mainScope.vm.tempStructure;
        }
        if (!angular.equals(flags.originalOne, flags.vm.one) ||
          !angular.equals(flags.originalTwo, flags.vm.two) ||
          !angular.equals(flags.originalThree, flags.vm.three) ||
          !angular.equals(flags.originalFour, flags.vm.four) ||
          !angular.equals(flags.originalFive, flags.vm.five)) {
          flags.content = false;
          flags.widgetArrange = false;
          flags.vm.one = flags.originalOne;
          flags.vm.two = flags.originalTwo;
          flags.vm.three = flags.originalThree;
          flags.vm.four = flags.originalFour;
          flags.vm.five = flags.originalFive;
        }
      }
      /* istanbul ignore next */
      function checkYesStatus() {
        if (flags.vm.newTitle.userWorkspaceName !== mainScope.vm.tempTitle.trim().replace(/&nbsp;/g, " ") ||
          flags.vm.newTitle.structure !== mainScope.vm.tempStructure) {
          flags.vm.newTitle.userWorkspaceName = mainScope.vm.tempTitle.trim().replace(/&nbsp;/g, " ");
          flags.vm.newTitle.structure = mainScope.vm.tempStructure;
        }
        if (!angular.equals(flags.originalOne, flags.vm.one) ||
          !angular.equals(flags.originalTwo, flags.vm.two) ||
          !angular.equals(flags.originalThree, flags.vm.three) ||
          !angular.equals(flags.originalFour, flags.vm.four) ||
          !angular.equals(flags.originalFive, flags.vm.five)) {
          flags.vm.one = flags.originalOne;
          flags.vm.two = flags.originalTwo;
          flags.vm.three = flags.originalThree;
          flags.vm.four = flags.originalFour;
          flags.vm.five = flags.originalFive;
        }
      }
      /* istanbul ignore next */
      function checkSaveStatus() {
        if (flags.vm.newTitle.userWorkspaceName !== mainScope.vm.tempTitle.trim().replace(/&nbsp;/g, " ") ||
          flags.vm.newTitle.structure !== mainScope.vm.tempStructure) {
          mainScope.vm.configureUpdate(flags.vm.newTitle);
          flags.content = true;
          flags.widgetArrange = true;
        }
        if (!angular.equals(flags.originalOne, flags.vm.one) ||
          !angular.equals(flags.originalTwo, flags.vm.two) ||
          !angular.equals(flags.originalThree, flags.vm.three) ||
          !angular.equals(flags.originalFour, flags.vm.four) ||
          !angular.equals(flags.originalFive, flags.vm.five)) {
          flags.vm.saveWorkspaceConfig('false');
          flags.content = false;
          flags.widgetArrange = false;
        }
      }

      vm.confirmCancel = function (value) {
        if (value === 'cancel' || value === 'No') {
          closeAnnouncementDialog(1);
          $("ul[role=tab-list] li.active a").focus();
        }
        /* istanbul ignore if */
        if (value === 'no') {
          checkNoStatus();
          closeAnnouncementDialog(1);
        }
        /* istanbul ignore if */
        if (value === 'Yes') {
          checkYesStatus();
          ngDialog.closeAll();
          $("ul[role=tab-list] li.active a").focus();

        }
        /* istanbul ignore if */
        if (value === 'save') {
          checkSaveStatus();
          closeAnnouncementDialog(1);
        }
      };
    });
})();
