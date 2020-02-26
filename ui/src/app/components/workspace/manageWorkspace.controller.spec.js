(function () {
  'use strict';

  describe('ManageWorkSpaceController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var $rootScope, scope;
    var controller, newWorkspaceOrder;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll', 'open']);
    var items = [{
      "tooltip": "test",
      "currentWorkspaceOrderNumber": 1,
      "userWorkspaceIdentifier": "pgandhi"
    }];

    newWorkspaceOrder = [{
      "tooltip": "test",
      "currentWorkspaceOrderNumber": 1,
      "userWorkspaceIdentifier": "cdanda"
    }]
    var CONSTANTS;
    var timeout;
    var user;

    beforeEach(inject(function (_$controller_, _$timeout_, _$rootScope_) {
      timeout = _$timeout_;
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;

      ngDialog.open.and.returnValue({
        closePromise: {
          then: function (callback1, callback2) {
            callback1();
            callback2();
          }
        }
      });

      controller = $controller('ManageWorkSpaceController', {
        ngDialog: ngDialog,
        items: items,
        user: user,
        $scope: scope
      });
    }));

    describe('ManageWorkSpaceController', function () {
      it('should invoke listItemUp', function () {
        expect(controller.listItemUp).toBeDefined;
        controller.listItemUp();
      });
      it('should invoke listItemDown', function () {
        expect(controller.listItemDown).toBeDefined;
        controller.listItemDown();
      });
      it('should invoke cancelManageWorkspaceModal', function () {
        expect(controller.cancelManageWorkspaceModal).toBeDefined();
        controller.cancelManageWorkspaceModal();
        expect(ngDialog.open).toBeDefined();
        //expect(ngDialog.open).toHaveBeenCalled();

      });
      it('should invoke listItemDown', function () {
        expect(controller.saveWorkspace).toBeDefined;
        controller.saveWorkspace();
      });
    });
  });
})();
