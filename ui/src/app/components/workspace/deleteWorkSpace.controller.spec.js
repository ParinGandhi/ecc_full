(function () {
  'use strict';

  describe('DeleteWorkSpaceController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var controller;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
    var work = [{
        'userWorkspaceName': 'test1'
      },
      {
        'userWorkspaceName': 'test2'
      }
    ];;
    var items = {
      "userWorkspaceName": "test",
      "currentWorkspaceOrderNumber": 1
    };

    beforeEach(inject(function (_$controller_) {
      $controller = _$controller_;
      controller = $controller('DeleteWorkSpaceController', {
        ngDialog: ngDialog,
        items: items,
        work: work
      });
      vm = controller;
    }));

    describe('Initializations', function () {

      it('It Should initialze current and next', function () {
        items.currentWorkspaceOrderNumber = 1;
        expect(vm.current).toBeDefined();
        expect(vm.current).toBe(1);
        expect(vm.next).toBe(0);
        items.currentWorkspaceOrderNumber = 0;
        controller = $controller('DeleteWorkSpaceController', {
          ngDialog: ngDialog,
          items: items,
          work: work
        });
        vm = controller;
        expect(vm.current).toBeDefined();
        expect(vm.current).toBeDefined();
        expect(vm.current).toBe(0);
        expect(vm.next).toBe(1);
      });

    });

    describe('DeleteWorkSpaceController ', function () {


      it('confirm Delete should invoke close on ngDialog', function () {
        var response = true;
        expect(ngDialog.closeAll).toBeDefined();
        expect(controller['confirmDelete']).toBeDefined();
        controller.confirmDelete(response);
        expect(ngDialog.closeAll).toHaveBeenCalledWith(items);

        var response = false;
        controller.confirmDelete();
        expect(ngDialog.closeAll).toHaveBeenCalledWith();
      });

    });


  });
})();
