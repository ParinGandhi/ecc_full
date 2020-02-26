(function () {
  'use strict';

  describe('AveragePendencyController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var controller, scope, $rootScope;
    var successResponse;
    var $httpBackend, spy, $q, HttpFactoryDeferred;
    var $ngDialog = jasmine.createSpyObj('ngDialog', ['open']);

    var fakeElement = function (params) {
      return {
        scope: function () {
          return {
            vm: {
              getWidgetZone: function () {

              },
              setWidgetContentHeight: function () {

              }
            }
          }
        }
      }
    };

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _$q_, HttpFactory) {
      $q = _$q_;
      scope = _$rootScope_.$new();
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $ngDialog.open.and.returnValue({
        then: function (callback1, callback2) {
          callback1();
          callback2();
        }
      });
      HttpFactoryDeferred = _$q_.defer();
      spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);
      spy = spyOn(angular, 'element').and.callFake(fakeElement);

      controller = $controller('AveragePendencyController', {
        $scope: scope,
        ngDialog: $ngDialog,
        $rootScope: _$rootScope_,
        HttpFactory: HttpFactory
      });
    }));

    describe('AveragePendencyController ', function () {

      it('it should call pendencyGridOptions', function () {

        var gridApi = {
          core: {
            on: {
              filterChanged: function () {}
            },
          },
        };
        expect(scope.pendencyGridOptions).toBeDefined();
        expect(scope.pendencyGridOptions.onRegisterApi).toBeDefined();
        scope.pendencyGridOptions.onRegisterApi(gridApi);
        expect(scope.gridApi).toBe(gridApi);
        scope.gridApi.core.on.filterChanged();

      });

      it('get Actions success response ', function () {

        successResponse = {
          data: {
            "columnDetails": [{
                "name": "judgeFullName",
                "label": "Judges Assigned",
                "typeDefinition": "String",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "averagePendency",
                "label": "Average Pendency",
                "typeDefinition": "Number",
                "defaultOrder": "desc",
                "selected": false
              }
            ],
            "caseDetailsData": [{
              "proceedingId": "27253",
              "petitionerTechcenter": null,
              "hearingDate": null,
              "proceedingNumber": null,
              "status": "Submitted"
            }]
          }

        };
        HttpFactoryDeferred.resolve(successResponse);
        $rootScope.$apply();

        expect(scope.myData).toBe(successResponse.data);
      });

      it('get Actions failureResponse ', function () {

        var failureResponse = {
          data: {}
        };
        HttpFactoryDeferred.reject(failureResponse);
        $rootScope.$apply();
      });

      it('it should call toggleFilteringPendency', function () {

        scope.pendencyGridOptions = {
          enableFiltering: true,
          data: "test"
        };
        scope.gridApi = {
          core: {
            notifyDataChange: function (val) {

            }
          },
          grid: {
            clearAllFilters: function () {

            }
          }
        };
        scope.myData = {
          caseDetailsData: {

          }
        }
        scope.showFilters = true;

        expect(scope.toggleFilteringPendency).toBeDefined();
        scope.toggleFilteringPendency();
      });

      it('sortPendencyNumber ', function () {

        var number1 = '10',
          number2 = '10';
        expect(scope.sortPendencyNumber).toBeDefined();
        scope.sortPendencyNumber(number1, number2);

        var number1 = '10',
          number2 = '20';
        scope.sortPendencyNumber(number1, number2);

        var number1 = '10',
          number2 = '5';
        scope.sortPendencyNumber(number1, number2);

      });

      it('sortPendencyNumber null check', function () {

        var number1 = null,
          number2 = null;
        expect(scope.sortPendencyNumber).toBeDefined();
        scope.sortPendencyNumber(number1, number2);

        var number1 = null,
          number2 = null;
        scope.sortPendencyNumber(number1, number2);

        var number1 = null,
          number2 = null;
        scope.sortPendencyNumber(number1, number2);

      });

      it('sortPendencyString  ', function () {

        var firstString = 'test',
          secondString = 'test';
        expect(scope.sortPendencyString).toBeDefined();
        scope.sortPendencyString(firstString, secondString);

        var firstString = 'abc',
          secondString = 'test';
        scope.sortPendencyString(firstString, secondString);

        var firstString = 'test',
          secondString = 'abc';
        scope.sortPendencyString(firstString, secondString);
      });

      it('sortPendencyString check null string ', function () {

        var firstString = null,
          secondString = null;
        expect(scope.sortPendencyString).toBeDefined();
        scope.sortPendencyString(firstString, secondString);

        var firstString = null,
          secondString = null;
        scope.sortPendencyString(firstString, secondString);

        var firstString = null,
          secondString = null;
        scope.sortPendencyString(firstString, secondString);
      });

      it('should call openPendencyReport   ', function () {

        var name = "test";
        expect(scope.openPendencyReport).toBeDefined();
        scope.openPendencyReport();

      });

      it('it should open showFilteringPendency ', function () {

        var existingCount = $ngDialog.open.calls.count();
        expect(scope.showFilteringPendency).toBeDefined();
        scope.showFilteringPendency();
        expect($ngDialog.open).toHaveBeenCalled();

        expect($ngDialog.open.calls.count()).toBe(existingCount + 1);
        var args = $ngDialog.open.calls.argsFor(existingCount);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('CommonDialogController');
      });

    });
  });
})();
