(function () {
  'use strict';

  describe('MainController', function () {

    beforeEach(module('ptabe2e'));

    var vm = this;
    var scope;
    var controller, $controller;
    var $http, $interval, $log, $rootScope, spy;
    var $q, HttpFactoryDeferred;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll', 'getOpenDialogs', 'close', 'open', 'openConfirm']);
    var controller, scope, $rootScope;
    var timeout, activeWorkspace, workspaces;

    var successResponse;
    var $httpBackend, spy, $q, HttpFactoryDeferred;

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

    var workerNumber = {
      value: "pgandhi"
    }

    var selectedLayout = {
      value: {
        currentWorkspaceOrderNumber: 1
      }

    }

    activeWorkspace = {
      userWorkspaceIdentifier: "pgandhi",
      currentWorkspaceOrderNumber: 1
    }

    beforeEach(inject(function (_$controller_, _$http_, _$rootScope_, _$interval_, $compile, _$q_, HttpFactory, CONSTANTS) {
      $q = _$q_;
      $http = _$http_;
      scope = _$rootScope_.$new();
      $interval = _$interval_;
      $rootScope = _$rootScope_;

      // setup the promise
      HttpFactoryDeferred = _$q_.defer();
      spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);
      spy = spyOn(angular, 'element').and.callFake(fakeElement);

      $controller = _$controller_;
      ngDialog.open.and.returnValue({
        closePromise: {
          then: function (callback1, callback2) {
            callback1(workerNumber);
            callback2(selectedLayout);
          }
        },
        then: function (callback3, callback4) {
          callback3();
          callback4();
        }
      });

      workspaces = [{}, {}]

      controller = $controller('MainController', {
        $log: $log,
        $http: $http,
        ngDialog: ngDialog,
        $scope: scope,
        $rootScope: _$rootScope_,
        $interval: $interval,
        HttpFactory: HttpFactory

      });

      spyOn($rootScope, '$on').and.callThrough();
    }));


    afterEach(function () {
      spy.and.callThrough();
    });


    describe('Should call MainController ', function () {

      it('should call checkHeight ', function () {
        expect(controller.checkHeight).toBeDefined();
        controller.checkHeight();
      });


      //TODO - fix test case
      // it('should call getUserInfo', function () {

      //   controller.userInfo = {

      //   }
      //   controller.workerNumber = "pgandhi"

      //   expect(controller.getUserInfo).toBeDefined();
      //   controller.getUserInfo();

      // });

      it('should call reloadScreen', function () {

        controller.userInfo = {
          "userId": "pgandhi"
        }
        expect(controller.reloadScreen).toBeDefined();
        controller.reloadScreen();

      });

      it('should call updateWorkspaces', function () {
        controller.userInfo = {
          "userId": "pgandhi"
        }
        // successResponse = {
        //   data: {
        //     "applicationUserData": {
        //       "emailAddressText": "TEST@uspto.gov",
        //       "firstName": "Parin",
        //       "lastName": "Gandhi"
        //     },
        //     "userWorkspaces": [{
        //       "userWorkspaceIdentifier": 4946,
        //       "userWorkspaceName": "Test&nbsp;09.05.2018",
        //       "defaultIndicator": true,
        //       "structure": "8-4",
        //       "currentWorkspaceOrderNumber": 0,
        //       "userWorkspaceWidgetsData": [{
        //           "userWorkspaceWidgetIdentifier": 12208,
        //           "widgetCustomName": "Assignment&nbsp;docket",
        //           "widgetPositionText": "0||0||0",
        //           "widgetHeightPixelQuality": "widgetHeightMedium",
        //           "configText": "{\"collapsedIndicator\":false}",
        //           "widgetColor": "blue",
        //           "widgetData": {
        //             "widgetIdentifier": 21,
        //             "widgetName": "assignmentBasedDocket"
        //           },
        //           "viewLayoutData": {
        //             "viewLayoutIdentifier": 0,
        //             "descriptionText": "categoryPending"
        //           },
        //           "dataUrlText": "my_assignments:/docket/fetch-assignment-docket/12208,team_assignments:/docket/fetch-assignment-docket/12208?hierarchy=team,group_assignments:/docket/fetch-assignment-docket/12208?hierarchy=group",
        //           "zoneWidth": 8
        //         },
        //         {
        //           "userWorkspaceWidgetIdentifier": 12251,
        //           "widgetCustomName": "Assignments",
        //           "widgetPositionText": "0||0||1",
        //           "widgetHeightPixelQuality": "widgetHeightMedium",
        //           "configText": "{\"collapsedIndicator\":false}",
        //           "widgetColor": "blue",
        //           "widgetData": {
        //             "widgetIdentifier": 7,
        //             "widgetName": "assignments"
        //           },
        //           "viewLayoutData": {
        //             "viewLayoutIdentifier": 0,
        //             "descriptionText": "categoryPending"
        //           },
        //           "dataUrlText": "my_assignments:/assignments/fetch-assignments-for-employee/12251,team_assignments:/assignments/fetch-assignments-for-employee/12251?hierarchy=team,group_assignments:/assignments/fetch-assignments-for-employee/12251?hierarchy=group",
        //           "zoneWidth": 8
        //         }
        //       ]
        //     }]
        //   }

        // };
        // HttpFactoryDeferred.resolve(successResponse);
        // $rootScope.$apply();

        expect(controller.updateWorkspaces).toBeDefined();
        controller.updateWorkspaces();
      });

      it('should call setWidgetContentHeight ', function () {
        var definition = {
          widgetHeightPixelQuality: "375px",
          height: "smallheight"
        }
        expect(controller.setWidgetContentHeight).toBeDefined();
        controller.setWidgetContentHeight(definition);
      });

      it('should call collapseAll ', function () {
        expect(controller.collapseAll).toBeDefined();
        controller.collapseAll();
      });

      it('should call open', function () {

        expect(controller.open).toBeDefined();
        controller.open();

        expect(ngDialog.open).toHaveBeenCalled();

        expect(ngDialog.open.calls.count()).toBe(1);
        var args = ngDialog.open.calls.argsFor(0);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('AddWidgetController');
        expect(typeof args[0].resolve).toBe('object');
        args[0].resolve.selectedWidgetToCopy();

      });

      it('should call toggleEditMode', function () {
        expect(controller.toggleEditMode).toBeDefined();
        controller.toggleEditMode();
      });


      it('should call openAddWorkspaceModal', function () {

        controller.userInfo = {
          "userId": "pgandhi"
        }
        controller.workspaces = {}

        expect(controller.openAddWorkspaceModal).toBeDefined();
        controller.openAddWorkspaceModal();

        expect(ngDialog.open).toHaveBeenCalled();

        expect(ngDialog.open.calls.count()).toBe(2);
        var args = ngDialog.open.calls.argsFor(1);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('AddWorkSpaceController');
        expect(typeof args[0].resolve).toBe('object');
        args[0].resolve.items();

      });

      // it('should call deleteWorkspace', function () {

      //   controller.workspaces = {}
      //   var activeWorkspace = {
      //     userWorkspaceIdentifier: "pgandhi"
      //   }
      //   expect(controller.deleteWorkspace).toBeDefined();
      //   controller.deleteWorkspace();

      //   expect(ngDialog.open).toHaveBeenCalled();

      //   expect(ngDialog.open.calls.count()).toBe(15);
      //   var args = ngDialog.open.calls.argsFor(14);
      //   expect(args).not.toBe(null);
      //   expect(args.length).toBe(1);

      //   expect(args[0].controller).toBe('DeleteWorkSpaceController');
      //   expect(typeof args[0].resolve).toBe('object');
      //   args[0].resolve.items();
      //   args[0].resolve.work();

      // });

      it('should call openManageWorkspaceModal', function () {

        controller.workspaces = {}
        controller.userInfo = {
          "userId": "pgandhi"
        }
        expect(controller.openManageWorkspaceModal).toBeDefined();
        controller.openManageWorkspaceModal();

        expect(ngDialog.open).toHaveBeenCalled();

        expect(ngDialog.open.calls.count()).toBe(3);
        var args = ngDialog.open.calls.argsFor(2);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('ManageWorkSpaceController');
        expect(typeof args[0].resolve).toBe('object');
        args[0].resolve.items();
        args[0].resolve.user();

      });

      it('should call setActiveWorkspace', function () {
        expect(controller.setActiveWorkspace).toBeDefined();
        controller.setActiveWorkspace();
      });

      //   it('should call setCurrentWorkspaceAsDefault', function () {
      //     expect(controller.setCurrentWorkspaceAsDefault).toBeDefined();
      //     controller.setCurrentWorkspaceAsDefault();
      //   });

      it('should call updateWorkspace', function () {
        var workspace = {
          layoutChanged: 'yes',
          currentWorkspaceOrderNumber: 1
        }

        controller.userInfo = {
          "userId": "pgandhi"
        }

        controller.workspacesMoved = true;
        expect(controller.updateWorkspace).toBeDefined();
        controller.updateWorkspace(workspace);
      });

      it('should call editWidgets', function () {
        expect(controller.editWidgets).toBeDefined();
        controller.editWidgets();
      });

      it('should call doneEditing', function () {
        expect(controller.doneEditing).toBeDefined();
        controller.doneEditing();
      });

      it('should call getWidgetZone', function () {
        expect(controller.getWidgetZone).toBeDefined();
        controller.getWidgetZone();
      });

      it('should call keyPressForTabs 13', function () {
        var event = {
          keyCode: 13
        }
        var index = 1;
        controller.workspaces[1] = {
          active: "active"
        }
        expect(controller.keyPressForTabs).toBeDefined();
        controller.keyPressForTabs(event, index);
      });


      it('should call keyPressForTabs 37', function () {
        var event = {
          keyCode: 37
        }
        var index = 3;
        controller.workspaces[2] = {
          active: "active"
        }
        expect(controller.keyPressForTabs).toBeDefined();
        controller.keyPressForTabs(event, index);
      });


      it('should call keyPressForTabs 39', function () {
        var event = {
          keyCode: 39
        }
        var index = 1;
        expect(controller.keyPressForTabs).toBeDefined();
        controller.keyPressForTabs(event, index);
      });

      it('should call onKeydown 27', function () {
        var event = {
          keyCode: 27
        }
        expect(scope.onKeydown).toBeDefined();
        scope.onKeydown(event);

      });
      it('should call onKeydown 38', function () {
        var event = {
          keyCode: 38
        }
        expect(scope.onKeydown).toBeDefined();
        scope.onKeydown(event);

      });
      it('should call onKeydown 13', function () {
        var event = {
          keyCode: 13
        }
        scope.status = {
          isopen: false
        }
        expect(scope.onKeydown).toBeDefined();
        scope.onKeydown(event);

      });
      it('should call onKeydown 40', function () {
        var event = {
          keyCode: 40
        }
        expect(scope.onKeydown).toBeDefined();
        scope.onKeydown(event);

      });

      it('should call onKeydown other', function () {
        var event = {
          keyCode: 10
        }
        expect(scope.onKeydown).toBeDefined();
        scope.onKeydown(event);

      });


    });

  });
})();
