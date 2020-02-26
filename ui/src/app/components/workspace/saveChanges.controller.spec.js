(function () {
  'use strict';

  describe('saveChangesController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll', 'getOpenDialogs', 'close']);
    var flags;
    var controller;
    var timeout, scope, spy;

    flags = {
      vm: {
        newTitle: {
          userWorkspaceName: "test",
          structure: "4-4"
        },
        one: {
          "widgetCustomName": "changed",
          "userWorkspaceWidgetIdentifier": 2183,
          "widgetPositionText": "0||0||0"
        }
      },
      setCancel: true,
      content: true,
      widgetArrange: true,
      originalOne: {
        "widgetCustomName": "Pending paneling (Master docket)",
        "userWorkspaceWidgetIdentifier": 2183,
        "widgetPositionText": "0||0||0"
      }
    }

    var fakeElement = function (params) {
      return {
        scope: function () {
          return {
            vm: {
              tempStructure: "12",
              tempTitle: "test1",
              configureUpdate: function () {

              }
            }
          }
        },
        on: function () {

        }
      }
    };


    beforeEach(inject(function (_$controller_, _$timeout_) {
      $controller = _$controller_;
      timeout = _$timeout_;
      flags = {
        vm: {
          newTitle: {
            userWorkspaceName: "test",
            structure: "4-4"
          },
          "setCancel": true,
          "content": true,
          "widgetArrange": true
        }
      }
      // mainScope.vm = {
      //   tempStructure: "4-8",
      //   tempTitle: "test1"
      // }

      spy = spyOn(angular, 'element').and.callFake(fakeElement);

      controller = $controller('saveChangesController', {
        ngDialog: ngDialog,
        $scope: scope,
        flags: flags
      });
    }));

    afterEach(function () {
      spy.and.callThrough();
    });

    describe('saveChangesController ', function () {


      it('it should call confirmCancel with cancel', function () {

        var value = 'cancel';
        var ngDialogArray = [ngDialog, ngDialog];
        expect(ngDialog.close).toBeDefined();
        expect(controller.confirmCancel).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
        controller.confirmCancel(value);
        expect(ngDialog.close).toHaveBeenCalledWith(ngDialog);

        // expect(ngDialog.close).toBeDefined();
        // expect(controller.confirmCancel).toBeDefined();
        // ngDialog.getOpenDialogs.and.returnValue(ngDialog);
        // controller.confirmCancel(value);
        // expect(ngDialog.close).toHaveBeenCalledWith();

      });


      it('it should call confirmCancel with No', function () {

        var value = 'No';
        var ngDialogArray = [ngDialog, ngDialog];
        // expect(ngDialog.close).toBeDefined();
        // expect(controller.confirmCancel).toBeDefined();
        // ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
        // controller.confirmCancel(value);
        // expect(ngDialog.close).toHaveBeenCalledWith(ngDialog);

        expect(ngDialog.close).toBeDefined();
        expect(controller.confirmCancel).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialog);
        controller.confirmCancel(value);
        expect(ngDialog.close).toHaveBeenCalledWith();

      });


      it('it should call confirmCancel with no', function () {

        var value = 'no';
        var ngDialogArray = [ngDialog, ngDialog];
        expect(ngDialog.close).toBeDefined();
        expect(controller.confirmCancel).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
        controller.confirmCancel(value);
        expect(ngDialog.close).toHaveBeenCalledWith(ngDialog);

        // expect(ngDialog.close).toBeDefined();
        // expect(controller.confirmCancel).toBeDefined();
        // ngDialog.getOpenDialogs.and.returnValue(ngDialog);
        // controller.confirmCancel(value);
        // expect(ngDialog.close).toHaveBeenCalledWith();

      });


      it('it should call confirmCancel with Yes', function () {

        var value = 'Yes';
        var ngDialogArray = [ngDialog, ngDialog];
        expect(ngDialog.close).toBeDefined();
        expect(controller.confirmCancel).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
        controller.confirmCancel(value);
        expect(ngDialog.close).toHaveBeenCalledWith(ngDialog);

        // expect(ngDialog.close).toBeDefined();
        // expect(controller.confirmCancel).toBeDefined();
        // ngDialog.getOpenDialogs.and.returnValue(ngDialog);
        // controller.confirmCancel(value);
        // expect(ngDialog.close).toHaveBeenCalledWith();

      });



      it('it should call confirmCancel with save', function () {

        var value = 'save';
        var ngDialogArray = [ngDialog, ngDialog];
        expect(ngDialog.close).toBeDefined();
        expect(controller.confirmCancel).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
        controller.confirmCancel(value);
        expect(ngDialog.close).toHaveBeenCalledWith(ngDialog);

        // expect(ngDialog.close).toBeDefined();
        // expect(controller.confirmCancel).toBeDefined();
        // ngDialog.getOpenDialogs.and.returnValue(ngDialog);
        // controller.confirmCancel(value);
        // expect(ngDialog.close).toHaveBeenCalledWith();

      });

      // it('it should call confirmCancel with value no', function () {

      //   var value1 = 'no';

      //   var ngDialogArray = [ngDialog, ngDialog];
      //   expect(ngDialog.close).toBeDefined();
      //   expect(controller.confirmCancel).toBeDefined();
      //   ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
      //   controller.confirmCancel(value1);

      //   expect(ngDialog.close).toHaveBeenCalledWith(ngDialog);


      // });

      // it('it should call confirmCancel with value Yes', function () {

      //   var value2 = 'Yes';

      //   expect(ngDialog.closeAll).toBeDefined();
      //   expect(controller.confirmCancel).toBeDefined();
      //   controller.confirmCancel(value2);
      //   expect(ngDialog.closeAll).toHaveBeenCalledWith();


      // });

      // it('it should call confirmCancel with value save', function () {

      //   var value3 = 'save';

      //   var ngDialogArray = [ngDialog, ngDialog];
      //   expect(ngDialog.close).toBeDefined();
      //   expect(controller.confirmCancel).toBeDefined();
      //   ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
      //   controller.confirmCancel(value3);

      //   expect(ngDialog.close).toHaveBeenCalledWith(ngDialog);


      // });


    });
  });
})();






// (function () {
//   'use strict';

//   describe('saveChangesController', function () {

//     beforeEach(module('ptabe2e'));
//     var $controller;
//     var vm = this;
//     var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll', 'getOpenDialogs', 'close']);
//     var flags;
//     var controller;
//     var timeout, scope;

//     flags = {
//       "setCancel": true
//     }
//     beforeEach(inject(function (_$controller_, _$timeout_) {
//       $controller = _$controller_;
//       timeout = _$timeout_;


//       controller = $controller('saveChangesController', {
//         ngDialog: ngDialog,
//         $scope: scope,
//         flags: flags
//       });
//     }));

//     describe('saveChangesController ', function () {


//       it('it should call confirmCancel ', function () {

//         var value = 'cancel';
//         expect(controller.confirmCancel).toBeDefined();
//         ngDialog.getOpenDialogs.and.returnValue(ngDialog);
//         controller.confirmCancel(value);


//       });



//     });
//   });
// })();
