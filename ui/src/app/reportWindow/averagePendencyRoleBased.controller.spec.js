(function () {
  'use strict';

  describe('averagePendencyRoleBasedController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var controller, scope, $rootScope;
    var route;
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

    beforeEach(inject(function (_$controller_, _$rootScope_, $route, _$httpBackend_, _$q_, HttpFactory) {
      $q = _$q_;
      scope = _$rootScope_.$new();
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      route = $route;

      $ngDialog.open.and.returnValue({
        then: function (callback1, callback2) {
          callback1();
          callback2();
        }
      });
      $route.current = {
        params: {
          userId: 665,
          judgesAssigned: 'test'
        }
      };
      HttpFactoryDeferred = _$q_.defer();
      spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);
      spy = spyOn(angular, 'element').and.callFake(fakeElement);

      controller = $controller('averagePendencyRoleBasedController', {
        $scope: scope,
        ngDialog: $ngDialog,
        $rootScope: _$rootScope_,
        HttpFactory: HttpFactory,
        $route: route
      });
    }));

    describe('averagePendencyRoleBasedController ', function () {

      it('it should call apjGridOptions', function () {

        var gridApi = {
          core: {
            on: {
              filterChanged: function ($scope, callback) {
                // callback();
              }
            },
          },
        };

        expect(scope.apjGridOptions).toBeDefined();
        expect(scope.apjGridOptions.onRegisterApi).toBeDefined();
        scope.apjGridOptions.onRegisterApi(gridApi);
        expect(scope.gridApi).toBe(gridApi);
        scope.gridApi.core.on.filterChanged();
      });

      it('get actions success response ', function () {

        successResponse = {
          data: {
            "columnDetails": [{
                "name": "proceedingNumber",
                "label": "AIA Review #",
                "typeDefinition": "String",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "filingDate",
                "label": "Petition Submission Date",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "noticeOfAccordedFilingDate",
                "label": "NOFDA Date",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "totalPendency",
                "label": "Total Pendency",
                "typeDefinition": "Number",
                "defaultOrder": "desc",
                "selected": false
              }
            ],
            "caseDetailsData": [{
              "pOpatentNumber": "5555555",
              "petitionerPatentNumber": null,
              "judge3Assigned": "Bisk, Jennifer ",
              "poTechCenter": "2600",
              "TERMINATIONDECISIONDT": null,
              "petitionerName": "lname1, fname1",
              "filingDate": 1453438800000,
              "petitionerTechcenter": null,
              "hearingDate": null,
              "noticeOfAccordedFilingDate": 1452834000000,
              "judge1Assigned": "Bisk, Jennifer ",
              "judge2Assigned": " Weatherly, Mitchell ",
              "accordedFilingDate": 1453352400000,
              "proceedingNumber": "IPR2016-25140",
              "patentOwnerName": "lname2, fname2",
              "petitionerApplicationNumber": null,
              "prelimRespDate": 1459051200000,
              "respondentApplicationNumber": "08183369",
              "totalPendency": null,
              "instDecisionDate": null,
              "PROCEEDINGSTATE": "1015"
            }]
          }

        };
        HttpFactoryDeferred.resolve(successResponse);
        $rootScope.$apply();

        expect(scope.myData).toBe(successResponse.data);
      });

      it('get actions success response data process dates check', function () {

        successResponse = {
          data: {
            "columnDetails": [{
                "name": "proceedingNumber",
                "label": "AIA Review #",
                "typeDefinition": "String",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "filingDate",
                "label": "Petition Submission Date",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "noticeOfAccordedFilingDate",
                "label": "NOFDA Date",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "totalPendency",
                "label": "Total Pendency",
                "typeDefinition": "Number",
                "defaultOrder": "desc",
                "selected": false
              }
            ],
            "caseDetailsData": [{
              "pOpatentNumber": "5555555",
              "petitionerPatentNumber": null,
              "judge3Assigned": "Bisk, Jennifer ",
              "poTechCenter": "2600",
              "TERMINATIONDECISIONDT": null,
              "petitionerName": "lname1, fname1",
              "filingDate": null,
              "petitionerTechcenter": null,
              "hearingDate": null,
              "noticeOfAccordedFilingDate": null,
              "judge1Assigned": "Bisk, Jennifer ",
              "judge2Assigned": " Weatherly, Mitchell ",
              "accordedFilingDate": 1453352400000,
              "proceedingNumber": "IPR2016-25140",
              "patentOwnerName": "lname2, fname2",
              "petitionerApplicationNumber": null,
              "prelimRespDate": 1459051200000,
              "respondentApplicationNumber": "08183369",
              "totalPendency": null,
              "instDecisionDate": null,
              "PROCEEDINGSTATE": "1015"
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

      it('it should call toggle filtering roles', function () {

        scope.apjGridOptions = {
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
        expect(scope.toggleFilteringRoles).toBeDefined();
        scope.toggleFilteringRoles();

      });

      it('sortNumbersForRoles ', function () {
        var firstNumber = '10',
          secondNumber = '10';
        expect(scope.sortNumbersForRoles).toBeDefined();
        scope.sortNumbersForRoles(firstNumber, secondNumber);

        var firstNumber = '10',
          secondNumber = '20';
        scope.sortNumbersForRoles(firstNumber, secondNumber);

        var firstNumber = '10',
          secondNumber = '5';
        scope.sortNumbersForRoles(firstNumber, secondNumber);
      });

      it('check null sortNumbersForRoles ', function () {
        var firstNumber = null,
          secondNumber = null;
        expect(scope.sortNumbersForRoles).toBeDefined();
        scope.sortNumbersForRoles(firstNumber, secondNumber);

        // var firstNumber = null, secondNumber = null;
        // scope.sortNumbersForRoles(firstNumber, secondNumber);

        // var firstNumber = null, secondNumber = null;
        // scope.sortNumbersForRoles(firstNumber, secondNumber);
      });

      it('sortDatesForRoles  ', function () {

        var firstDate = '12/31/2005',
          secondDate = '12/31/2010';
        expect(scope.sortDatesForRoles).toBeDefined();
        scope.sortDatesForRoles(firstDate, secondDate);

        var firstDate = '12/31/2015',
          secondDate = '12/31/2010';
        scope.sortDatesForRoles(firstDate, secondDate);

      });

      it('sortDatesForRoles null ', function () {

        var firstDate = null,
          secondDate = null;
        expect(scope.sortDatesForRoles).toBeDefined();
        scope.sortDatesForRoles(firstDate, secondDate);

        // var firstDate = '12/31/2015',
        //   secondDate = '12/31/2010';
        // scope.sortDatesForRoles(firstDate, secondDate);

      });

      it('cmpStringsWithNumbersRoles ', function () {

        var stringNumber1 = "T123";
        var stringNumber2 = "T456";
        expect(scope.cmpStringsWithNumbersRoles).toBeDefined();
        scope.cmpStringsWithNumbersRoles(stringNumber1, stringNumber2);

      });

      it('cmpStringsWithNumbersRoles ', function () {

        var stringNumber1 = null;
        var stringNumber2 = null;
        expect(scope.cmpStringsWithNumbersRoles).toBeDefined();
        scope.cmpStringsWithNumbersRoles(stringNumber1, stringNumber2);

      });

      it('it should open showFilteringRoles ', function () {

        var existingCount = $ngDialog.open.calls.count();
        expect(scope.showFilteringRoles).toBeDefined();
        scope.showFilteringRoles();
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
