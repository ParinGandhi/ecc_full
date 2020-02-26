(function() {
  'use strict';

  angular
    .module('ptabe2e')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
