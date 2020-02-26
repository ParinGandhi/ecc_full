(function () {

  'use strict';

  angular //jshint ignore:line
    .module('ptabe2e')
    .factory('HttpFactory',

      function ($http, $q, getURL, CONSTANTS, $window) {

        /**
         * Methods this service provides
         */
        var httpFactory = {
          callWhoAmI: callWhoAmI,
          getActions: getActions,
          getUser: getUser,
          postActions: postActions,
          deletePanel: deletePanel,
          postPdf: postPdf,
          putActions: putActions,
          deleteActions: deleteActions,
          exportFile: exportFile,
          downloadzip: downloadzip,
          viewpdf: viewpdf
        };

        function getHeaderInformation() {
          return {
            "Content-Type": "application/json",
            "user-name": $window.sessionStorage.getItem("workerNumber")
          };
        }

        /**
         * This method will call the Who Am I service to retrieve user information
         * This method returns http promise to the controller.
         */
        function callWhoAmI() {

          return $http({
            url: getURL(CONSTANTS.URL.WHO_AM_I),
            method: "GET",
            withCredentials: true, // allow passing cookies
            crossDomain: true
          }).then(function (successResponse) {
            if (angular.isUndefined(successResponse.data.userId) || successResponse.data.userId === null) {
              // successResponse.data.userId = "pgandhi";
              // successResponse.data.displayName = "Parin Gandhi";
            }
            return successResponse;
          }, function (failureResponse) {
            // $window.location.href = '/#/caseViewer/';
            return $q.reject(failureResponse);

          });
        }

        /**
         * This method retrieves a list of transactions based on the URL provided
         * This method returns http promise to the controller.
         */
        function getActions(url) {

          return $http({
            url: getURL(url),
            method: "GET",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            headers: getHeaderInformation()
          }).then(function (successResponse) {
            return successResponse;
          }, function (failureResponse) {
            return $q.reject(failureResponse);
          });
        }


        /**
         * This method retrieves the user information
         * This method returns http promise to the controller.
         */
        function getUser(url) {

          return $http({
            url: getURL(url),
            method: "GET",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            headers: getHeaderInformation()
          }).then(function (successResponse) {
            return successResponse;
          }, function (failureResponse) {
            return $q.reject(failureResponse);
          });
        }


        /**
         * This method will process the appropriate transactions.
         * This method returns http promise to the controller.
         */
        function postActions(url, data) {

          return $http({
            url: getURL(url),
            method: "POST",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            data: data,
            headers: getHeaderInformation()
          }).then(function (successResponse) {
            return successResponse;
          }, function (failureResponse) {
            return $q.reject(failureResponse);
          });
        }


        /**
         * This method will process the appropriate transactions.
         * This method returns http promise to the controller.
         */
        function deletePanel(url, data) {

          return $http({
            url: getURL(url),
            method: "DELETE",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            data: data,
            headers: getHeaderInformation()
          }).then(function (successResponse) {
            return successResponse;
          }, function (failureResponse) {
            return $q.reject(failureResponse);
          });
        }

        /**
         * This method will process the pdf transactions.
         */

        function postPdf(url, data) {

          return $http({
            url: getURL(url),
            method: "POST",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            data: data,
            headers: {
              'Content-Type': undefined,
              'user-name': $window.sessionStorage.getItem("workerNumber")
            }
          }).then(function (successResponse) {
            return successResponse;
          }, function (failureResponse) {
            return $q.reject(failureResponse);
          });
        }

        /**
         * This method for viewing pdf.
         */
        function viewpdf(url) {

          return $http({
            url: getURL(url),
            method: "GET",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            responseType: 'arraybuffer',
            headers: getHeaderInformation()
          }).then(function (successResponse) {
            return successResponse;
          }, function (failureResponse) {
            return $q.reject(failureResponse);
          });
        }


        /**
         * This method will download pdf zip.
         */
        function downloadzip(url, data) {

          return $http({
            url: getURL(url),
            method: "POST",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            data: data,
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'application/json',
              'user-name': $window.sessionStorage.getItem("workerNumber")
            }
          }).then(function (successResponse) {
            return successResponse;
          }, function (failureResponse) {
            return $q.reject(failureResponse);
          });
        }


        /**
         * This method will process the appropriate transactions.
         * This method returns http promise to the controller.
         */
        function putActions(url, data) {

          return $http({
            url: getURL(url),
            method: "PUT",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            data: data,
            headers: getHeaderInformation()
          }).then(function (successResponse) {
            return successResponse;
          }, function (failureResponse) {
            return $q.reject(failureResponse);
          });
        }


        /**
         * This method will process the appropriate transactions.
         * This method returns http promise to the controller.
         */
        function deleteActions(url) {

          return $http({
            url: getURL(url),
            method: "DELETE",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            headers: getHeaderInformation()
          }).then(function (successResponse) {
            return successResponse;
          }, function (failureResponse) {
            return $q.reject(failureResponse);
          });
        }

        /**
         * This function is used to export ui grid data into an excel file
         */
        function exportFile(url, data) {
          return $http({
            url: getURL(url),
            method: "POST",
            withCredentials: true, // allow passing cookies
            crossDomain: true,
            responseType: 'arraybuffer',
            data: data
          }).success(function (data, status, headers) {
            headers = headers();

            var filename = headers['content-disposition'];
            filename = filename.slice(filename.indexOf("=") + 1);
            var contentType = headers['content-type'];

            var linkElement = document.createElement('a');
            try {
              var blob = new Blob([data], {
                type: contentType
              });
              var url = window.URL.createObjectURL(blob);

              linkElement.setAttribute('href', url);
              linkElement.setAttribute("download", filename);

              var clickEvent = new MouseEvent("click", {
                "view": window,
                "bubbles": true,
                "cancelable": false
              });
              linkElement.dispatchEvent(clickEvent);
            } catch (ex) {

            }
          }).error(function (data) {

          });
        }



        return httpFactory;
      });
})();
