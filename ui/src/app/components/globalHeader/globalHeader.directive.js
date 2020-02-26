'use strict';
angular
.module('ptabe2e').directive('globalHeader', function ($timeout, $window) {
    return {
        restrict: 'E',
        scope: {
            customdata: '=',
            openCaseViewer: '=',
            externalurls:'=',
            callonenter:'=?',
            openApplicationList:'=?',
            status1:'='
           
        },
        templateUrl: 'app/components/globalHeader/globalHeaderDirective.html',
        link: function (scope, elm, attrs) {
        }
    };
});
