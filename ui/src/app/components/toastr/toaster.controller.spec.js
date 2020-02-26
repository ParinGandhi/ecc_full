(function () {
  'use strict';

  describe('ToasterController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var controller;
    var scope;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['open']);

    beforeEach(inject(function (_$controller_, _$rootScope_) {
      $controller = _$controller_;
      scope = _$rootScope_.$new();

      controller = $controller('ToasterController', {
        ngDialog: ngDialog,
        $scope: scope

      });
    }));

    describe('ToasterController ', function () {

      it('it should open toaster console', function () {
        expect(scope.openToasterConsole).toBeDefined();
        scope.openToasterConsole();

        expect(ngDialog.open).toHaveBeenCalled();

        expect(ngDialog.open.calls.count()).toBe(1);
        var args = ngDialog.open.calls.argsFor(0);
        expect(args).not.toBe(null);
        expect(args.length).toBe(1);

        expect(args[0].controller).toBe('toastCloseController');
        expect(typeof args[0].resolve).toBe('object');
        args[0].resolve.message();
        args[0].resolve.title();
        args[0].resolve.toastClass();
        args[0].resolve.toastType();

      });

    });


  });
})();
