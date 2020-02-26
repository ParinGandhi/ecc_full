(function () {
  'use strict';
  angular
    .module('ptabe2e')
    .controller('ToasterController', function ($scope, ngDialog, $log) {
      $scope.openToasterConsole = function () {
        ngDialog.open({
          template: "app/components/toastr/toastmsg.html",
          controller: 'toastCloseController',
          // scope: $scope,
          width: '25%',
           showClose: false,
          resolve: {
            message:function(){
              return $scope.message;
            },
            title:function(){
              return $scope.title;
            },
            toastClass:function(){
              return $scope.toastClass;
            },
            toastType:function(){
              return $scope.toastType;
            }
          }
        });
      };
    });
})();
