"use strict";

angular
  .module("adf.widget.video", ["adf.provider"])
  .config(function(dashboardProvider) {
    dashboardProvider.widget("video", {
      title: "Video",
      description: "Video",
      templateUrl: "{widgetsPath}/video/src/video.html",
      edit: {
        templateUrl: "{widgetsPath}/video/src/edit.html"
      }
    });
  })
  .controller("VideoController", function($scope, $sce) {
    var videoHtmlToInsert =
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/i-gMMQTt5-c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    $scope.videoDataUrl = $sce.trustAsHtml(videoHtmlToInsert);
  });
