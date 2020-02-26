'use strict';

angular.module('adf.widget.dataAnalytics', ['adf.provider'])
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('dataAnalytics', {
        title: 'Data Analytics',
        description: 'Data Analytics',
        templateUrl: '{widgetsPath}/dataAnalytics/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/dataAnalytics/src/edit.html'
        }
      });
  }).controller('DataAnalyticsController', function () {

  });
