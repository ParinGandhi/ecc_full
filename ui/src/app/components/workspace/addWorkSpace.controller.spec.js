(function () {
    'use strict';
  
    describe('AddWorkSpaceController', function () {

      beforeEach(module('ptabe2e'));
      var $controller;
      var vm = this;
      var $rootScope, scope;
      var controller;
      var ngDialog= jasmine.createSpyObj('ngDialog', ['closeAll']);
      var items =[{"tooltip":"test","currentWorkspaceOrderNumber":1}];
      var CONSTANTS;
      var timeout;

      beforeEach(inject(function (_$controller_, _$timeout_, _$rootScope_) {
        timeout = _$timeout_;
        $controller = _$controller_;
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
         controller = $controller('AddWorkSpaceController', {ngDialog: ngDialog, items:items,  $scope: scope});
      }));

      describe('Initializations', function(){
        it('should initialize workspace', function () {
          expect(vm.workspaces).toBeDefined;
        });
      });

        describe('addWorkSpaceController ', function() {

        it('it should call focus', function() {

        var dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        spyOn(document.getElementById("dashboardTitle"), 'focus');
        expect(document.getElementById("dashboardTitle").focus).toBeDefined();
        expect(controller['focus']).toBeDefined();
        controller.focus();
        timeout.flush();
        expect(dummyElement.focus).toHaveBeenCalled();
        
        });
          
        it('Should invoke focus', function() {
        
        spyOn(controller, 'focus');
        expect(controller['focus']).toBeDefined();

        });

        it('Should invoke clear Title', function() {                           
            spyOn(controller, 'checkLength');
            expect(controller['checkLength']).toBeDefined();
            controller.clearTitle();
            expect(controller.checkLength).toHaveBeenCalled();
        });

        it('Should invoke cancel add workspace modal', function() {  
            
          var dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
            spyOn(document.getElementById("addWorkspaceBtn"),'blur');
            expect(document.getElementById("addWorkspaceBtn").blur).toBeDefined(); 
            
            expect(controller['cancelAddWorkspaceModal']).toBeDefined();
            controller.cancelAddWorkspaceModal ();
            expect(dummyElement.blur).toHaveBeenCalled();
            expect(ngDialog.closeAll).toBeDefined();
            });

            it('checkLength Should update showErrorMsg', function() {  
            controller.workspace={};                         
            controller.workspace.userWorkspaceName='test';
            expect(controller.checkLength).toBeDefined();
            controller.checkLength();
            expect(controller.showErrorMsg).not.toBeTruthy();

            controller.workspace.userWorkspaceName='';
            controller.checkLength();
            expect(controller.showErrorMsg).toBeTruthy();
            expect(controller.errorMsg).toBe('The workspace title cannot be empty.');

            });

        
            it('addWorkspace Should update showErrorMsg', function() {  
            controller.workspaces=[{tooltip:'test'}];
                                     
            controller.workspace.userWorkspaceName='test';
            expect(controller.addWorkspace).toBeDefined();
   
            controller.addWorkspace();
            expect(controller.showErrorMsg).toBeTruthy();
            expect(controller.errorMsg).toBe('This workspace title already exists, please enter a unique workspace title for this new workspace.');

            controller.workspace.userWorkspaceName='test1';
            controller.addWorkspace();
            expect(controller.showErrorMsg).not.toBeTruthy();
            
            expect(ngDialog.closeAll).toBeDefined();
            expect(ngDialog.closeAll).toHaveBeenCalled();

            });
    });

           
    });
  })(); 
