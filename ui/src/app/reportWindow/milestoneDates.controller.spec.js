(function () {
  'use strict';

  describe('MilestoneDatesController', function () {

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

      controller = $controller('MilestoneDatesController', {
        $scope: scope,
        ngDialog: $ngDialog,
        $rootScope: _$rootScope_,
        HttpFactory: HttpFactory
      });
    }));

    describe('MilestoneDatesController ', function () {

      it('it should call gridOPtions', function () {

        var gridApi = {
          core: {
            on: {
              filterChanged: function () {}
            },
          },
        };
        expect(scope.gridOptions).toBeDefined();
        expect(scope.gridOptions.onRegisterApi).toBeDefined();
        scope.gridOptions.onRegisterApi(gridApi);
        expect(scope.gridApi).toBe(gridApi);
        scope.gridApi.core.on.filterChanged();

      });

      it('get actions success response ', function () {

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
                "name": "terminationDate",
                "label": "Termination Date",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": false
              },
              {
                "name": "petitionerAppId",
                "label": "Petitioner's Appln #",
                "typeDefinition": "Number",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "petitionerPatentNo",
                "label": "Petitioner's Patent #",
                "typeDefinition": "String",
                "defaultOrder": "desc",
                "selected": true
              },
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

      it('get actions success response data process dates check', function () {

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
                "name": "terminationDate",
                "label": "Termination Date",
                "typeDefinition": "Date",
                "defaultOrder": "desc",
                "selected": false
              },
              {
                "name": "petitionerAppId",
                "label": "Petitioner's Appln #",
                "typeDefinition": "Number",
                "defaultOrder": "desc",
                "selected": true
              },
              {
                "name": "petitionerPatentNo",
                "label": "Petitioner's Patent #",
                "typeDefinition": "String",
                "defaultOrder": "desc",
                "selected": true
              },
            ],
            "caseDetailsData": [{
              "proceedingId": "27253",
              "petitionerTechcenter": null,
              "hearingDate": null,
              "noticeOfAccordedFilingDate": 1453352400000,
              "status": "Submitted",
              "terminationDate": 1453352400000
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

      it('it should call toggleFilteringMilestones', function () {

        scope.gridOptions = {
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

        expect(scope.toggleFilteringMilestones).toBeDefined();
        scope.toggleFilteringMilestones();

      });

      it('sortNumberMilestones ', function () {

        var milestoneNumber1 = '10',
          milestoneNumber2 = '10';
        expect(scope.sortNumberMilestones).toBeDefined();
        scope.sortNumberMilestones(milestoneNumber1, milestoneNumber2);

        var milestoneNumber1 = '10',
          milestoneNumber2 = '20';
        scope.sortNumberMilestones(milestoneNumber1, milestoneNumber2);

        var milestoneNumber1 = '10',
          milestoneNumber2 = '5';
        scope.sortNumberMilestones(milestoneNumber1, milestoneNumber2);

      });

      it('sortNumberMilestones null', function () {

        var milestoneNumber1 = null,
          milestoneNumber2 = null;
        expect(scope.sortNumberMilestones).toBeDefined();
        scope.sortNumberMilestones(milestoneNumber1, milestoneNumber2);

      });

      it('sortDateMilestones  ', function () {

        var milestoneDate1 = '12/31/2005',
          milestoneDate2 = '12/31/2010';
        expect(scope.sortDateMilestones).toBeDefined();
        scope.sortDateMilestones(milestoneDate1, milestoneDate2);

        var milestoneDate1 = '12/31/2015',
          milestoneDate2 = '12/31/2010';
        scope.sortDateMilestones(milestoneDate1, milestoneDate2);

      });

      it('sortDateMilestones  null', function () {

        var milestoneDate1 = null,
          milestoneDate2 = null;
        expect(scope.sortDateMilestones).toBeDefined();
        scope.sortDateMilestones(milestoneDate1, milestoneDate2);

      });

      it('milestonesStringsWithNumbers ', function () {

        var milestonestr1 = "T123";
        var milestonestr2 = "T456";
        expect(scope.milestonesStringsWithNumbers).toBeDefined();
        scope.milestonesStringsWithNumbers(milestonestr1, milestonestr2);

      });

      it('milestonesStringsWithNumbers null', function () {

        var milestonestr1 = null;
        var milestonestr2 = null;
        expect(scope.milestonesStringsWithNumbers).toBeDefined();
        scope.milestonesStringsWithNumbers(milestonestr1, milestonestr2);

      });

      it('it should open showFilteringMilestones ', function () {

        var existingCount = $ngDialog.open.calls.count();
        expect(scope.showFilteringMilestones).toBeDefined();
        scope.showFilteringMilestones();
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
