(function () {
    'use strict';
  
    describe('HearingDateController', function () {
  
      beforeEach(module('ptabe2e'));
      var $controller;
      var vm = this;
      var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
      var controller, scope, $rootScope;
      var timeout;
      var $httpBackend, spy, $q, HttpFactoryDeferred, successResponse, failureResponse;
      var hearingData;
  
  
      beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, HttpFactory) {
        $q = _$q_;
        $controller = _$controller_;
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        HttpFactoryDeferred = _$q_.defer();
        spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);
  
  
        controller = $controller('HearingDateController', {
          $scope: scope,
          ngDialog: ngDialog,
          $rootScope: _$rootScope_,
          HttpFactory: HttpFactory,
          hearingData: hearingData
  
        });
      }));
  
      describe('HearingDateController ', function () {
  
        it('it should call openHearingSchedule ', function () {
            scope.hearingDateTime = null;
            expect(ngDialog.closeAll).toBeDefined();
            expect(controller['openHearingSchedule']).toBeDefined();
            controller.openHearingSchedule();
            expect(ngDialog.closeAll).toHaveBeenCalledWith(scope.hearingDateTime);
        });
  
      });
    });
  })();
  