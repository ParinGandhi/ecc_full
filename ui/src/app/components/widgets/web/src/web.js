"use strict";

angular
  .module("adf.widget.web", ["adf.provider"])
  .config(function(dashboardProvider) {
    dashboardProvider.widget("web", {
      title: "Web",
      description: "Web",
      templateUrl: "{widgetsPath}/web/src/web.html",
      edit: {
        templateUrl: "{widgetsPath}/web/src/edit.html"
      }
    });
  })
  .controller("WebController", function($scope, $sce) {
    if (angular.isDefined($scope.$parent.model)) {
      var custHeight;
      if ($scope.$parent.model.dataUrlText === "https://www.bbc.com/") {
        custHeight = "58vh;";
      } else {
        custHeight = "100vh";
      }
      var htmlToInsert =
        '<iframe width="100%" src="' +
        $scope.$parent.model.dataUrlText +
        '" frameborder="0" style="height:' +
        custHeight +
        '"></iframe>';
      $scope.webDataUrl = $sce.trustAsHtml(htmlToInsert);
      $scope.widgetIdentifier = $scope.$parent.model.widgetIdentifier;
    } else {
      /* istanbul ignore if*/
      if ($scope.definition.type === "assignments") {
        $scope.url =
          $scope.$parent.$parent.$parent.$$childHead.$$childTail.$$childHead.url;
        $scope.webDataUrl = $scope.definition.dataUrlText;
        $scope.widgetIdentifier = $scope.definition.widgetIdentifier;
      }
    }
  });
