(function(window, undefined) {'use strict';
angular.module("adf.widget.dataAnalytics").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/dataAnalytics/src/dataAnalytics.js","\'use strict\'; angular.module(\'adf.widget.dataAnalytics\', [\'adf.provider\']) .config(function (dashboardProvider) { dashboardProvider .widget(\'dataAnalytics\', { title: \'Data Analytics\', description: \'Data Analytics\', templateUrl: \'{widgetsPath}/dataAnalytics/src/view.html\', edit: { templateUrl: \'{widgetsPath}/dataAnalytics/src/edit.html\' } }); }).controller(\'DataAnalyticsController\', function () { });");
$templateCache.put("{widgetsPath}/dataAnalytics/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/dataAnalytics/src/view.html","<div ng-controller=DataAnalyticsController><img src=https://upload.wikimedia.org/wikipedia/commons/c/ca/Blue_bar_graph.png style=width:70%></div>");}]);})(window);