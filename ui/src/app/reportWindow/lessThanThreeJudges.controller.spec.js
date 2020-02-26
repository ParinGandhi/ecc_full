(function () {
  'use strict';

  describe('LessThanThreeJudgesController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var controller;
    var scope, $rootScope, $http, $interval;
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

    beforeEach(inject(function (_$controller_, _$rootScope_, _$http_, _$httpBackend_, _$interval_, _$q_, HttpFactory) {
      $q = _$q_;
      scope = _$rootScope_.$new();
      $http = _$http_;
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
      controller = $controller('LessThanThreeJudgesController', {
        $scope: scope,
        $http: $http,
        ngDialog: $ngDialog,
        $rootScope: _$rootScope_,
        $interval: $interval,
        HttpFactory: HttpFactory
      });
    }));

    afterEach(function () {
      spy.and.callThrough();
    });

    describe('LessThanThreeJudgesController ', function () {

      it('it should call threeJudgesGridOptions', function () {

        var gridApi = {
          core: {
            on: {
              filterChanged: function () {}
            },
          },
        };
        expect(scope.threeJudgesGridOptions).toBeDefined();
        expect(scope.threeJudgesGridOptions.onRegisterApi).toBeDefined();
        scope.threeJudgesGridOptions.onRegisterApi(gridApi);
        expect(scope.gridApi).toBe(gridApi);
        scope.gridApi.core.on.filterChanged();

      });

      it('get Actions success response ', function () {

        successResponse = {
          data: {
            "columnDetails": [{
                "name": "noticeOfAccordedFilingDate",
                "label": "NOFDA Date",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "petitionerApplicationNumber",
                "label": "Petitioner's Appln #",
                "typeDefinition": "Number",
                "defaultOrder": "desc",
                "selected": false
              },
              {
                "name": "petitionerPatentNumber",
                "label": "Petitioner's Patent #",
                "typeDefinition": "String",
                "defaultOrder": "desc",
                "selected": true
              }
            ],
            "caseDetailsData": [{
              "proceedingId": "27253",
              "petitionerTechcenter": null,
              "hearingDate": null,
              "noticeOfAccordedFilingDate": null,
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
                "name": "noticeOfAccordedFilingDate",
                "label": "NOFDA Date",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "petitionerApplicationNumber",
                "label": "Petitioner's Appln #",
                "typeDefinition": "Number",
                "defaultOrder": "desc",
                "selected": false
              },
              {
                "name": "petitionerPatentNumber",
                "label": "Petitioner's Patent #",
                "typeDefinition": "String",
                "defaultOrder": "desc",
                "selected": true
              }
            ],
            "caseDetailsData": [{
              "proceedingId": "27253",
              "petitionerTechcenter": null,
              "hearingDate": null,
              "noticeOfAccordedFilingDate": 1453352400000,
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


      it('it should call toggleFilteringJudges', function () {

        scope.threeJudgesGridOptions = {
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
        expect(scope.toggleFilteringJudges).toBeDefined();
        scope.toggleFilteringJudges();
      });

      it('sortNumberFunction ', function () {

        var sortNumber1 = '10',
          sortNumber2 = '10';
        expect(scope.sortNumberFunction).toBeDefined();
        scope.sortNumberFunction(sortNumber1, sortNumber2);

        var sortNumber1 = '10',
          sortNumber2 = '20';
        scope.sortNumberFunction(sortNumber1, sortNumber2);

        var sortNumber1 = '10',
          sortNumber2 = '5';
        scope.sortNumberFunction(sortNumber1, sortNumber2);

      });

      it('sortNumberFunction null', function () {

        var sortNumber1 = null,
          sortNumber2 = null;
        expect(scope.sortNumberFunction).toBeDefined();
        scope.sortNumberFunction(sortNumber1, sortNumber2);

      });

      it('sortDateFunction  ', function () {

        var sortDate1 = '12/31/2005',
          sortDate2 = '12/31/2010';
        expect(scope.sortDateFunction).toBeDefined();
        scope.sortDateFunction(sortDate1, sortDate2);

        var sortDate1 = '12/31/2015',
          sortDate2 = '12/31/2010';
        scope.sortDateFunction(sortDate1, sortDate2);

      });

      it('sortDateFunction  null', function () {

        var sortDate1 = null,
          sortDate2 = null;
        expect(scope.sortDateFunction).toBeDefined();
        scope.sortDateFunction(sortDate1, sortDate2);

      });

      it('cmpStringsWithNumbers ', function () {

        var firstNumberString = "T123";
        var secondNumberString = "T456";
        expect(scope.cmpStringsWithNumbers).toBeDefined();
        scope.cmpStringsWithNumbers(firstNumberString, secondNumberString);

      });

      it('cmpStringsWithNumbers null', function () {

        var firstNumberString = null;
        var secondNumberString = null;
        expect(scope.cmpStringsWithNumbers).toBeDefined();
        scope.cmpStringsWithNumbers(firstNumberString, secondNumberString);

      });


      it('it should open showFilteringJudges ', function () {

        var existingCount = $ngDialog.open.calls.count();
        expect(scope.showFilteringJudges).toBeDefined();
        scope.showFilteringJudges();
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
