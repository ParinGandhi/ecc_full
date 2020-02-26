(function () {
  'use strict';

  describe('src/app/main/getUser.controller.spec.js', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
    var userInfo;
    var controller;
    var timeout;

    beforeEach(inject(function (_$controller_, _$timeout_) {
      timeout = _$timeout_;
      $controller = _$controller_;
      controller = $controller('GetUserInfoController', {
        ngDialog: ngDialog,
        userInfo: userInfo
      });
    }));

    describe('Initializations', function () {
      it('should initialize workspace', function () {
        expect(vm.workspaces).toBeDefined;
      });
    });

    describe('checking functions', function () {

      it('it should call focus', function () {

        var dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        spyOn(document.getElementById("workNumber"), 'focus');
        expect(document.getElementById("workNumber").focus).toBeDefined();
        expect(controller['focus']).toBeDefined();
        controller.focus();
        timeout.flush();
        expect(dummyElement.focus).toHaveBeenCalled();

      });

      it('Should invoke getWorker', function () {
        var event = {};
        event.keyCode = 13;

        spyOn(controller, 'getWorker');
        expect(controller['getWorker']).toBeDefined();
        expect(controller['pressEnter']).toBeDefined();
        controller.pressEnter(event);
        expect(controller.getWorker).toHaveBeenCalled();
      });

      it('Should not invoke getWorker', function () {
        var event = {};
        event.keyCode = 14;

        spyOn(controller, 'getWorker');
        expect(controller['getWorker']).toBeDefined();
        expect(controller['pressEnter']).toBeDefined();
        controller.pressEnter(event);
        expect(controller.getWorker).not.toHaveBeenCalled();
      });

      it('Should invoke dismiss on ngDialog', function () {
        expect(ngDialog.closeAll).toBeDefined();
        expect(controller['cancelAddWorkspaceModal']).toBeDefined();
        controller.cancelAddWorkspaceModal();
        expect(ngDialog.closeAll).toHaveBeenCalledWith();

      });

      it('Should invoke close on ngDialog', function () {
        expect(ngDialog.closeAll).toBeDefined();
        expect(controller['getWorker']).toBeDefined();
        controller.getWorker();
        expect(ngDialog.closeAll).toHaveBeenCalledWith(userInfo);

      });

    });

  });
})();
