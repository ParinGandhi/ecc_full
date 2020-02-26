(function () {
  'use strict';

  describe('EditTitleController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var $rootScope, scope;
    var vm = this;
    var controller, $http;
    var timeout;
    var successResponse;
    var $q, HttpFactoryDeferred, spy;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
    var allWorkspaces = [{
      "userWorkspaceName": "test1234",
      "currentWorkspaceOrderNumber": 1
    }];
    var title = {
      "userWorkspaceName": "test123",
      "layoutChanged": false,
      "structure": "",
      "configurationChanged": false
    };

    beforeEach(inject(function (_$controller_, _$http_, _$timeout_, _$rootScope_, _$q_, HttpFactory) {
      $q = _$q_;
      timeout = _$timeout_;
      $http = _$http_;
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;

      // setup the promise
      HttpFactoryDeferred = _$q_.defer();
      spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);
      spyOn(HttpFactory, 'putActions').and.returnValue(HttpFactoryDeferred.promise);

      controller = $controller('EditTitleController', {
        ngDialog: ngDialog,
        title: title,
        $http: $http,
        allWorkspaces: allWorkspaces,
        $scope: scope,
        $rootScope: _$rootScope_
      });
    }));

    describe('EditTitleController ', function () {

      it('it should call focus', function () {

        var dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        spyOn(document.getElementById("dashboardTitle"), 'focus');
        expect(document.getElementById("dashboardTitle").focus).toBeDefined();
        expect(controller['focus']).toBeDefined();
        controller.focus();
        timeout.flush();
        expect(dummyElement.focus).toHaveBeenCalled();

      });

      it('Should invoke focus', function () {

        spyOn(controller, 'focus');
        expect(controller['focus']).toBeDefined();

      });

      it('Should invoke clear Title', function () {

        spyOn(controller, 'checkLength');
        expect(controller['checkLength']).toBeDefined();
        controller.clearTitle();
        expect(controller.checkLength).toHaveBeenCalled();

      });

      it('Should invoke cancel add workspace modal', function () {

        controller.cancelAfterSave = true;
        expect(ngDialog.closeAll).toBeDefined();
        expect(controller['cancelAddWorkspaceModal']).toBeDefined();
        controller.cancelAddWorkspaceModal();
        expect(ngDialog.closeAll).toHaveBeenCalledWith(controller.newTitle);

        controller.cancelAfterSave = false;
        controller.cancelAddWorkspaceModal();
        expect(ngDialog.closeAll).toHaveBeenCalledWith(controller.newTitle);

      });

      it('checkLength Should update showErrorMsg', function () {

        controller.newTitle = {};
        controller.newTitle.userWorkspaceName = 'test';
        expect(controller.checkLength).toBeDefined();
        controller.checkLength();
        expect(controller.showErrorMsg).not.toBeTruthy();

        controller.newTitle.userWorkspaceName = '';
        controller.checkLength();
        expect(controller.showErrorMsg).toBeFalsy();
        expect(controller.errorMsg).toBe('The workspace title cannot be empty.');

      });
      it('should call checkForChange ', function () {

        expect(controller.checkForChange).toBeDefined();
        controller.checkForChange();
        expect(controller.changesMade).toBeTruthy();

      });

      it('should call checkForStructureChange ', function () {
        controller.newTitle = {
          "structure": "12"
        }
        controller.originalActiveWorkspace = {
          "structure": "8-4"
        }
        expect(controller.checkForStructureChange).toBeDefined();
        controller.checkForStructureChange();
      });

      it('updateWorkspace Should give showErrorMsg and invoke close on ngDialog', function () {

        controller.newTitle.userWorkspaceName = "test";
        var tempTitle = "test";
        expect(controller.updateWorkspace).toBeDefined();
        expect(ngDialog.closeAll).toBeDefined();
        controller.updateWorkspace();
        expect(ngDialog.closeAll).toHaveBeenCalledWith(controller.newTitle);

        controller.newTitle.userWorkspaceName = "test1234";
        controller.updateWorkspace();
        expect(controller.showErrorMsg).toBeTruthy();
        expect(controller.errorMsg).toBe('This workspace title already exists, please enter a unique workspace title for this workspace.');

        controller.newTitle.userWorkspaceName = "test12";
        controller.showErrorMsg = false;
        expect(ngDialog.closeAll).toBeDefined();
        controller.updateWorkspace();
        expect(ngDialog.closeAll).toHaveBeenCalled();

      });

      it('moveItem should swap origin and destination', function () {
        var origin = 0,
          destination = 1;
        var array = [{
          'userFavoritesName': 'testFavouriteOrigin',
          'userFavoritesURL': 'google.com'
        }, {
          'userFavoritesName': 'testFavouriteDest',
          'userFavoritesURL': 'bin.com'
        }];
        var arrayCopy = [{
          'userFavoritesName': 'testFavouriteOrigin',
          'userFavoritesURL': 'google.com'
        }, {
          'userFavoritesName': 'testFavouriteDest',
          'userFavoritesURL': 'bin.com'
        }];
        controller.array = array;
        expect(controller.moveItem).toBeDefined();
        controller.moveItem(array, origin, destination);

        expect(controller.array[0].userFavoritesName).not.toBe(arrayCopy[0].userFavoritesName);
        expect(controller.array[0].userFavoritesURL).not.toBe(arrayCopy[0].userFavoritesURL);

      });

      it('listUp should call move item', function () {

        var array = [{
          'userFavoritesName': 'testFavouriteOrigin',
          'userFavoritesURL': 'google.com'
        }, {
          'userFavoritesName': 'testFavouriteDest',
          'userFavoritesURL': 'bin.com'
        }];

        expect(controller.listUp).toBeDefined();
        spyOn(controller, 'moveItem');
        expect(controller['moveItem']).toBeDefined();
        controller.listUp(array, 1);
        expect(controller.moveItem).toHaveBeenCalledWith(array, 1, 0);

      });

      it('listDown should call move item', function () {
        var array = [{
          'userFavoritesName': 'testFavouriteOrigin',
          'userFavoritesURL': 'google.com'
        }, {
          'userFavoritesName': 'testFavouriteDest',
          'userFavoritesURL': 'bin.com'
        }];

        expect(controller.listDown).toBeDefined();
        spyOn(controller, 'moveItem');
        expect(controller['moveItem']).toBeDefined();
        controller.listDown(array, 1);
        expect(controller.moveItem).toHaveBeenCalledWith(array, 1, 2);

      });

      it('should call moveSourcetoDestination', function () {
        var source = [],
          destination = [],
          widget = {};

        expect(controller.moveSourcetoDestination).toBeDefined();
        controller.moveSourcetoDestination(source, destination, widget);

      });

      it('should call getWorkspaceConfig ', function () {

        successResponse = {
          data: {
            "userWorkspaceIdentifier": 4947,
            "zoneWidgetsMap": {
              "1": [{
                "userWorkspaceWidgetIdentifier": 12203,
                "widgetCustomName": "My favorites",
                "widgetPositionText": "1||0||0"
              }],
              "2": [],
              "3": [],
              "4": [],
              "5": []
            }
          }
        }
        expect(controller.getWorkspaceConfig).toBeDefined();
        controller.getWorkspaceConfig();

        HttpFactoryDeferred.resolve(successResponse);
        $rootScope.$apply();
      });

      it('should call getWorkspaceConfig  failure', function () {

        var failureResponse = {}
        expect(controller.getWorkspaceConfig).toBeDefined();
        controller.getWorkspaceConfig();

        HttpFactoryDeferred.reject(failureResponse);
        $rootScope.$apply();
      });

      it('should call getWorkspaceLayout  ', function () {

        expect(controller.getWorkspaceLayout).toBeDefined();
        controller.getWorkspaceLayout();

      });

      it('should call saveWorkspaceConfig  ', function () {
        successResponse = {
          "applicationUserData": {
            "emailAddressText": "TEST@uspto.gov",
            "firstName": "Parin",
            "lastName": "Gandhi"
          },
          "userWorkspaces": [{
            "userWorkspaceIdentifier": 4947,
            "userWorkspaceName": "testing",
            "defaultIndicator": false,
            "structure": "12-4-4-4-12",
            "currentWorkspaceOrderNumber": 2,
            "userWorkspaceWidgetsData": [{
              "userWorkspaceWidgetIdentifier": 12203,
              "widgetCustomName": "My&nbsp;favorites",
              "widgetPositionText": "1||1||0",
              "widgetHeightPixelQuality": "widgetHeightSmall",
              "configText": "{\"collapsedIndicator\":false}",
              "widgetColor": "blue",
              "widgetData": {
                "widgetIdentifier": 9,
                "widgetName": "myFavorites"
              },
              "viewLayoutData": {
                "viewLayoutIdentifier": 0,
                "descriptionText": "categoryPending"
              },
              "dataUrlText": "/user-favorites/pgandhi",
              "zoneWidth": 4
            }]
          }]
        }
        expect(controller.saveWorkspaceConfig).toBeDefined();
        controller.saveWorkspaceConfig();

        HttpFactoryDeferred.resolve(successResponse);
        $rootScope.$apply();

      });

      it('should call saveWorkspaceConfig  failure', function () {

        var failureResponse = {}
        expect(controller.saveWorkspaceConfig).toBeDefined();
        controller.saveWorkspaceConfig();

        HttpFactoryDeferred.reject(failureResponse);
        $rootScope.$apply();
      });

      it('should call closeWorkspaceSettings  ', function () {

        expect(ngDialog.closeAll).toBeDefined();
        expect(controller.closeWorkspaceSettings).toBeDefined();
        controller.closeWorkspaceSettings();
        expect(ngDialog.closeAll).toHaveBeenCalledWith(controller.newTitle);

      });

      // it('should call saveChanges if ', function () {

      //   var event, scope;
      //   event = {
      //     currentTarget: {
      //       offsetParent: {
      //         classList: {
      //           value: "inActive"
      //         }
      //       },
      //       textContent: "Cancel",
      //       id: "workspaceCloseButton"
      //     }
      //   }
      //   expect(controller.saveChanges).toBeDefined();
      //   controller.saveChanges(event, scope);

      // });

      it('should call saveChanges  else', function () {

        var event, scope;
        event = {
          currentTarget: {
            offsetParent: {
              classList: {
                value: "active"
              }
            },
            textContent: "Title and layout"
          }
        }
        controller.one = "one";
        controller.two = "one";
        controller.three = "one";
        controller.four = "one";
        controller.five = "one";

        scope = {
          content: true,
          widgetArrange: true,
          originalOne: "two",
          originalTwo: "two",
          originalThree: "two",
          originalFour: "two",
          originalFive: "two"
        }

        event.currentTarget.textContent = 'Title and layout';

        expect(controller.saveChanges).toBeDefined();
        controller.saveChanges(event, scope);

      });

      it('should call saveChanges  else', function () {

        var event, scope;
        event = {
          currentTarget: {
            offsetParent: {
              classList: {
                value: "active"
              }
            },
            textContent: "Arrange widgets"
          }
        }

        scope = {
          content: true,
          widgetArrange: true
        }

        event.currentTarget.textContent = 'Arrange widgets';

        expect(controller.saveChanges).toBeDefined();
        controller.saveChanges(event, scope);

      });

      it('should call saveChanges  else', function () {

        var event, scope;
        event = {
          currentTarget: {
            offsetParent: {
              classList: {
                value: "active"
              }
            },
            textContent: "Cancel",
            id: "workspaceCloseButton"
          }
        }

        scope = {
          content: true,
          widgetArrange: true
        }

        event.currentTarget.textContent = 'Cancel';
        event.currentTarget.id = "workspaceCloseButton";
        expect(ngDialog.closeAll).toBeDefined();
        expect(controller.saveChanges).toBeDefined();
        controller.saveChanges(event, scope);
        expect(ngDialog.closeAll).toHaveBeenCalled();

      });

    });


  });
})();
