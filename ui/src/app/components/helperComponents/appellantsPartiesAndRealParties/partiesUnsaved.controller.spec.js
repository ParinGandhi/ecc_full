(function () {
  'use strict';

  describe('PartiesUnsavedController', function () {

    beforeEach(module('ptabe2e'));
    var $controller;
    var vm = this;
    var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll', 'close', 'getOpenDialogs']);
    var controller, scope, $rootScope;
    var timeout;
    var $httpBackend, spy, $q, HttpFactoryDeferred, successResponse, failureResponse;
    var selectedData, selctedThirdPartyData, newPartiesFlag, oldPartiesFlag, partiesData, aborndenFlag;
    partiesData = {
      "applicationNumber": "0600005"
    }

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, HttpFactory) {
      $q = _$q_;
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;
      HttpFactoryDeferred = _$q_.defer();
      spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);


      controller = $controller('PartiesUnsavedController', {
        $scope: scope,
        ngDialog: ngDialog,
        $rootScope: _$rootScope_,
        selectedData: selectedData,
        selctedThirdPartyData: selctedThirdPartyData,
        newPartiesFlag: newPartiesFlag,
        oldPartiesFlag: oldPartiesFlag,
        partiesData: partiesData,
        aborndenFlag: aborndenFlag,
        HttpFactory: HttpFactory

      });
    }));

    describe('PartiesUnsavedController ', function () {

      it('it should call putInventors ', function () {
        expect(scope.putInventors).toBeDefined();
        scope.putInventors();
      });


      it('it should call closeParties ', function () {

        var ngDialogArray = [ngDialog, ngDialog];
        expect(ngDialog.close).toBeDefined();
        expect(scope.closeParties).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
        scope.closeParties();
        expect(ngDialog.close).toHaveBeenCalledWith(ngDialog, true);

        expect(ngDialog.closeAll).toBeDefined();
        expect(scope.closeParties).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialog);
        scope.closeParties();
        expect(ngDialog.closeAll).toHaveBeenCalled();

      });

      it('it should call closeAllParties ', function () {
        var ngDialogArray = [ngDialog, ngDialog];
        expect(ngDialog.close).toBeDefined();
        expect(scope.closeAllParties).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialogArray);
        scope.closeAllParties();
        expect(ngDialog.close).toHaveBeenCalledWith(ngDialog, true);

        expect(ngDialog.closeAll).toBeDefined();
        expect(scope.closeAllParties).toBeDefined();
        ngDialog.getOpenDialogs.and.returnValue(ngDialog);
        scope.closeAllParties();
        expect(ngDialog.closeAll).toHaveBeenCalled();
      });

    });
  });
})();
