(function () {
  'use strict';

  angular
    .module('ptabe2e')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        creationDate: '=',
        userInfo: '=?',
        doneEditing: '=?',
        chevronCallBack: '=?',
        refreshActionfrom: '=?',
        editMode: '=?',
        appNumber: '=?',
        caseNum: '=?',
        caseType: '=?',
        hearingScheduleStartDate: '=?',
        hearingDateCallback: '=?',
        hearingDatePreviousWeek: '=?',
        hearingDateFutureWeek: '=?',
        hearingScheduleMonday: '=?',
        hearingScheduleFriday: '=?',
        adminArray: '=?',
        refreshCaseViewer: '=?',
        ownerCallback: '=?',
        whoamiCallback: '=?'

      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, $route, HttpFactory, CONSTANTS, $rootScope, toastr, $timeout, ngDialog, $window, CommonHelperService, $location) {
      var vm = this;
      vm.noError = true;
      $scope.counter = 1;
      vm.previousAlertNum = 0;
      vm.display = false;
      $scope.expandedValue = 0;
      $scope.setExpanded = function (number) {
        $scope.expandedValue = number;
      }
      vm.ptabReadOnlyUser = false;
      vm.displayNotification = false;


      var pathCheck = $route.current.$$route.originalPath
      if (pathCheck.indexOf('/caseViewer/') >= 0) {
        vm.caseViewerMode = true;
        vm.screenName = "- Case Viewer";
      } else if (pathCheck.indexOf('/hearingSchedule/') >= 0) {
        vm.caseViewerMode = false;
        vm.hearingScheduleMode = true;
        vm.screenName = "- View Weekly Hearing Docket";
        if (vm.hearingScheduleStartDate) {
          // vm.dateRangeString =
        }
      } else if (pathCheck.indexOf('/postDecisionManager/') >= 0) {
        vm.caseViewerMode = false;
        vm.hearingScheduleMode = false;
        vm.screenName = "- Post Decision Case Manager";
      } else if (pathCheck.indexOf('/importManager/') >= 0) {
        vm.caseViewerMode = false;
        vm.hearingScheduleMode = false;
        vm.screenName = "- Pre-Appeal Case Import Manager";
      } else if (pathCheck.indexOf('/circulation/') >= 0) {
        vm.caseViewerMode = false;
        vm.hearingScheduleMode = false;
        vm.screenName = "- Circulation Manager";
      } else {
        vm.caseViewerMode = false;
        vm.hearingScheduleMode = false;
        vm.displayNotification = true;
      }

      vm.showPreviousWeek = function (newDate) {

        if (vm.hearingDatePreviousWeek) {
          vm.hearingDatePreviousWeek("Anew date");
        }
      };

      $scope.interferencePortalUrl = "http://uspto-a-acts-3:81/actslogin.jsp?strPageTitle=INTERFERENCE";

      vm.importBriefHearing = function () {
        ngDialog.open({
          template: "app/components/widgets/masterDocket/src/importBriefCase.html",
          controller: 'ImportHeardCaseController',
          scope: $scope,
          width: '40%',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false,

          resolve: {
            newData: function () {

            }
          }
        }).closePromise.then(function (refreshGrid) {
          if (refreshGrid.value) {
            $timeout(function () {}, 400);
          }

        }, function () {

        });
      };

      vm.importHearingData = function () {
        ngDialog.open({
          template: "app/components/widgets/masterDocket/src/importHeardCase.html",
          controller: 'ImportHeardCaseController',
          scope: $scope,
          width: '40%',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false,

          resolve: {
            newData: function () {

            }
          }
        }).closePromise.then(function (refreshGrid) {
          if (refreshGrid.value) {
            $timeout(function () {}, 400);
          }

        }, function () {

        });
      };

      vm.weekDateSelection = function () {
        $window.open("#/hearingSchedule/" + new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000);

      };
      vm.sessionData = function () {
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
        }).closePromise.then(function () {});

      };

      vm.showFutureWeek = function (newDate) {

        if (vm.hearingDateFutureWeek) {
          vm.hearingDateFutureWeek("Anew date");
        }
      };

      vm.showDateSelection = function () {
        $scope.dateSelection = false;
        ngDialog.open({
          template: 'app/components/helperComponents/hearingSchedule/hearingDate.html',
          controller: 'HearingDateController',
          controllerAs: 'vm',
          width: '15%',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false,
          resolve: {
            hearingData: function () {
              return $scope.dateSelection;
            }
          }
        }).closePromise.then(function (newDate) {
          vm.hearingDateCallback(newDate.value);
        });
      };

      $scope.onKeydownMenu = function ($event) {
        var KeyValues = {
          BACKSPACE: 8,
          TABKEY: 9,
          RETURNKEY: 13,
          ESCAPE: 27,
          SPACEBAR: 32,
          LEFTARROW: 37,
          UPARROW: 38,
          RIGHTARROW: 39,
          DOWNARROW: 40
        };
        var myMenuEvent = $event;
        var $target = $(myMenuEvent.target);
        var nextMenuTab;
        switch (myMenuEvent.keyCode) {
          case KeyValues.ESCAPE:
            $target.blur();
            break;
          case KeyValues.UPARROW:
            nextMenuTab = -1;
            break;
          case KeyValues.RETURNKEY:
            $scope.status.isopen = false;
            $target.click();
            break;
          case KeyValues.DOWNARROW:
            nextMenuTab = 1;
            break;
          case 9:
            if (parseInt($target.attr("data-index")) === 2) {
              $scope.status.isopen = false;
            }
            break;
        }
        if (angular.isDefined(nextMenuTab)) {
          $timeout(function () {
            $('[data-index=' + (parseInt($target.attr("data-index")) + nextMenuTab) + ']').focus()
          }, 1);
        }
      };
      $scope.openAdminConsole = function (item) {
        if (item.modal) {
          $rootScope.worker = vm.workerNumber;
          ngDialog.open({
            template: item.path,
            controller: item.controller,
            controllerAs: 'vm',
            width: '70%',
            showClose: false,
            closeByDocument: false,
            resolve: {
              userInfo: function () {
                return vm.userInfo;
              }
            }
          }).closePromise.then(function () {

          });
        } else {
          window.open(item.path);
        }
      }

      vm.pressEcnter = function (searchNum, event) {

        if (event.keyCode === 13) {
          vm.caseSearch(searchNum);
        }
      }

      vm.refreshCaseViewer = function () {
        vm.refreshData();
      }



      vm.advancedSearch = function () {
        ngDialog.open({
          template: 'app/components/navbar/advancedSearch.html',
          controller: 'AdvancedSearchController',
          controllerAs: 'vm',
          width: '30%',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false
        });

      }


      vm.refreshOwner = function () {
        if (vm.ownerCallback) {
          vm.ownerCallback();
        }
      }
      vm.caseSearch = function (searchNum) {
        vm.isTrials = searchNum.match(/[a-z]/i) ? true : false;
        if (!vm.isTrials) {
          searchNum = searchNum.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        }
        if (searchNum.toUpperCase().indexOf('DER') >= 0) {
          CommonHelperService.getRedirectUrl();
          $scope.searchCaseViwer = '';
          return false;
        }
        HttpFactory.getActions(CONSTANTS.URL.CASE_SEARCH + searchNum)
          .then(function (successResponse) {

            vm.appealNumber = successResponse.data.appealNumber;
            vm.serialNumber = successResponse.data.serialNumber;
            if (vm.appealNumber === null || vm.serialNumber === null) {
              CommonHelperService.setToastr('Case or application number ' + searchNum + ' not found. Please check the number and try again.', "error");
            } else {
              $window.userInfo = {
                userId: $window.sessionStorage.getItem("workerNumber")
              }
              if (searchNum == vm.appealNumber[0] && !vm.isTrials) {

                vm.LeadApplicationNum(vm.appealNumber[0], vm.serialNumber[0]);

              } else {
                $window.open("#/caseViewer/" + vm.serialNumber[0] + "/" + vm.appealNumber[0]);
              }
            }
          }, function () {
            CommonHelperService.setToastr('Case or application number ' + searchNum + ' not found. Please check the number and try again.', "error");
          });
        $scope.searchCaseViwer = '';
      };

      // function callWhoAmI() {

      //   vm.getDefaults = function (loginId) {
      //     HttpFactory.getActions(CONSTANTS.URL.DEAFULTS + loginId)
      //       .then(function (successResponse) {
      //         vm.userInfo = {
      //           "appUserInfo": {},
      //           "displayName": null
      //         };
      //         vm.userInfo.appUserInfo = successResponse.data.caseDetailsData;
      //         vm.userInfo.displayName = successResponse.data.caseDetailsData[0].fullName;
      //         if (!vm.userInfo.appUserInfo) {
      //           vm.userInfo.appUserInfo = successResponse.data;
      //         }
      //         vm.firstAlertNumber(loginId);
      //         // $window.userInfo.appUserInfo = vm.userInfo.appUserInfo[0];
      //         vm.whoamiCallback(vm.userInfo);
      //         if (vm.loadChevron) {
      //           vm.loadChevron(vm.userInfo);
      //         }
      //       }, function () {});
      //   }


      //   vm.LeadApplicationNum = function (appeal, serial) {
      //     HttpFactory.getActions("/mergeCase/leadApplication?appealNumber=" + vm.appealNumber[0])
      //       .then(function (successResponse) {
      //         vm.serialNumberList = [];
      //         vm.serialNumberList[0] = 0;
      //         vm.applicationList = successResponse.data;
      //         vm.applicationList.forEach(function (element) {
      //           if (element.leadIndicator === true) {
      //             vm.serialNumberList[0] = element.applicationNumber;
      //           } else {
      //             vm.serialNumberList.push(element.applicationNumber);
      //           }
      //         })
      //         if (vm.serialNumberList[0] == 0) {
      //           $window.open("#/caseViewer/" + serial + "/" + appeal);
      //         } else {

      //           $window.open("#/caseViewer/" + vm.serialNumberList[0] + "/" + vm.appealNumber[0]);
      //         }
      //       }, function () {});
      //   };

      //   vm.getPrivlages = function (loginId) {
      //     HttpFactory.getActions(CONSTANTS.URL.PRIVILEGES + loginId)
      //       .then(function (successResponse) {
      //         $scope.adminArray = successResponse.data.selectedPrivilages;
      //         vm.adminArray = successResponse.data.selectedPrivilages;
      //       }, function () {})
      //       .finally(function () {
      //         vm.getDefaults(loginId);
      //       });
      //   }

      //   HttpFactory.callWhoAmI()
      //     .then(function (successResponse) {
      //       // This if block is to pop up the user login modal for non RBAC environments. For RBAC protected environments, comment from here ........
      //       // if (successResponse.data.userId === null || angular.isUndefined(successResponse.data.userId) || successResponse.data.userId === "" || successResponse.data.ptabLoginModalAccess) {
      //       if (successResponse.data.ptabLoginModalAccess) {
      //         if (!$window.sessionStorage.getItem("workerNumber")) {
      //           ngDialog.open({
      //             template: 'app/main/getUserModal.html',
      //             controller: 'GetUserInfoController',
      //             controllerAs: 'vm',
      //             width: '20%',
      //             showClose: false,
      //             closeByEscape: false,
      //             closeByDocument: false,
      //             resolve: {
      //               userInfo: function () {
      //                 return vm.userInfo;
      //               }
      //             }
      //           }).closePromise.then(function (workerNumber) {
      //             if (vm.whoamiCallback) {
      //               vm.getPrivlages(workerNumber.value);
      //               $window.sessionStorage.setItem("workerNumber", workerNumber.value);
      //             }

      //           }, function () {

      //           });
      //         } else {
      //           vm.getPrivlages($window.sessionStorage.getItem("workerNumber"));
      //         }
      //       } else
      //         // ........ to here
      //         // Condition if the user is not an authorized PTAB user
      //         if (successResponse.data.ptabReadOnlyUser || angular.isUndefined(successResponse.data.ptabReadOnlyUser)) {
      //           vm.ptabReadOnlyUser = successResponse.data.ptabReadOnlyUser;
      //           // If the user is not an authorized PTAB user but is searching from the guest case viewer screen
      //           if ($window.sessionStorage.getItem("fromCVGuest")) {
      //             $window.sessionStorage.removeItem("fromCVGuest");
      //             vm.getPrivlages(successResponse.data.userId);
      //             $window.sessionStorage.setItem("workerNumber", successResponse.data.userId);
      //             // If the user is not an authorized PTAB user and it not searching from the guest case viewer screen
      //           } else {
      //             $location.url('caseViewer');
      //           }
      //         } else {
      //           // If the user is an authorized PTAB  user
      //           vm.getPrivlages(successResponse.data.userId);
      //           $window.sessionStorage.setItem("workerNumber", successResponse.data.userId);
      //         }
      //       // if (vm.whoamiCallback) {
      //       //   vm.whoamiCallback(successResponse);
      //       // }
      //     }, function (failureResponse) {
      //       vm.ptabReadOnlyUser = failureResponse.data.ptabReadOnlyUser;
      //       $location.url('caseViewer');
      //     });
      // }

      // callWhoAmI();


      function callWhoAmI() {

        vm.getDefaults = function (loginId) {
          HttpFactory.getActions(CONSTANTS.URL.DEAFULTS + loginId)
            .then(function (successResponse) {
              vm.userInfo = {
                "appUserInfo": {},
                "displayName": null
              };
              vm.userInfo.appUserInfo = successResponse.data.caseDetailsData;
              vm.userInfo.displayName = successResponse.data.caseDetailsData[0].fullName;
              if (!vm.userInfo.appUserInfo) {
                vm.userInfo.appUserInfo = successResponse.data;
              }
              vm.firstAlertNumber(loginId);
              // $window.userInfo.appUserInfo = vm.userInfo.appUserInfo[0];
              vm.whoamiCallback(vm.userInfo);
              if (vm.loadChevron) {
                vm.loadChevron(vm.userInfo);
              }
            }, function () {});
        }

        ngDialog.open({
          template: 'app/main/getUserModal.html',
          controller: 'GetUserInfoController',
          controllerAs: 'vm',
          width: '20%',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false,
          resolve: {
            userInfo: function () {
              return vm.userInfo;
            }
          }
        }).closePromise.then(function (workerNumber) {
          if (vm.whoamiCallback) {
            $window.sessionStorage.setItem("workerNumber", workerNumber.value);
            HttpFactory.getActions(CONSTANTS.URL.PRIVILEGES + workerNumber.value)
              .then(function (successResponse) {
                $scope.adminArray = successResponse.data.selectedPrivilages;
                vm.adminArray = successResponse.data.selectedPrivilages;
              }, function () {})
              .finally(function () {
                vm.getDefaults(workerNumber.value);
              });
          }

        }, function () {

        });




      }

      callWhoAmI();





      $scope.redirectToTrialsDashboard = function () {
        var prefix = "fromAppeals";
        HttpFactory.getActions(CONSTANTS.URL.REDIRECT_TO_TRIALS + $window.sessionStorage.getItem("workerNumber"))
          .then(function (successResponse) {
            var jwtToken = (successResponse.data.jwtToken.split("Bearer ").pop());
            window.open(successResponse.data.redirectorURL, prefix + JSON.stringify({
              "url": successResponse.data.dashboardURL,
              "token": jwtToken
            }));
          }, function (failureResponse) {

          });
      };

      $scope.openInterferenceModal = function () {
        if (CommonHelperService.isIE()) {
          $window.open($scope.interferencePortalUrl, "_blank");
        } else {
          ngDialog.open({
            template: "app/components/navbar/interferenceModal.html",
            scope: $scope,
            width: '30%',
            showClose: false,
            closeByEscape: false,
            closeByDocument: false
          })
        }
      };

      $scope.openPtabHelp = function () {
        // var loc = $location.url();
        // if (loc === '/') {
        //   loc = 'Master_Help';
        // }
        // loc = loc.replace(/\//g, '').trim();
        // loc = loc.replace(/[0-9]/g, '').trim();
        var loc = $location.url();
        if (loc.includes("caseViewer")) {
          loc = "caseViewer";
        } else if (loc.includes("postDecisionManager")) {
          loc = "postDecisionManager";
        } else if (loc.includes("importManager")) {
          loc = "importManager";
        } else if (loc.includes("hearingSchedule")) {
          loc = "hearingSchedule";
        } else if (loc === '/') {
          loc = "Master_Help";
        }
        CommonHelperService.showHelpPDF(loc);
        // HttpFactory.getActions(CONSTANTS.URL)
        // .then(function (successResponse) {
        //   window.open(successResponse.data.redirectorURL, "_blank");
        // }, function (failureResponse) {
        //
        // });
      };

      $scope.copyToClipBoard = function (value) {
        $scope.copiedNumber = value;
        var input = document.createElement('input');
        input.setAttribute('value', value);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input)
        CommonHelperService.setToastr("Interference Portal URL copied to clipboard.", "success");
        return result;
      };


      vm.firstAlertNumber = function (loginId) {
        HttpFactory.getActions("/alerts/new-alerts?recipientUserId=" + loginId)
          .then(function (successResponse) {
            vm.newAlertNum = successResponse.data.countOfNewAlerts;
            vm.newAlertNumber(loginId);
          }, function (failureResponse) {
            if (!vm.noError) {
              toastr.error(failureResponse.data.message, {
                iconClass: 'toast-danger',
                timeOut: 1000
              });
            }
          });
      };

      vm.closeAlertToastr = function () {
        vm.display = false;
      }

      vm.autocloseAlerts = function () {
        $timeout(function () {
          vm.closeAlertToastr();
        }, 12000);

      }

      vm.newAlertNumber = function (loginId) {
        if (vm.pauseAlerts) {
          return;
        }
        HttpFactory.getActions("/alerts/new-alerts?recipientUserId=" + loginId)
          .then(function (successResponse) {
            vm.newAlertNum = successResponse.data.countOfNewAlerts;
            if (vm.previousAlertNum < vm.newAlertNum && vm.displayNotification) {
              vm.display = true;
              vm.alertcaseNum = successResponse.data.allNewAlertsBag[0].appealNumber;
              vm.alertMessage = successResponse.data.allNewAlertsBag[0].messageText;
              vm.alertAssignmentTitle = successResponse.data.allNewAlertsBag[0].assignmentTitle;
              vm.alertReceived = successResponse.data.allNewAlertsBag[0].sentTimestamp;
              vm.serialNumber = successResponse.data.allNewAlertsBag[0].serialNumber;
              vm.previousAlertNum = vm.newAlertNum;
              vm.autocloseAlerts();
            }
            $timeout(function () {
              if (vm.pauseAlerts) {
                return;
              }
              vm.newAlertNumber($window.sessionStorage.getItem("workerNumber"));
            }, 30000);
          }, function (failureResponse) {
            if (!vm.noError) {
              toastr.error(failureResponse.data.message, {
                iconClass: 'toast-danger',
                timeOut: 1000
              });
            }
          });
      };

      vm.openNotificationModal = function () {
        vm.pauseAlerts = true;
        vm.newAlertNum = 0;
        vm.previousAlertNum = 0;
        vm.display = false;
        ngDialog.open({
          template: "app/components/navbar/notificationsModal.html",
          controller: 'NotificationsModalController',
          scope: $scope,
          width: '62%',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false,
          resolve: {
            userInfo: function () {
              return vm.userInfo;
            }
          }
        }).closePromise.then(function () {
          vm.pauseAlerts = false;
          vm.previousAlertNum = 0;
          $timeout(function () {
            vm.newAlertNumber($window.sessionStorage.getItem("workerNumber"));
          }, 10000);
        });
      };

      $scope.openCaseViewer = function () {
        $window.open("#/caseViewer/" + vm.serialNumber + "/" + vm.alertcaseNum);
      };

    }
  }

})();
