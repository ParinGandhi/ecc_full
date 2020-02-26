(function () {
  'use strict';

  describe('ConfirmManagePastDateController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
    var controller;

    beforeEach(inject(function (_$controller_) {
      $controller = _$controller_;

      controller = $controller('ConfirmManagePastDateController', {
        ngDialog: ngDialog,
      });
    }));

    describe('ConfirmManagePastDateController ', function () {


      it('it should call confirmCancel ', function () {

        expect(ngDialog.closeAll).toBeDefined();
        expect(controller['confirmCancel']).toBeDefined();
        controller.confirmCancel();
        expect(ngDialog.closeAll).toHaveBeenCalledWith();

      });



    });
  });
})();
