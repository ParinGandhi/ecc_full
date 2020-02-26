(function () {
  'use strict';

  describe('datePickerDirectiveController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var controller;
    var scope, $rootScope;
    var spy;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['open', 'openConfirm']);

    beforeEach(inject(function (_$controller_, _$rootScope_, $filter) {
      scope = _$rootScope_.$new();
      $controller = _$controller_;
      $rootScope = _$rootScope_;

      ngDialog.openConfirm.and.returnValue({
        then: function (callback1, callback2) {
          callback1();
          callback2();
        }
      });

      controller = $controller('datePickerDirectiveController', {
        $scope: scope,
        $rootScope: _$rootScope_,
        $filter: $filter,
        ngDialog: ngDialog,
      });
    }));

    describe('datePickerDirectiveController ', function () {

      // it('it should call change ', function () {

      //   var thisValue = "27/10/2018";

      //   expect(scope.change).toBeDefined();
      //   scope.change();
      // });

      it('it should call clear ', function () {

        expect(scope.clear).toBeDefined();
        scope.clear();
      });

      it('it should call open1 ', function () {

        expect(scope.open1).toBeDefined();
        scope.open1();
      });

      it('it should call open2 ', function () {

        expect(scope.open2).toBeDefined();
        scope.open2();
      });

      it('it should call setDate  ', function () {

        expect(scope.setDate).toBeDefined();
        scope.setDate();
      });

      //   //   it('it should call togglePopup   ', function () {

      //   //     expect(controller.togglePopup).toBeDefined();
      //   //     controller.togglePopup();
      //   //   });

      it('it should call onChange   ', function () {

        expect(controller.onChange).toBeDefined();
        controller.onChange();
      });

      it('it should call onBlur   ', function () {
        expect(controller.onBlur).toBeDefined();
        controller.selectedDate = true;
        controller.onBlur();

        expect(ngDialog.openConfirm).toHaveBeenCalled();

        expect(ngDialog.openConfirm.calls.count()).toBe(1);
        var args = ngDialog.openConfirm.calls.argsFor(0);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('ConfirmManagePastDateController');
        // expect(typeof args[0].resolve).toBe('object');
        // args[0].resolve.newData();
      });

      it('it should call onChange ', function () {
        // controller.selectedDate = '07/25/2018';
        // spyOn(controller, 'onDateChanged');
        // expect(controller.onDateChanged).toBeDefined();
        expect(controller.onChange).toBeDefined();
        controller.onChange();
        // expect(controller.onDateChanged).toHaveBeenCalledWith(controller.selectedDate);
      });

      it('it should call onCustomDisabled   ', function () {
        expect(controller.onCustomDisabled).toBeDefined();
        controller.customDisabled = true;
        controller.onCustomDisabled();
      });

      it('it should call onCustomDisabled   ', function () {
        expect(controller.onCustomDisabled).toBeDefined();
        controller.customDisabled = false;
        controller.onCustomDisabled();
      });

      it('it should call onBlur   ', function () {
        expect(controller.onBlur).toBeDefined();
        controller.selectedDate = false;
        controller.onBlur();
      });

    });


  });
})();
