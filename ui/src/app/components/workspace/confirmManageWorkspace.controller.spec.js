(function () {
    'use strict';
  
    describe('ConfirmManageWorkSpaceController', function () {
  
      beforeEach(module('ptabe2e'));
      var $controller;
      var vm = this;
      var controller;
      var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
     
      beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;

        controller = $controller('ConfirmManageWorkSpaceController', {
          ngDialog: ngDialog
        });
      }));
  
      describe('ConfirmManageWorkSpaceController', function () {
  
        it("Should invoke close on ngDialog", function () {
            expect(ngDialog.closeAll).toBeDefined();
            expect(controller.confirmCancel).toBeDefined();
            controller.confirmCancel();
            expect(ngDialog.closeAll).toHaveBeenCalledWith();
          });
   
      });
  
  
    });
  })();
  