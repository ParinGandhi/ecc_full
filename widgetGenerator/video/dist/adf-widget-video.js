(function(window, undefined) {'use strict';
angular.module("adf.widget.video").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/video/src/video.js","\"use strict\"; angular .module(\"adf.widget.video\", [\"adf.provider\"]) .config(function(dashboardProvider) { dashboardProvider.widget(\"video\", { title: \"Video\", description: \"Video\", templateUrl: \"{widgetsPath}/video/src/video.html\", edit: { templateUrl: \"{widgetsPath}/video/src/edit.html\" } }); }) .controller(\"VideoController\", function($scope, $sce) { var videoHtmlToInsert = \'<iframe width=560 height=315 src=https://www.youtube.com/embed/i-gMMQTt5-c frameborder=0 allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\'; $scope.videoDataUrl = $sce.trustAsHtml(videoHtmlToInsert); });");
$templateCache.put("{widgetsPath}/video/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/video/src/video.html","<div ng-controller=VideoController ng-cloak><div ng-bind-html=videoDataUrl></div></div>");}]);})(window);