(function () {
  'use strict';

  describe('toastCloseController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll']);
    var message, title, toastClass, toastType;
    var controller, scope, $rootScope;

    beforeEach(inject(function (_$controller_, _$rootScope_) {
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;

      controller = $controller('toastCloseController', {
        $scope: scope,
        ngDialog: ngDialog,
        $rootScope: _$rootScope_,
        message: message,
        title: title,
        toastClass: toastClass,
        toastType: toastType
      });
    }));

    describe('toastCloseController ', function () {

      it('it should call closeDialoggss ', function () {

        expect(ngDialog.closeAll).toBeDefined();
        expect(scope['closeDialoggss']).toBeDefined();
        scope.closeDialoggss();
        expect(ngDialog.closeAll).toHaveBeenCalledWith();

      });


    });
  });
})();
