(function () {
  'use strict';

  /*
   * Collapse the header when the user scrolls down.
   */
  function collapseHeader() {
    /*
     * Scroll events can fire a lot. So only check the scrolling one time,
     * 200ms after the scroll.
     */
    $(window).scroll(function () {
      var timeout,
        // minimum pixels to scroll before collapsing the header
        minimumScroll = 50,
        // duration of the header collapse animation in milliseconds
        duration = 200;

      if (!timeout) {
        timeout = setTimeout(function () {
          clearTimeout(timeout);
          timeout = null;
          if ($(this).scrollTop() > minimumScroll) {
            // collapse the header
            $('.uspto-header-middle').hide(duration, function () { // smooth out the transition
              $('#global-header').addClass('collapse-header');
            });
          } else {
            // restore the header
            $('.uspto-header-middle').show(duration, function () { // smooth out the transition
              $('#global-header').removeClass('collapse-header');
            });
          } // if
        }, 200);
      } // if
    });
  } // collapseHeader()

  // set up scrolling when the DOM is ready
  $(document).ready(function () {
    collapseHeader();
  });
})();
