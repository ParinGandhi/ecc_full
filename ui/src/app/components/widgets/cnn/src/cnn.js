'use strict';

angular.module('adf.widget.cnn', ['adf.provider'])
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('cnn', {
        title: 'CNN',
        description: 'CNN',
        templateUrl: '{widgetsPath}/cnn/src/cnn.html',
        edit: {
          templateUrl: '{widgetsPath}/cnn/src/edit.html'
        }
      });
  }).controller('CnnController', function ($scope, $sce) {

    var cnnHtmlToInsert = '<iframe width="580" height="315" src="https://www.youtube.com/embed/+lastest?listType=user_uploads&list=CNN" frameborder="0" allowfullscreen></iframe>';
    $scope.cnnDataUrl = $sce.trustAsHtml(cnnHtmlToInsert);


  });
