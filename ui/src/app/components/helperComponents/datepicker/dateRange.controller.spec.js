(function () {
    'use strict';
  
    describe('DateRangeController', function () {
  
      beforeEach(module('ptabe2e'));
      var $controller;
      var vm = this;
      var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
      var controller, scope, $rootScope;
      var timeout;
      var $httpBackend, spy, $q, HttpFactoryDeferred, successResponse, failureResponse, items;
  
      beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, HttpFactory) {
        $q = _$q_;
        $controller = _$controller_;
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        HttpFactoryDeferred = _$q_.defer();
        spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);
  
        $rootScope.userInfo = {
          roleDescription: "PARALEGALS"
        } 
        controller = $controller('DateRangeController', {
          $scope: scope,
          ngDialog: ngDialog,
          $rootScope: _$rootScope_,
          HttpFactory: HttpFactory,
          items:items
  
        });
      }));
  
      describe('DateRangeController ', function () {
  
        it('it should call confirm  ', function () {
    
            scope.startDate = null;
            scope.endDate = null;
            expect(controller['confirm']).toBeDefined();
            controller.confirm();
        });

        it('it should call confirm  ', function () {
            scope.startDate = "2015";
            scope.endDate = "2015";
            expect(controller['confirm']).toBeDefined();
            controller.confirm();
        });
  
      });
    });
  })();
  