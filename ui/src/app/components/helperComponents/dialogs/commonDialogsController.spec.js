(function () {
    'use strict';
  
    describe('CommonDialogController', function () {
  
      beforeEach(module('ptabe2e'));
  
      var $controller;
      var vm = this;
      var scope, $rootScope;
      var controller;

      beforeEach(inject(function (_$controller_, _$rootScope_) {

        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        
        controller = $controller('CommonDialogController', {
          $scope: scope,
          $rootScope: _$rootScope_,

        });
      }));
  
      describe('checking functions', function () {
  
        it('to be defined', function () {

    
          });
      
      });
  
    });
  })();
  