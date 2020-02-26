'use strict';

angular.module('adf.widget.map', ['adf.provider'])
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('map', {
        title: 'Map',
        description: 'Map',
        templateUrl: '{widgetsPath}/map/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/map/src/map.html'
        }
      });
  }).controller('MapsController', function ($scope, $sce) {

    var htmlToInsert = '<iframe width="100%" src="https://www.arcgis.com/home/webscene/viewer.html?webscene=91b46c2b162c48dba264b2190e1dbcff" frameborder="0" style="height:58vh"></iframe>';
    $scope.mapDataUrl = $sce.trustAsHtml(htmlToInsert);

  });
