(function () {
  'use strict';
  /**
   * This controller is the AppellantsPartiesAndRealParties Controller.  It communications with the appleant, parties and Real parties Modal dialog.
   */
  angular
    .module('ptabe2e')
    .controller('PartiesUnsavedController', function ($log, selectedData, selctedThirdPartyData,
      newPartiesFlag, oldPartiesFlag, partiesData, $scope, ngDialog, aborndenFlag, CONSTANTS, HttpFactory, toastr) {

      $scope.selectedCols = selectedData;
      $scope.selectedThirdPartyCols = selctedThirdPartyData;
      $scope.newPartiesShow = newPartiesFlag;
      $scope.partiesShow = oldPartiesFlag;
      $scope.shareAssign = partiesData;
      $scope.flagData = aborndenFlag;

      /* istanbul ignore next */
      $scope.putInventors = function () {
        $scope.postParties = [];
        $scope.postRealParties = [];
        angular.forEach($scope.selectedCols, function (column) {
          $scope.postParties.push(column.key);
        });
        angular.forEach($scope.selectedThirdPartyCols, function (column) {
          $scope.postRealParties.push(column.key);
        });
        var postData = {
          "serialNumber": $scope.shareAssign.applicationNumber,
          "appealNumber": $scope.shareAssign.appealNumber,
          "partyType": $scope.partiesShow,
          "realParties": $scope.postParties,
          "partyRequestors": $scope.postRealParties

        };
        HttpFactory.putActions(CONSTANTS.URL.PARTIES, postData)
          .then(function () {
            closeSaveDialog(1);
            $log.debug("success post");
            toastr.clear();
            if ($scope.partiesShow === "Parties") {
              toastr.success("Parties updated successfully", {
                iconClass: 'toast-success'
              });
            }
            if ($scope.partiesShow === "Appellants") {
              toastr.success("Appellants updated successfully", {
                iconClass: 'toast-success'
              });
            }
            if ($scope.partiesShow === "Real party in interest") {
              toastr.success("Real party in interest updated successfully", {
                iconClass: 'toast-success'
              });
            }
          }, function (failureResponse) {
            $log.debug(failureResponse);
            toastr.clear();
            toastr.error(failureResponse.data.message, {
              iconClass: 'toast-danger'
            });

          });
      };


      $scope.closeParties = function () {
        closeSaveDialog(1);
      };

      $scope.closeAllParties = function () {
        closeSaveDialog(2);
      };



      function closeSaveDialog(popupsToClose) {
        var openDialogs = ngDialog.getOpenDialogs();
        if (openDialogs.length > 1) {
          ngDialog.close(openDialogs[openDialogs.length - popupsToClose], true);
        } else {
          ngDialog.closeAll(true);
        }
      }


    });
})();
