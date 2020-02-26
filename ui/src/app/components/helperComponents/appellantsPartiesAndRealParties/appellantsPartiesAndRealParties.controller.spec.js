(function () {
  'use strict';

  describe('AppellantsPartiesController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll', 'open', 'close', 'getOpenDialogs']);
    var controller, scope, $rootScope;
    var timeout;
    var $httpBackend, spy, $q, HttpFactoryDeferred, successResponse, failureResponse;
    var partiesData, partiesFlag;
    partiesData = {
      applicationNumber: "95000022"
    }
    var checkTargetId = {
      value: "assignment Info"
    }

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, HttpFactory) {
      $q = _$q_;
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;
      HttpFactoryDeferred = _$q_.defer();
      spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);

      successResponse = {
        "data": {
          "assignees": {
            "Board of Regents, The University of Texas System": "assignees"
          },
          "applicants": {
            "Board of Regents, The University of Texas System": "assignees"
          },
          "inventors": {
            "Society(1st Third Pty. Req.), American Anti-Vivisection": "inventors",
            "University of Texas System(Owner), Board of Regents, The": "inventors",
            "Assessment(2nd Third Pty. Req.), PatentWatch Project of International...": "inventors",
            "Center...Assessment(2nd Real Party In Interest), PatentWatch Project of International": "inventors",
            "6444872 ": "inventors",
            "Society(1st Real Party In Interest), American Anti-Vivisection": "inventors"
          },
          "thirdPartyRequesters": {
            "Peter T. DiMauro, Ph. D.": "thirdPartyRequesters"
          },
          "appeal": {
            "briefHearingTypeCode": "B",
            "caseDisciplineCode": "B",
            "currentStatusCode": "D1R0",
            "receivedDate": 1542582534000,
            "appellants": [
              "David"
            ],
            "realParties": [
              "Peter T. DiMauro, Ph. D.",
              "Society(1st Third Pty. Req.), American Anti-Vivisection"
            ],
            "patentOwners": [
              "6444872  et al."
            ],
            "thirdPartyRequestor": ["6444872  et al."],
            "serialNumber": "95000037",
            "appealNumber": "2019000632",
            "audit": {
              "lastModifiedTimestamp": 1542584627000,
              "lastModifiedUserIdentifier": "gandhi9",
              "createUserIdentifier": null,
              "createdUserName": null,
              "lastModifiedUserName": null,
              "createTimestamp": null,
              "lockControlNumber": 1
            }
          },
          "preAppeal": {
            "applicationNumberText": "95000037",
            "preAppealNumber": 0,
            "sequenceNumber": 1,
            "audit": {
              "lastModifiedTimestamp": 1542584626000,
              "lastModifiedUserIdentifier": "gandhi9",
              "createUserIdentifier": null,
              "createdUserName": null,
              "lastModifiedUserName": null,
              "createTimestamp": null,
              "lockControlNumber": 1
            },
            "activeIndicator": "A",
            "receivedDate": 1542582534000,
            "disciplineCode": "B",
            "manualImportIndicator": "N"
          },
          "address": {
            "physicalAddress": [{
              "nameLineOneText": "Fulbright & Jaworski LLP",
              "nameLineTwoText": "",
              "addressLineOneText": "600 Congress Avenue Suite 2400",
              "addressLineTwoText": "",
              "cityName": "Austin",
              "geographicRegionCode": "TX",
              "geographicRegionName": "TEXAS",
              "countryCode": "US",
              "countryName": "UNITED STATES",
              "postalCode": "78701"
            }],
            "telecommunication": [],
            "emails": []
          },
          "assignments": [{
            "serialNumber": "95000037",
            "sequenceNumber": 0,
            "appealNumber": "2019000632",
            "lifeCycle": null,
            "audit": {
              "lastModifiedTimestamp": 1543512975000,
              "lastModifiedUserIdentifier": "gandhi9",
              "createUserIdentifier": "gandhi9",
              "createdUserName": null,
              "lastModifiedUserName": null,
              "createTimestamp": 1542584626648,
              "lockControlNumber": 2
            },
            "assignmentIdentifier": 2922,
            "assignmentType": null,
            "assignmentTypeIdentifier": "4",
            "assignee": "5768",
            "assignor": "5768",
            "caseType": "APPEAL",
            "priorityIndicator": "N",
            "activeIndicator": "A",
            "title": "Review Checklist Assignment To POC1 for 0",
            "description": "Review Checklist Assignment To POC1 for 0",
            "notes": "testthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspacetestthelongtextwithoutspace",
            "assignedDate": 1543512975000,
            "dueDate": 1542584622000,
            "completionDate": null,
            "palmMailedDate": null,
            "standardAssignmentType": null,
            "completedUserName": null,
            "lastModifiedUserName": null,
            "noOfActiveCases": 0,
            "assignmentStatusCode": "A",
            "assigneeRoleCode": null,
            "assigneeRoleDescription": null,
            "assignmentSequence": 0,
            "reconsiderSequence": 0,
            "pendingLocationText": null,
            "assignmentTypeDescription": null,
            "completionCode": null,
            "message": null,
            "globalMetaData": null
          }],
          "currentPhase": "APPEAL",
          "gau": "1632",
          "appellant": {
            "lastName": "6444872",
            "identifier": "31752030",
            "citizenship": "US",
            "address": {
              "physicalAddress": [{
                "nameLineOneText": "6444872",
                "addressCategory": "residence"
              }],
              "telecommunication": [],
              "emails": []
            }
          }
        }
      }

      ngDialog.open.and.returnValue({
        closePromise: {
          then: function (callback1, callback2) {
            callback1(checkTargetId);
            callback2();
          }
        },
        then: function (callback3, callback4) {
          callback3();
          callback4();
        }
      });

      controller = $controller('AppellantsPartiesController', {
        $scope: scope,
        ngDialog: ngDialog,
        $rootScope: _$rootScope_,
        partiesData: partiesData,
        partiesFlag: partiesFlag,
        HttpFactory: HttpFactory

      });
    }));

    describe('AppellantsPartiesController', function () {

      it('should call getRole', function () {

        expect(scope.getRole).toBeDefined();
        HttpFactoryDeferred.resolve(successResponse);
        $rootScope.$apply();


      });

      it('should call getRole failure', function () {
        failureResponse = {

        }
        expect(scope.getRole).toBeDefined();
        HttpFactoryDeferred.reject(failureResponse);
        $rootScope.$apply();
      });


      it('should call getRealPartiesData for Parties', function () {

        scope.partiesShow = "Parties";

        expect(scope.getRealPartiesData).toBeDefined();
        HttpFactoryDeferred.resolve(successResponse);
        $rootScope.$apply();

      });

      it('should call getRealPartiesData for Appellants', function () {

        scope.partiesShow = "Appellants";

        expect(scope.getRealPartiesData).toBeDefined();
        HttpFactoryDeferred.resolve(successResponse);
        $rootScope.$apply();

      });

      it('should call getRealPartiesData for Real party in interest', function () {

        scope.partiesShow = "Real party in interest";

        expect(scope.getRealPartiesData).toBeDefined();
        HttpFactoryDeferred.resolve(successResponse);
        $rootScope.$apply();

      });



      it('it should call openUnsavedChanges ', function () {
        var event = {
          target: {
            id: 57
          }
        }
        var data;
        expect(scope.openUnsavedChanges).toBeDefined();
        scope.openUnsavedChanges(event, data);

        expect(ngDialog.open).toHaveBeenCalled();

        expect(ngDialog.open.calls.count()).toBe(1);
        var args = ngDialog.open.calls.argsFor(0);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('PartiesUnsavedController');
        expect(typeof args[0].resolve).toBe('object');
        args[0].resolve.selectedData();
        args[0].resolve.selctedThirdPartyData();
        args[0].resolve.newPartiesFlag();
        args[0].resolve.oldPartiesFlag();
        args[0].resolve.partiesData();
        args[0].resolve.aborndenFlag();
      });

      it('it should call moveSourcetoDestinationCancel ', function () {
        var data = {
          value: 'assignees'
        }
        var index;
        scope.selectedCols = [{
            value: 'assignees'
          },
          {
            value: 'applicants'
          },
          {
            value: 'inventors'
          },
          {
            value: 'thirdPartyRequesters'
          }
        ]
        scope.sortAssigneesData = [];
        scope.sortApplicantsData = [];
        scope.sortInventorsData = [];
        scope.sortThirdPartyData = [];
        expect(scope.moveSourcetoDestinationCancel).toBeDefined();
        scope.moveSourcetoDestinationCancel(data, index);


        var data = {
          value: 'applicants'
        }
        expect(scope.moveSourcetoDestinationCancel).toBeDefined();
        scope.moveSourcetoDestinationCancel(data, index);

        var data = {
          value: 'inventors'
        }
        expect(scope.moveSourcetoDestinationCancel).toBeDefined();
        scope.moveSourcetoDestinationCancel(data, index);

        var data = {
          value: 'thirdPartyRequesters'
        }
        expect(scope.moveSourcetoDestinationCancel).toBeDefined();
        scope.moveSourcetoDestinationCancel(data, index);
      });

      it('it should call moveSourcetoDestinationDataCancel ', function () {
        var data = {
          value: 'assignees'
        }
        var index;
        scope.selectedCols = [{
            value: 'assignees'
          },
          {
            value: 'applicants'
          },
          {
            value: 'inventors'
          },
          {
            value: 'thirdPartyRequesters'
          }
        ]

        scope.selectedThirdPartyCols = [{
            value: 'assignees'
          },
          {
            value: 'applicants'
          },
          {
            value: 'inventors'
          },
          {
            value: 'thirdPartyRequesters'
          }
        ]
        scope.sortAssigneesData = [];
        scope.sortApplicantsData = [];
        scope.sortInventorsData = [];
        scope.sortThirdPartyData = [];
        expect(scope.moveSourcetoDestinationDataCancel).toBeDefined();
        scope.moveSourcetoDestinationDataCancel(data, index);


        var data = {
          value: 'applicants'
        }
        expect(scope.moveSourcetoDestinationDataCancel).toBeDefined();
        scope.moveSourcetoDestinationDataCancel(data, index);

        var data = {
          value: 'inventors'
        }
        expect(scope.moveSourcetoDestinationDataCancel).toBeDefined();
        scope.moveSourcetoDestinationDataCancel(data, index);

        var data = {
          value: 'thirdPartyRequesters'
        }
        expect(scope.moveSourcetoDestinationDataCancel).toBeDefined();
        scope.moveSourcetoDestinationDataCancel(data, index);
      });

      it('it should call removeAll ', function () {
        scope.selectedCols = [{
            value: 'assignees'
          },
          {
            value: 'applicants'
          },
          {
            value: 'inventors'
          },
          {
            value: 'thirdPartyRequesters'
          }
        ]

        scope.sortAssigneesData = [];
        scope.sortApplicantsData = [];
        scope.sortInventorsData = [];
        scope.sortThirdPartyData = [];
        expect(scope.removeAll).toBeDefined();
        scope.removeAll();
      });

      it('it should call removeAllData ', function () {
        scope.selectedCols = [{
            value: 'assignees'
          },
          {
            value: 'applicants'
          },
          {
            value: 'inventors'
          },
          {
            value: 'thirdPartyRequesters'
          }
        ]

        scope.selectedThirdPartyCols = [{
            value: 'assignees'
          },
          {
            value: 'applicants'
          },
          {
            value: 'inventors'
          },
          {
            value: 'thirdPartyRequesters'
          }
        ]

        scope.sortAssigneesData = [];
        scope.sortApplicantsData = [];
        scope.sortInventorsData = [];
        scope.sortThirdPartyData = [];
        expect(scope.removeAllData).toBeDefined();
        scope.removeAllData();
      });

      it('it should call postInventors ', function () {
        scope.selectedCols = [{
            value: 'assignees'
          },
          {
            value: 'applicants'
          },
          {
            value: 'inventors'
          },
          {
            value: 'thirdPartyRequesters'
          }
        ]

        scope.selectedThirdPartyCols = [{
            value: 'assignees'
          },
          {
            value: 'applicants'
          },
          {
            value: 'inventors'
          },
          {
            value: 'thirdPartyRequesters'
          }
        ]

        scope.selectedCols = [];
        scope.postRealParties = [];

        expect(scope.postInventors).toBeDefined();
        scope.postInventors();
      });

      // it('moveItem should swap origin and destination', function () {
      //   var origin = 0,
      //     destination = 1;
      //   var array;

      //   scope.array = array;
      //   expect(scope.moveItem).toBeDefined();
      //   scope.moveItem(origin, destination);

      // });

      it('listUp should call move item', function () {

        expect(scope.listUp).toBeDefined();
        spyOn(scope, 'moveItem');
        expect(scope['moveItem']).toBeDefined();
        scope.listUp(1);
        expect(scope.moveItem).toHaveBeenCalledWith(1, undefined, NaN);

      });

      it('listDown should call move item', function () {
        expect(scope.listDown).toBeDefined();
        spyOn(scope, 'moveItem');
        expect(scope['moveItem']).toBeDefined();
        scope.listDown(1);
        expect(scope.moveItem).toHaveBeenCalledWith(1, undefined, NaN);

      });

      it('it should call checkKey with otherAppellantData greater than 0', function () {
        scope.otherAppellantData = ["one", "two"];
        scope.checkKey();
      });

      it('it should call checkKey with otherAppellantData equal to 0', function () {
        scope.otherAppellantData = [];
        scope.checkKey();
      });

      it('it should call moveSourcetoDestination for assignees data', function () {
        // scope.clickedColumn = [{
        //   "key": "Board of Regents, The University of Texas System",
        //   "value": "assignees"
        // }];
        // scope.sortAssigneesData = [{
        //   "key": "Board of Regents, The University of Texas System",
        //   "value": "assignees"
        // }];
        // scope.selectedCols = [];

        scope.moveSourcetoDestination();

      });


      it('it should call moveSourcetoDestinationData', function () {
        scope.moveSourcetoDestinationData();
      });

      it('it should call checkForTabs', function () {
        var event = {
          target: {
            id: 13
          }
        }
        scope.checkForTabs(event);
      });

      it('it should call closePartiesData', function () {

        var ngDialogArray = [ngDialog, ngDialog];
        expect(ngDialog.close).toBeDefined();
        expect(scope.closePartiesData).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
        scope.closePartiesData();
        expect(ngDialog.close).toHaveBeenCalledWith(ngDialog, true);

        expect(ngDialog.closeAll).toBeDefined();
        expect(scope.closePartiesData).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialog);
        scope.closePartiesData();
        expect(ngDialog.closeAll).toHaveBeenCalled();
      });

      it('it should call saveClosePostInventors', function () {
        scope.saveClosePostInventors();
      });

      it('it should call saveClosePostInventors', function () {
        scope.saveClosePostInventors();
      });
    });
  });
})();
