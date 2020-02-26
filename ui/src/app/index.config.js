(function () {
  'use strict';

  angular
    .module('ptabe2e')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, dashboardProvider) {
    // Enable log
    $logProvider.debugEnabled(false);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 20000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = false;
    toastrConfig.newestOnTop = true;
    toastrConfig.closeHtml = '<button class="close"><span>×</span></button>';
    toastrConfig.templates = {
      toast: 'app/components/toastr/toast.html'
    };

    dashboardProvider
      .structure('4-4-4', {
        rows: [{
          columns: [{
            styleClass: 'col-md-4',
            focus: 'true'
          }, {
            styleClass: 'col-md-4'
          }, {
            styleClass: 'col-md-4'
          }]
        }]
      })
      .structure('8-4', {
        rows: [{
          columns: [{
            styleClass: 'col-md-8',
            focus: 'true'
          }, {
            styleClass: 'col-md-4'
          }]
        }]
      })
      .structure('4-8', {
        rows: [{
          columns: [{
            styleClass: 'col-md-4'
          }, {
            styleClass: 'col-md-8',
            focus: 'true'
          }]
        }]
      })
      .structure('6-6', {
        rows: [{
          columns: [{
            styleClass: 'col-md-6',
            focus: 'true'
          }, {
            styleClass: 'col-md-6'
          }]
        }]
      })
      .structure('12-4-4-4-12', {
        rows: [{
          columns: [{
            styleClass: 'col-md-12'
          }]
        }, {
          columns: [{
            styleClass: 'col-md-4',
            focus: 'true'
          }, {
            styleClass: 'col-md-4'
          }, {
            styleClass: 'col-md-4'
          }]
        }, {
          columns: [{
            styleClass: 'col-md-12'
          }]
        }]
      })
      .structure('12', {
        rows: [{
          columns: [{
            styleClass: 'col-md-12',
            focus: 'true'
          }]
        }]
      })
      .structure('12-4-8-12', {
        rows: [{
          columns: [{
            styleClass: 'col-md-12'
          }]
        }, {
          columns: [{
            styleClass: 'col-md-4'
          }, {
            styleClass: 'col-md-8',
            focus: 'true'
          }]
        }, {
          columns: [{
            styleClass: 'col-md-12'
          }]
        }]
      });
  }


})();
