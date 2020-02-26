(function () {
  'use strict';
  /**
   *
   */
  angular
    .module('ptabe2e')

    .controller('unsavedChangesController', function (ngDialog, saveFlags, definition, myfav, viewCaseDocket, $rootScope, nextTab,
      assignments, workQueue, assignmentBasedDocket, masterDocket, myCredits) {
      var vm = this;
      vm.setCancel = saveFlags.setCancel;
      var myFavUpdatedScope = angular.element(document.getElementById('myFavoritesEdit')).scope();
      var viewCaseDocketScope = angular.element(document.getElementById('viewCaseDocketEdit')).scope();
      var assignmentScope = angular.element(document.getElementById('assignmentsEdit')).scope();
      var workQueuScope = angular.element(document.getElementById('workQueueEdit')).scope();
      var assignmentDocketScope = angular.element(document.getElementById('assignmentsDocketEdit')).scope();
      var masterDocketScope = angular.element(document.getElementById('masterDocketEdit')).scope();
      var myCreditsScope = angular.element(document.getElementById('myCreditsEdit')).scope();
      /* istanbul ignore if */
      if (saveFlags.$parent !== null) {
        var originalDefintion = angular.copy(saveFlags.$parent.$parent.$parent.definition);
      }

      function closeAnnouncementDialog(popupsToClose) {


        var openDialogs = ngDialog.getOpenDialogs();
        if (openDialogs.length > 1) {
          ngDialog.close(openDialogs[openDialogs.length - popupsToClose]);
        } else {
          ngDialog.close();
        }
      }
      /* istanbul ignore next */
      function flagsCheck(isNo) {
        saveFlags.content = nextTab === 'Widget settings' ? false : true;
        saveFlags.favSave = false;
        saveFlags.showHide = false;
        saveFlags.assignShowHide = false;
        saveFlags.assignDocketShowHide = false;
        saveFlags.masterDocketShowHide = false;
        saveFlags.myCreditsShowHide = false;

        switch (definition.type) {
          case 'myFavorites':
            saveFlags.favSave = true;
            break;
          case 'viewCaseDockets':
            saveFlags.showHide = true;
            break;
          case 'assignments':
            saveFlags.assignShowHide = true;
            break;
          case 'workQueue':
            saveFlags.assignShowHide = true;
            break;
          case 'assignmentBasedDocket':
            saveFlags.assignDocketShowHide = true;
            break;
          case 'masterDocket':
            saveFlags.masterDocketShowHide = true;
            break;
          case 'myCredits':
            saveFlags.myCreditsShowHide = true;
            break;
          default:
            break;
        }
      }
      /* istanbul ignore next */
      function revertWidgetSettings() {
        definition.title = originalDefintion.title.trim().replace(/&nbsp;/g, " ");
        definition.color = originalDefintion.color;
        definition.height = originalDefintion.height;
        saveFlags.$parent.$parent.showErrorMsg = false;
      }
      /* istanbul ignore next */
      function revertChanges() {
        revertWidgetSettings();
        if (!angular.equals(myfav, myFavUpdatedScope.originalFav) || myFavUpdatedScope.favName.length > 0 || myFavUpdatedScope.favUrl.length > 0 ||
          checkFavEditValue()) {
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          myFavUpdatedScope.favName = '';
          myFavUpdatedScope.favUrl = '';
          myFavUpdatedScope.show = false;
          myFavUpdatedScope.showUpdate = false;


          myFavUpdatedScope.showList = true;
          myFavUpdatedScope.favorites = angular.copy(myFavUpdatedScope.originalFav);
        }
        if (!angular.equals(viewCaseDocket, viewCaseDocketScope.originShowHide)) {
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          viewCaseDocketScope.selectedColumns = angular.copy(viewCaseDocketScope.originShowHide);
          viewCaseDocketScope.selectUnselect = angular.copy(viewCaseDocketScope.originalSelectUnselect);
        }
        if (!angular.equals(assignments, assignmentScope.originShowHide)) {
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          assignmentScope.updatedColumnList = angular.copy(assignmentScope.originShowHide);
          assignmentScope.selectUnselect = angular.copy(assignmentScope.originalSelectUnselect);
        }
        if (!angular.equals(workQueue, workQueuScope.originShowHide)) {
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          workQueuScope.updatedColumnList = angular.copy(workQueuScope.originShowHide);
          workQueuScope.selectUnselect = angular.copy(workQueuScope.originalSelectUnselect);
        }
        if (!angular.equals(assignmentBasedDocket, assignmentDocketScope.originShowHide)) {
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          assignmentDocketScope.updatedDocketColumnList = angular.copy(assignmentDocketScope.originShowHide);
          assignmentDocketScope.selectUnselect = angular.copy(assignmentDocketScope.originalSelectUnselect);
        }
        if (!angular.equals(masterDocket, masterDocketScope.originShowHide)) {
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          masterDocketScope.selectedColumns = angular.copy(masterDocketScope.originShowHide);
          masterDocketScope.selectUnselect = angular.copy(masterDocketScope.originalSelectUnselect);
        }
        if (!angular.equals(myCredits, myCreditsScope.originShowHide)) {
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          myCreditsScope.updatedMyCreditsColumnList = angular.copy(myCreditsScope.originShowHide);
          myCreditsScope.selectUnselect = angular.copy(myCreditsScope.originalSelectUnselect);
        }

      }
      /* istanbul ignore next */
      function checkFavEditStatus() {
        if (angular.isDefined(myFavUpdatedScope.index)) {
          myFavUpdatedScope.editFavName = myFavUpdatedScope.originalFav[myFavUpdatedScope.index].userFavoritesName;
          myFavUpdatedScope.editFavUrl = myFavUpdatedScope.originalFav[myFavUpdatedScope.index].userFavoritesURL;
          myFavUpdatedScope.showUpdate = false;
        }
      }
      /* istanbul ignore next */
      function checkFavEditValue() {
        if (angular.isDefined(myFavUpdatedScope.index)) {
          if (myFavUpdatedScope.editFavName !== myFavUpdatedScope.originalFav[myFavUpdatedScope.index].userFavoritesName ||
            myFavUpdatedScope.editFavUrl !== myFavUpdatedScope.originalFav[myFavUpdatedScope.index].userFavoritesURL) {
            return true;
          }

        }
      }
      /* istanbul ignore next */
      function checkYesOption() {

        if (definition.type === 'myFavorites' &&
          (!angular.equals(myfav, myFavUpdatedScope.originalFav) ||
            myFavUpdatedScope.favName.length > 0 ||
            myFavUpdatedScope.favUrl.length > 0)) {
          saveFlags.content = true;
          saveFlags.favSave = true;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          myFavUpdatedScope.favName = '';
          myFavUpdatedScope.favUrl = '';
          myFavUpdatedScope.favorites = angular.copy(myFavUpdatedScope.originalFav);
          myFavUpdatedScope.addLink = true;
          myFavUpdatedScope.show = false;
          myFavUpdatedScope.showList = true;
        }
        if (angular.isDefined(myFavUpdatedScope.index) && (myFavUpdatedScope.editFavName !== myFavUpdatedScope.originalFav[myFavUpdatedScope.index].userFavoritesName ||
            myFavUpdatedScope.editFavUrl !== myFavUpdatedScope.originalFav[myFavUpdatedScope.index].userFavoritesURL)) {

          myFavUpdatedScope.editFavName = myFavUpdatedScope.originalFav[myFavUpdatedScope.index].userFavoritesName;
          myFavUpdatedScope.editFavUrl = myFavUpdatedScope.originalFav[myFavUpdatedScope.index].userFavoritesURL;
          myFavUpdatedScope.showList = true;
          myFavUpdatedScope.showUpdate = false;
          myFavUpdatedScope.addLink = true;
        }

        if (definition.type === 'viewCaseDockets' && (!angular.equals(viewCaseDocket, viewCaseDocketScope.originShowHide))) {
          saveFlags.content = true;
          saveFlags.favSave = false;
          saveFlags.showHide = true;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          viewCaseDocketScope.selectedColumns = angular.copy(viewCaseDocketScope.originShowHide);
          viewCaseDocketScope.selectUnselect = angular.copy(viewCaseDocketScope.originalSelectUnselect);
        }

        if (definition.type === 'assignments' && (!angular.equals(assignments, assignmentScope.originalAssignments))) {
          saveFlags.content = true;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = true;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          assignmentScope.updatedColumnList = angular.copy(assignmentScope.originalAssignments);
          assignmentScope.selectUnselect = angular.copy(assignmentScope.originalSelectUnselect);
        }
        if (definition.type === 'workQueue' && (!angular.equals(workQueue, workQueuScope.originalAssignments))) {
          saveFlags.content = true;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = true;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          workQueuScope.updatedColumnList = angular.copy(workQueuScope.originalAssignments);
          workQueuScope.selectUnselect = angular.copy(workQueuScope.originalSelectUnselect);
        }
        if (definition.type === 'assignmentBasedDocket' && (!angular.equals(assignmentBasedDocket, assignmentDocketScope.originalAssignments))) {
          saveFlags.content = true;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = true;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
          assignmentDocketScope.updatedColumnList = angular.copy(assignmentDocketScope.originalAssignments);
          assignmentDocketScope.selectUnselect = angular.copy(assignmentDocketScope.originalSelectUnselect);
        }

        if (definition.type === 'masterDocket' && (!angular.equals(masterDocket, masterDocketScope.originShowHide))) {
          saveFlags.content = true;
          saveFlags.favSave = false;
          saveFlags.showHide = true;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = true;
          saveFlags.myCreditsShowHide = false;
          masterDocketScope.selectedColumns = angular.copy(masterDocketScope.originShowHide);
          masterDocketScope.selectUnselect = angular.copy(masterDocketScope.originalSelectUnselect);
        }
        if (definition.type === 'myCredits' && (!angular.equals(myCredits, myCreditsScope.originShowHide))) {
          saveFlags.content = true;
          saveFlags.favSave = false;
          saveFlags.showHide = true;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = true;
          myCreditsScope.updatedColumnList = angular.copy(myCreditsScope.originShowHide);
          myCreditsScope.selectUnselect = angular.copy(myCreditsScope.originalSelectUnselect);
        }
      }
      /* istanbul ignore next */
      function checkSaveOption() {
        if ((saveFlags.$parent.$parent.$parent.definition.title.trim().replace(/&nbsp;/g, " ") !== definition.title) ||
          (saveFlags.$parent.$parent.$parent.definition.height !== definition.height) ||
          (saveFlags.$parent.$parent.$parent.definition.color !== definition.color)) {
          saveFlags.$parent.$parent.customizeWidget(saveFlags, definition);
          if (definition.type === 'viewCaseDockets') {
            viewCaseDocketScope.getViewCaseDocketColumns();
          }
          if (definition.type === 'assignments') {
            assignmentScope.getAssignmentColumns();
          }
          if (definition.type === 'workQueue') {
            workQueuScope.getAssignmentColumns();
          }
          if (definition.type === 'assignmentBasedDocket') {
            assignmentDocketScope.getAssignmentDocketColumns();
          }
          if (definition.type === 'masterDocket') {
            masterDocketScope.getMasterDocketInfo();
          }
          if (definition.type === 'myCredits') {
            myCreditsScope.getMyCreditsColumns();
          }
          flagsCheck();
        }
        if (nextTab === 'Widget settings') {
          flagsCheck();
        }

        if (!angular.equals(myfav, myFavUpdatedScope.originalFav) || myFavUpdatedScope.favName.length > 0 || myFavUpdatedScope.favUrl.length > 0 ||
          checkFavEditValue()) {
          myFavUpdatedScope.saveFav();
          myFavUpdatedScope.favName = '';
          myFavUpdatedScope.favUrl = '';
          myFavUpdatedScope.show = false;
          myFavUpdatedScope.showList = true;
          myFavUpdatedScope.showUpdate = false;
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.myCreditsShowHide = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
        }
        if ($rootScope.viewCaseColumnsChanged) {
          viewCaseDocketScope.saveState();
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;

        }
        if ($rootScope.assignmentColumnsChanged || $rootScope.workqueueColumnsChanged) {
          if (definition.type === 'assignments') {
            assignmentScope.saveState();
          } else {
            workQueuScope.saveState();
          }
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;
        }
        if ($rootScope.assignmentDocketColumnsChanged) {
          assignmentDocketScope.saveState();
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;

        }
        if ($rootScope.masterDocketColumnsChanged) {
          masterDocketScope.saveState();
          saveFlags.content = false;
          saveFlags.favSave = false;
          saveFlags.showHide = false;
          saveFlags.assignShowHide = false;
          saveFlags.assignDocketShowHide = false;
          saveFlags.masterDocketShowHide = false;
          saveFlags.myCreditsShowHide = false;

        }
        if ($rootScope.myCreditsColumnsChanged) {
          if (definition.type === 'myCredits') {
            myCreditsScope.saveGridPreferences();
            saveFlags.content = false;
            saveFlags.favSave = false;
            saveFlags.showHide = false;
            saveFlags.assignShowHide = false;
            saveFlags.assignDocketShowHide = false;
            saveFlags.masterDocketShowHide = false;
            saveFlags.myCreditsShowHide = false;
          }
        }
      }

      vm.confirmCancel = function (value) {
        if (value === 'cancel' || value === 'No') {
          closeAnnouncementDialog(1);
          $("ul[role=tab-list] li.active a").focus();
        }
        /* istanbul ignore if */
        if (value === 'no') {
          if (nextTab === 'Widget settings') {
            flagsCheck(value);
            revertChanges();
          } else {
            revertChanges();
            flagsCheck(value);
          }

          checkFavEditStatus();
          myFavUpdatedScope.addLink = true;
          if (definition.type === 'myFavorites') {
            myFavUpdatedScope.getFav();
          }
          if (definition.type === 'viewCaseDockets') {
            viewCaseDocketScope.getViewCaseDocketColumns();
            $rootScope.viewCaseColumnsChanged = false;
          }
          if (definition.type === 'assignments' || definition.type === 'workQueue') {
            assignmentScope.getAssignmentColumns();
            assignmentScope.assignmentListOrderChanged = false;
            $rootScope.assignmentColumnsChanged = false;
          }
          if (definition.type === 'workQueue') {
            workQueuScope.getAssignmentColumns();
            workQueuScope.assignmentListOrderChanged = false;
            $rootScope.workqueueColumnsChanged = false;
          }
          if (definition.type === 'assignmentBasedDocket') {
            assignmentDocketScope.getAssignmentDocketColumns();
            $rootScope.assignmentDocketColumnsChanged = false;
          }
          if (definition.type === 'masterDocket') {
            masterDocketScope.getMasterDocketColumns();
            $rootScope.masterDocketColumnsChanged = false;
          }
          if (definition.type === 'myCredits') {
            myCreditsScope.getMyCreditsColumns();
            $rootScope.myCreditsColumnsChanged = false;
          }
          closeAnnouncementDialog(1);
        }
        /* istanbul ignore if */
        if (value === 'Yes') {
          revertWidgetSettings();
          closeAnnouncementDialog(1);
          checkYesOption();
          closeAnnouncementDialog(1);
          $("ul[role=tab-list] li.active a").focus();
        }
        /* istanbul ignore if */
        if (value === 'save') {
          checkSaveOption();
          closeAnnouncementDialog(1);

        }
      };

    });

})();
