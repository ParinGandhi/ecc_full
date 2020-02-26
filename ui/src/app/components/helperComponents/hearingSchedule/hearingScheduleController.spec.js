(function () {
  'use strict';

  describe('HearingScheduleController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
    var controller, scope, $window, $rootScope, userInfo;
    var timeout;
    var $httpBackend, spy, $q, HttpFactoryDeferred, successResponse, failureResponse;


    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, HttpFactory, $route, $window) {
      $q = _$q_;
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;
      HttpFactoryDeferred = _$q_.defer();
      spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);

      $route.current = {
        params: {
          "hearingdate": "07/12/2018"
        }
      }

      $window.opener = {
        userInfo: "pgandhi"
      }


      userInfo = {
        "userId": "sbartlett",
        "displayName": "Bartlett, Steven J",
        "appUserInfo": [{
          "userIdentiifier": 5850,
          "activeIn": "Active",
          "lastName": "Bartlett",
          "privileges": ["ImportManager_PostDecisionCaseManager Privileges", "panel_Update", "Paneling"],
          "loginId": "sbartlett",
          "fullName": "Bartlett, Steven J",
          "disiplanceCd": "Admin",
          "jobClassificationCode": "ADM",
          "firstName": "Steven",
          "emailAddress": "Jacqueline.Bui@USPTO.GOV",
          "userWorkerNumber": "83707",
          "roleDescription": "All Business Administrators",
          "apjSeniorityRank": 0
        }]
      }


      controller = $controller('HearingScheduleController', {
        $scope: scope,
        ngDialog: ngDialog,
        $rootScope: _$rootScope_,
        HttpFactory: HttpFactory,
        $window: $window

      });
    }));

    describe('HearingScheduleController ', function () {

      // it(' getWeekleyData  successResponse', function () {
      //   var heatingDate = 20102010201;
      //   successResponse = {
      //     data: {
      //       specialTypeIndicator: "A",
      //       specialTypeDescription: "Active"
      //     }
      //   };
      //   controller.loadHearingSchedule(userInfo);

      //   expect(controller.getWeekleyData).toBeDefined();
      //   controller.getWeekleyData(heatingDate.);

      //   HttpFactoryDeferred.resolve(successResponse);
      //   $rootScope.$apply();


      // });

      //TODO - fix test case
      // it(' getWeekleyData  failureResponse ', function () {
      //   var failureResponse = {
      //     data: {}
      //   };

      //   var heatingDate = 20102010201;
      //   // HttpFactoryDeferred.reject(failureResponse);
      //   // $rootScope.$apply();

      //   // expect(controller.getWeekleyData).toBeDefined();
      //   // controller.getWeekleyData(heatingDate);

      // });

      //TODO - fix test case
      // it(' openCaseViewer  failureResponse ', function () {
      //   var serialNumber="05002563", appealNumber="2019201010";
      //   expect(controller.openCaseViewer).toBeDefined();
      //   controller.openCaseViewer(serialNumber, appealNumber);

      // });

    });
  });
})();
