(function () {
  'use strict';
  /**
   * This controller is the AppellantsPartiesAndRealParties Controller.  It communications with the appleant, parties and Real parties Modal dialog.
   */
  angular
    .module('ptabe2e')
    .controller('AppellantsPartiesController', function (partiesData, ngDialog, partiesFlag, CONSTANTS, HttpFactory, $scope, $log, toastr) {


      $scope.shareAssign = partiesData;
      $scope.partiesShow = partiesFlag;
      $scope.disableSave = true;

      $scope.getRole = function () {
        return HttpFactory.getActions(CONSTANTS.URL.PARTIES + $scope.shareAssign.applicationNumber)
          .then(function (successResponse) {
              $scope.myAssignees = successResponse.data.assignees;
              $scope.sortAssigneesData = [];
              angular.forEach($scope.myAssignees, function (value, key) {
                $scope.sortAssigneesData.push({
                  key: key,
                  value: value
                });
              });
              $scope.myApplicants = successResponse.data.applicants;
              $scope.sortApplicantsData = [];
              angular.forEach($scope.myApplicants, function (value, key) {
                $scope.sortApplicantsData.push({
                  key: key,
                  value: value
                });
              });
              $scope.sortInventorsData = [];
              $scope.sortInventorsData = successResponse.data.inventors;
              //$scope.sortInventorsData = [];
              // angular.forEach($scope.myInventors, function (value, key) {
              //   $scope.sortInventorsData.push({
              //     key: key,
              //     value: value
              //   });
              // });
              $scope.myThirdPartyData = successResponse.data.thirdPartyRequesters;
              $scope.sortThirdPartyData = [];
              angular.forEach($scope.myThirdPartyData, function (value, key) {
                $scope.sortThirdPartyData.push({
                  key: key,
                  value: value
                });
              });
              $scope.otherAppellantData = [];
              $scope.clickedColumn = [];
              $scope.selectedCols = [];
              $scope.selectedThirdPartyCols = [];
              $scope.availableCols = [];


            },
            function (failureResponse) {
              $log.debug(failureResponse);

            });

      };
      $scope.getRole();
      $scope.dataOutput = function () {
        $scope.getRole().then(function () {
          $scope.getRealPartiesData();
        });
      };
      $scope.dataOutput();
      $scope.getRealPartiesData = function () {
        HttpFactory.getActions(CONSTANTS.URL.APPEAL_METADATA + "?caseNumber=" + $scope.shareAssign.applicationNumber + "&appealNumber=" + $scope.shareAssign.appealNumber)
          .then(function (successResponse) {
              $scope.realAppellants = successResponse.data.appeal.appellants;
              $scope.realRealParties = successResponse.data.appeal.realParties;
              $scope.realPatentOwners = successResponse.data.appeal.patentOwners;
              $scope.realThirdPartyRequestor = successResponse.data.appeal.thirdPartyRequestor;


              if ($scope.partiesShow === "Parties") {

                angular.forEach($scope.realPatentOwners, function (key) {
                  $scope.selectedCols.push({
                    key: key,
                    value: "otherData"
                  });


                });

                angular.forEach($scope.realThirdPartyRequestor, function (key) {
                  $scope.selectedThirdPartyCols.push({
                    key: key,
                    value: "otherData"
                  });



                });

              }
              if ($scope.partiesShow === "Appellants") {

                angular.forEach($scope.realAppellants, function (key) {
                  $scope.selectedCols.push({
                    key: key,
                    value: "otherData"
                  });


                });
              }
              if ($scope.partiesShow === "Real party in interest") {

                angular.forEach($scope.realRealParties, function (key) {
                  $scope.selectedCols.push({
                    key: key,
                    value: "otherData"
                  });


                });
              }
              $scope.originalSelectedCols = angular.copy($scope.selectedCols);
              $scope.originalSelectedThirdPartyCols = angular.copy($scope.selectedThirdPartyCols);
            },
            function (failureResponse) {
              $log.debug(failureResponse);
            });
      };
      $scope.getRealPartiesData();



      // Move list item Up
      $scope.listUp = function (array, itemIndex) {
        $scope.moveItem(array, itemIndex, itemIndex - 1);
      };

      // Move list item Down
      $scope.listDown = function (array, itemIndex) {
        $scope.moveItem(array, itemIndex, itemIndex + 1);
      };

      // Move list items up or down or swap
      /* istanbul ignore next*/
      $scope.moveItem = function (array, origin, destination) {
        var temp = array[destination];
        array[destination] = array[origin];
        array[origin] = temp;
      };
      $scope.checkKey = function () {

        if ($scope.otherAppellantData.length > 0) {
          $scope.otherAppellantData = [];
          $scope.setData();
        } else {
          $scope.setData();
        }

        $scope.clickedColumn = $scope.otherAppellantData;

      };
      $scope.setData = function () {
        $scope.otherAppellantData.push({
          key: $scope.otherAppellant,
          value: "otherData"
        });
      };

      /* istanbul ignore next*/
      $scope.moveSourcetoDestination = function () {

        angular.forEach($scope.clickedColumn, function (column) {
          $scope.selectedCols.push(column);
          if ($scope.sortAssigneesData.includes(column)) {
            $scope.sortAssigneesData.splice($scope.sortAssigneesData.indexOf(column), 1);
          }
          if ($scope.sortApplicantsData.includes(column)) {
            $scope.sortApplicantsData.splice($scope.sortApplicantsData.indexOf(column), 1);
          }
          if ($scope.sortInventorsData.includes(column)) {
            $scope.sortInventorsData.splice($scope.sortInventorsData.indexOf(column), 1);
          }
          if ($scope.sortThirdPartyData.includes(column)) {
            $scope.sortThirdPartyData.splice($scope.sortThirdPartyData.indexOf(column), 1);
          }

        });
        $scope.closeSaveAndClose();
        $scope.clickedColumn = [];
        $scope.otherAppellantData = [];
        $scope.otherAppellant = "";

      };

      /* istanbul ignore next*/
      $scope.moveSourcetoDestinationData = function () {

        angular.forEach($scope.clickedColumn, function (column) {
          $scope.selectedThirdPartyCols.push(column);
          if ($scope.sortAssigneesData.includes(column)) {
            $scope.sortAssigneesData.splice($scope.sortAssigneesData.indexOf(column), 1);
          }
          if ($scope.sortApplicantsData.includes(column)) {
            $scope.sortApplicantsData.splice($scope.sortApplicantsData.indexOf(column), 1);
          }
          if ($scope.sortInventorsData.includes(column)) {
            $scope.sortInventorsData.splice($scope.sortInventorsData.indexOf(column), 1);
          }
          if ($scope.sortThirdPartyData.includes(column)) {
            $scope.sortThirdPartyData.splice($scope.sortThirdPartyData.indexOf(column), 1);
          }
        });
        $scope.closeSaveAndClose();
        $scope.clickedColumn = [];
        $scope.otherAppellantData = [];
        $scope.otherAppellant = "";

      };
      /* istanbul ignore next*/
      $scope.checkForTabs = function (event) {
        var data = true;
        if (!angular.equals($scope.originalSelectedCols, $scope.selectedCols) || !angular.equals($scope.originalSelectedThirdPartyCols, $scope.selectedThirdPartyCols)) {
          $scope.openUnsavedChanges(event, data);
        } else {
          $scope.partiesShow = event.target.id;
          $scope.dataOutput();
        }
      };
      /* istanbul ignore next*/
      $scope.closePartiesData = function () {
        var data = false;
        if (!angular.equals($scope.originalSelectedCols, $scope.selectedCols) || !angular.equals($scope.originalSelectedThirdPartyCols, $scope.selectedThirdPartyCols)) {
          $scope.openUnsavedChanges(event, data);
        } else {
          closeSaveDialog(1);
        }
      };
      /* istanbul ignore next*/
      $scope.closeSaveAndClose = function () {
        if ($scope.partiesShow === "Parties") {
          if ((!angular.equals($scope.originalSelectedCols, $scope.selectedCols) ||
              !angular.equals($scope.originalSelectedThirdPartyCols, $scope.selectedThirdPartyCols))) {
            if ($scope.selectedThirdPartyCols.length > 0) {
              if ($scope.selectedCols.length >= 1) {
                $scope.disableSave = false;
              } else {
                $scope.disableSave = true;
              }
            } else {
              $scope.disableSave = false;
            }
          } else {
            $scope.disableSave = true;
          }
        } else {
          if (!angular.equals($scope.originalSelectedCols, $scope.selectedCols)) {
            $scope.disableSave = false;
          } else {
            $scope.disableSave = true;
          }
        }
      };



      function closeSaveDialog(popupsToClose) {
        var openDialogs = ngDialog.getOpenDialogs();
        if (openDialogs.length > 1) {
          ngDialog.close(openDialogs[openDialogs.length - popupsToClose], true);
        } else {
          ngDialog.closeAll(true);
        }
      }

      $scope.openUnsavedChanges = function (event, data) {
        $scope.newPartiesShow = event.target.id;
        ngDialog.open({
          template: "app/components/helperComponents/appellantsPartiesAndRealParties/partiesUnsavedChanges.html",
          controller: 'PartiesUnsavedController',
          scope: $scope,
          width: '25%',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false,
          resolve: {
            selectedData: function () {
              return $scope.selectedCols;
            },
            selctedThirdPartyData: function () {
              return $scope.selectedThirdPartyCols;
            },
            newPartiesFlag: function () {
              return $scope.newPartiesShow;
            },
            oldPartiesFlag: function () {
              return $scope.partiesShow;
            },
            partiesData: function () {
              return $scope.shareAssign;
            },
            aborndenFlag: function () {
              return data;
            }

          }
        }).closePromise.then(function (checkTargetId) {
          if (checkTargetId.value) {
            $scope.partiesShow = $scope.newPartiesShow;
            $scope.dataOutput();
            $scope.disableSave = true;
          }
        }, function () {
          // intentional
        });
      };


      $scope.moveSourcetoDestinationCancel = function (data, index) {
        if (data.value === "assignees") {
          $scope.sortAssigneesData.push(data);
        }
        if (data.value === "applicants") {
          $scope.sortApplicantsData.push(data);
        }
        if (data.value === "inventors") {
          $scope.sortInventorsData.push(data);
        }
        if (data.value === "thirdPartyRequesters") {
          $scope.sortThirdPartyData.push(data);
        }
        $scope.selectedCols.splice(index, 1);
        $scope.closeSaveAndClose();
      };

      $scope.moveSourcetoDestinationDataCancel = function (data, index) {
        if (data.value === "assignees") {
          $scope.sortAssigneesData.push(data);
        }
        if (data.value === "applicants") {
          $scope.sortApplicantsData.push(data);
        }
        if (data.value === "inventors") {
          $scope.sortInventorsData.push(data);
        }
        if (data.value === "thirdPartyRequesters") {
          $scope.sortThirdPartyData.push(data);
        }
        $scope.selectedThirdPartyCols.splice(index, 1);
        $scope.closeSaveAndClose();
      };

      $scope.removeAll = function () {

        angular.forEach($scope.selectedCols, function (data) {

          if (data.value === "assignees") {
            $scope.sortAssigneesData.push(data);
          }
          if (data.value === "applicants") {
            $scope.sortApplicantsData.push(data);
          }
          if (data.value === "inventors") {
            $scope.sortInventorsData.push(data);
          }
          if (data.value === "thirdPartyRequesters") {
            $scope.sortThirdPartyData.push(data);
          }

        });
        $scope.selectedCols = [];
        $scope.closeSaveAndClose();
      };

      $scope.removeAllData = function () {

        angular.forEach($scope.selectedThirdPartyCols, function (data) {

          if (data.value === "assignees") {
            $scope.sortAssigneesData.push(data);
          }
          if (data.value === "applicants") {
            $scope.sortApplicantsData.push(data);
          }
          if (data.value === "inventors") {
            $scope.sortInventorsData.push(data);
          }
          if (data.value === "thirdPartyRequesters") {
            $scope.sortThirdPartyData.push(data);
          }

        });
        $scope.selectedThirdPartyCols = [];
        $scope.closeSaveAndClose();
      };
      $scope.saveClosePostInventors = function () {
        $scope.close = true;
        $scope.postInventors();
      };
      $scope.savePostInventors = function () {
        $scope.close = false;
        $scope.postInventors();
      };

      /* istanbul ignore next*/
      $scope.postInventors = function () {
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
            // $scope.checkForTabs()
            $scope.dataOutput();
            $scope.disableSave = true;

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
            if ($scope.close) {
              closeSaveDialog(1);
            }
          }, function (failureResponse) {
            $log.debug(failureResponse);
            toastr.clear();
            toastr.error(failureResponse.data.message, {
              iconClass: 'toast-danger'
            });

          });
      };



    });
})();
