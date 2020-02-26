'use strict';

angular.module('adf.widget.bbc', ['adf.provider'])
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('bbc', {
        title: 'BBC',
        description: 'BBC',
        templateUrl: '{widgetsPath}/bbc/src/bbc.html',
        edit: {
          templateUrl: '{widgetsPath}/bbc/src/edit.html'
        }
      });
  }).controller('BbcController', function ($scope, $sce) {

    var bbcHtmlToInsert = `<iframe width="580" height="315" src="https://www.youtube.com/embed/+lastest?listType=user_uploads&list=bbcnews" frameborder="0" allowfullscreen></iframe>`;
    $scope.bbcDataUrl = $sce.trustAsHtml(bbcHtmlToInsert);

  });
