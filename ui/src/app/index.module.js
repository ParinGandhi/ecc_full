(function() {
  "use strict";

  angular
    .module("ptabe2e", [
      "ngAnimate",
      "ngCookies",
      "ngTouch",
      "ngSanitize",
      "ngMessages",
      "ngAria",
      "ngResource",
      "ngRoute",
      "ui.bootstrap",
      "toastr",
      "adf",
      "adf.widget.chat",
      "adf.widget.cnn",
      "adf.widget.bbc",
      "adf.widget.dataAnalytics",
      "adf.widget.audioChannel",
      "adf.widget.web",
      "adf.widget.search",
      "adf.widget.map",
      "adf.widget.video",
      "ui.sortable",
      "ngDialog",
      "ui.grid",
      "ui.grid.selection",
      "ui.grid.pinning",
      "ui.grid.cellNav",
      "ui.grid.pagination",
      "ui.grid.moveColumns",
      "ui.grid.resizeColumns",
      "ui.grid.saveState",
      "ui.grid.autoResize",
      "ui.grid.edit",
      "ui.tinymce",
      "ui.grid.exporter",
      "angularjs-dropdown-multiselect",
      "ui.grid.cellNav"
    ])
    .factory("context", function($location, CONSTANTS) {
      // Revision 1711

      var protocol = $location.protocol() + "://";
      var host = $location.host();
      var port = $location.port();
      var base = CONSTANTS.URL.BASE;

      if ($location.host() === "localhost") {
        return "http://localhost:8080" + base;
        // return "http://localhost:8080";
        // return 'https://ptab-services.sit.uspto.gov/PTABAppealsServices';
        // return 'https://ptab-services1.sit.uspto.gov/PTABAppealsServices';
        // return 'https://ptabe2eint-pvt.etc.uspto.gov/PTABAppealsServices';
        // return 'https://ptabe2eint-fqt.etc.uspto.gov/PTABAppealsServices';
        // + base;
        //return 'https://ptab-q318-services-eap-0.sit.uspto.gov:8443' + base;
      } else {
        return protocol + host + ":" + port + base;
      }
    })
    .factory("getURL", function(context) {
      return function(url) {
        return context + url;
      };
    });
})();
