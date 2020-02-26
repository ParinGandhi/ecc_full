(function () {
  'use strict';

  angular
    .module('ptabe2e')
    .factory('getEnvironment', function ($log) {
      var environment = location.protocol;
      environment += "//";
      if (location.host.indexOf("localhost") >= 0) {
        environment += "localhost:8080";
      } else {
        environment += location.host;
      }
      $log.log("Environment: " + environment);
      return environment;
    })
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      }).when('/Submitted cases with milestone dates/', {
        templateUrl: 'app/reportWindow/milestoneDates.html',
        controller: 'MilestoneDatesController',
        controllerAs: 'vm'
      }).when('/Submitted cases with waived preliminary response/', {
        templateUrl: 'app/reportWindow/waivedPreliminaryResponse.html',
        controller: 'WaivedPreliminaryResponseController',
        controllerAs: 'vm'
      }).when('/Pending cases that are assigned to APJ with average pendency/', {
        templateUrl: 'app/reportWindow/averagePendency.html',
        controller: 'AveragePendencyController',
        controllerAs: 'vm'
      }).when('/Pending cases that have less than three judges/', {
        templateUrl: 'app/reportWindow/lessThanThreeJudges.html',
        controller: 'LessThanThreeJudgesController',
        controllerAs: 'vm'
      }).when('/viewReport/:userId/judgeName=:judgesAssigned', {
        templateUrl: 'app/reportWindow/averagePendencyRoleBased.html',
        controller: 'averagePendencyRoleBasedController',
        controllerAs: 'vm'
      }).when('/importManager/', {
        templateUrl: 'app/importManager/importPreAppealManager.html',
        controller: 'ImportPreAppealManagerController',
        controllerAs: 'vm'
      }).when('/caseViewer/:applicationNumber/:caseNumber/:scrollToId', {
        templateUrl: 'app/caseViewer/caseViewer.html',
        controller: 'CaseViewerController',
        controllerAs: 'vm'
      }).when('/caseViewer/:applicationNumber/:caseNumber', {
        templateUrl: 'app/caseViewer/caseViewer.html',
        controller: 'CaseViewerController',
        controllerAs: 'vm'
      }).when('/caseViewer/:applicationNumber', {
        templateUrl: 'app/caseViewer/caseViewer.html',
        controller: 'CaseViewerController',
        controllerAs: 'vm'
      }).when('/hearingSchedule/:hearingdate', {
        templateUrl: 'app/components/helperComponents/hearingSchedule/hearingSchedule.html',
        controller: 'HearingScheduleController',
        controllerAs: 'vm'
      }).when('/postDecisionManager/', {
        templateUrl: 'app/importManager/postDecisionCaseManager.html',
        controller: 'PostDecisionCaseManagerController',
        controllerAs: 'vm'
      }).when('/circulation/:assignmentId', {
        templateUrl: 'app/circulation/circulation.html',
        controller: 'CirculationManagerController',
        controllerAs: 'vm'
      }).when('/circulation/:applicationNumber/:caseNumber', {
        templateUrl: 'app/circulation/circulation.html',
        controller: 'CirculationManagerController',
        controllerAs: 'vm'
      }).when('/caseViewer/', {
        templateUrl: 'app/caseViewer/caseViewerGuest/caseViewerGuest.html',
        controller: 'CaseViewerGuestController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
