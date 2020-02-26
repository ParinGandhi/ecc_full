(function () {
    'use strict';
  
    describe('EditSessionController', function () {
  
      beforeEach(module('ptabe2e'));
      var $controller;
      var vm = this;
      var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
      var controller, scope, $rootScope;
      var timeout;
      var $httpBackend, spy, $q, HttpFactoryDeferred, successResponse, failureResponse;
      var items;
  
  
      beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, HttpFactory) {
        $q = _$q_;
        $controller = _$controller_;
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        HttpFactoryDeferred = _$q_.defer();
        spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);
  
  
        controller = $controller('EditSessionController', {
          $scope: scope,
          ngDialog: ngDialog,
          $rootScope: _$rootScope_,
          HttpFactory: HttpFactory,
          items: items
  
        });
      }));
  
      describe('EditSessionController ', function () {
  
        it(' enternohData  successResponse', function () {

          successResponse = {
            data: {
              specialTypeIndicator: "A",
              specialTypeDescription: "Active"
            }
          };
          HttpFactoryDeferred.resolve(successResponse);
          $rootScope.$apply();

          expect(controller.enternohData).toBeDefined();
          controller.enternohData();
        });
    
        it(' enternohData  failureResponse ', function () {
          var failureResponse = {
            data: {}
          };

  
          HttpFactoryDeferred.reject(failureResponse);
          $rootScope.$apply();  

          expect(controller.enternohData).toBeDefined();
          controller.enternohData();
  
        });

        it(' specialHearing  successResponse', function () {

          successResponse = {
            data: {
              specialTypeIndicator: "A",
              specialTypeDescription: "Active"
            }
          };
          HttpFactoryDeferred.resolve(successResponse);
          $rootScope.$apply();

          expect(controller.specialHearing).toBeDefined();
          controller.specialHearing();
        });
    
        it(' specialHearing  failureResponse ', function () {
          var failureResponse = {
            data: {}
          };

  
          HttpFactoryDeferred.reject(failureResponse);
          $rootScope.$apply();  

          expect(controller.specialHearing).toBeDefined();
          controller.specialHearing();
  
        });

        it(' should call  setSelectedSpecialType ', function () {
          var selectedSpecialType="A", selectedSpecialDisplay="Active";
          expect(controller.setSelectedSpecialType).toBeDefined();
          controller.setSelectedSpecialType(selectedSpecialType, selectedSpecialDisplay);
  
        });

        it(' should call  checkCalendertx ', function () {
          controller.eroh = {
            calendarNumber: ""
          }
          expect(controller.checkCalendertx).toBeDefined();
          controller.checkCalendertx();
  
        });

        it(' should call  checkCalendertx ', function () {
          controller.eroh = {
            calendarNumber: "some value"
          }
          expect(controller.checkCalendertx).toBeDefined();
          controller.checkCalendertx();
  
        });
  
      });
    });
  })();
  