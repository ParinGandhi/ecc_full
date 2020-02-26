(function () {
  'use strict';

  describe('SessionScheduleController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll', 'open']);
    var controller, scope, $rootScope, $timeout;
    var $httpBackend, spy, $q, HttpFactoryDeferred, successResponse, failureResponse;
    var sessionData = {
      "sessionDate": "01/01/2019"
    };
    var checkTargetId = {

    }


    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, HttpFactory, _$timeout_) {
      $q = _$q_;
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
      HttpFactoryDeferred = _$q_.defer();
      spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);

      ngDialog.open.and.returnValue({
        then: function (callback1) {
          callback1();
        },
        closePromise: {
          then: function () {
           // callback3(checkTargetId);
          }
        }

      });

      controller = $controller('SessionScheduleController', {
        $scope: scope,
        ngDialog: ngDialog,
        $rootScope: _$rootScope_,
        sessionData: sessionData,
        HttpFactory: HttpFactory

      });
    }));

    describe('SessionScheduleController ', function () {

      it('it should call assignedrole successResponse', function () {
        successResponse = {
          data: [{
            hearingSchdules: {
              filter: function (){

              }

              },
              status :'Confirmed - Video hearing'
          }]
        }

        expect(controller.getSessionData).toBeDefined();
        controller.getSessionData();

        // HttpFactoryDeferred.resolve(successResponse);
        // $rootScope.$apply();
      });

      it('getSessionData failureResponse ', function () {

        var failureResponse = {
          data: {}
        };

        expect(controller.getSessionData).toBeDefined();
        controller.getSessionData();
        HttpFactoryDeferred.reject(failureResponse);
        $rootScope.$apply();

      });

      it(' it should call showDateSelection ', function () {

        controller.announcement = {
          flag: null
        }
        expect(controller.showDateSelection).toBeDefined();
        controller.showDateSelection();

        expect(ngDialog.open.calls.count()).toBe(1);
        var args = ngDialog.open.calls.argsFor(0);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('HearingRoomPickerController');
        expect(typeof args[0].resolve).toBe('object');
        args[0].resolve.items();

      });

      it(' it should call showRoomPicker ', function () {

        controller.announcement = {
          flag: null
        }
        expect(controller.showRoomPicker).toBeDefined();
        controller.showRoomPicker();

        expect(ngDialog.open.calls.count()).toBe(2);
        var args = ngDialog.open.calls.argsFor(1);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('HearingRoomPickerController');
        expect(typeof args[0].resolve).toBe('object');
        args[0].resolve.items();

      });

      it(' it should call printSchedule ', function () {
        expect(controller.printSchedule).toBeDefined();
        controller.printSchedule();

        expect(ngDialog.open.calls.count()).toBe(3);
        var args = ngDialog.open.calls.argsFor(2);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);
      });

      it(' it should call editHearingSchedule ', function () {
        expect(controller.editHearingSchedule).toBeDefined();
        controller.editHearingSchedule();

        expect(ngDialog.open.calls.count()).toBe(4);
        var args = ngDialog.open.calls.argsFor(3);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('EditSessionController');
        expect(typeof args[0].resolve).toBe('object');
        args[0].resolve.items();

      });

      it(' it should call printDiv  ', function () {
        expect(controller.printDiv).toBeDefined();
        controller.printDiv();
      });

      it(' it should call openCaseViewer  ', function () {
        var serialNumber = "06005210", appealNumber = "2019102010";
        expect(controller.openCaseViewer).toBeDefined();
        controller.openCaseViewer(serialNumber, appealNumber);
      });

    });
  });
})();
