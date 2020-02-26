(function () {
  'use strict';

  describe('WaivedPreliminaryResponseController', function () {

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

      controller = $controller('WaivedPreliminaryResponseController', {
        $scope: scope,
        ngDialog: $ngDialog,
        $rootScope: _$rootScope_,
        HttpFactory: HttpFactory
      });
    }));

    describe('WaivedPreliminaryResponseController ', function () {

      it('it should call waivedGridOptions', function () {

        var gridApi = {
          core: {
            on: {
              filterChanged: function () {
                // scope, callback
                // callback();
              }
            },
          },
        };
        expect(scope.waivedGridOptions).toBeDefined();
        expect(scope.waivedGridOptions.onRegisterApi).toBeDefined();
        scope.waivedGridOptions.onRegisterApi(gridApi);
        expect(scope.gridApi).toBe(gridApi);
        scope.gridApi.core.on.filterChanged();

      });

      it('get Actions success response ', function () {

        successResponse = {
          data: {
            "columnDetails": [{
                "name": "proceedingNumber",
                "label": "Proceeding Number",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "patentOwnerName",
                "label": "Patent Owner Name ",
                "typeDefinition": "String",
                "defaultOrder": "desc",
                "selected": false
              },
              {
                "name": "techCenter",
                "label": "Tech Center",
                "typeDefinition": "Number",
                "defaultOrder": "desc",
                "selected": true
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

      it('get Actions success response data process dates check', function () {

        successResponse = {
          data: {
            "columnDetails": [{
                "name": "proceedingNumber",
                "label": "Proceeding Number",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "patentOwnerName",
                "label": "Patent Owner Name ",
                "typeDefinition": "String",
                "defaultOrder": "desc",
                "selected": false
              },
              {
                "name": "techCenter",
                "label": "Tech Center",
                "typeDefinition": "Number",
                "defaultOrder": "desc",
                "selected": true
              }
            ],
            "caseDetailsData": [{
              "proceedingId": "27253",
              "petitionerTechcenter": null,
              "hearingDate": null,
              "proceedingNumber": 1453352400000,
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


      it('it should call toggle filtering waived', function () {

        scope.waivedGridOptions = {
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

        expect(scope.toggleFilteringWaived).toBeDefined();
        scope.toggleFilteringWaived();
      });

      it('sortNumberWaived ', function () {

        var waivedNumber1 = '10',
          waivedNumber2 = '10';
        expect(scope.sortNumberWaived).toBeDefined();
        scope.sortNumberWaived(waivedNumber1, waivedNumber2);

        var waivedNumber1 = '10',
          waivedNumber2 = '20';
        scope.sortNumberWaived(waivedNumber1, waivedNumber2);

        var waivedNumber1 = '10',
          waivedNumber2 = '5';
        scope.sortNumberWaived(waivedNumber1, waivedNumber2);

      });

      it('sortNumberWaived null', function () {

        var waivedNumber1 = null,
          waivedNumber2 = null;
        expect(scope.sortNumberWaived).toBeDefined();
        scope.sortNumberWaived(waivedNumber1, waivedNumber2);
      });

      it('sortDateWaived  ', function () {

        var waivedDate1 = '12/31/2005',
          waivedDate2 = '12/31/2010';
        expect(scope.sortDateWaived).toBeDefined();
        scope.sortDateWaived(waivedDate1, waivedDate2);

        var waivedDate1 = '12/31/2015',
          waivedDate2 = '12/31/2010';
        scope.sortDateWaived(waivedDate1, waivedDate2);

      });

      it('sortDateWaived  null', function () {

        var waivedDate1 = null,
          waivedDate2 = null;
        expect(scope.sortDateWaived).toBeDefined();
        scope.sortDateWaived(waivedDate1, waivedDate2);

      });

      it('waivedStringsWithNumbers ', function () {

        var waivedStr1 = "T123";
        var waivedStr2 = "T456";
        expect(scope.waivedStringsWithNumbers).toBeDefined();
        scope.waivedStringsWithNumbers(waivedStr1, waivedStr2);
      });

      it('waivedStringsWithNumbers null', function () {

        var waivedStr1 = null;
        var waivedStr2 = null;
        expect(scope.waivedStringsWithNumbers).toBeDefined();
        scope.waivedStringsWithNumbers(waivedStr1, waivedStr2);
      });

      it('it should open showFilteringWaived ', function () {

        var existingCount = $ngDialog.open.calls.count();
        expect(scope.showFilteringWaived).toBeDefined();
        scope.showFilteringWaived();
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
