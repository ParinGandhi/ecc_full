'use strict';

angular.module('adf.widget.search', ['adf.provider'])
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('search', {
        title: 'Search',
        description: 'Search',
        templateUrl: '{widgetsPath}/search/src/search.html',
        edit: {
          templateUrl: '{widgetsPath}/search/src/edit.html'
        }
      });
  }).controller('SearchController', function () {

  });
