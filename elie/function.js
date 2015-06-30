;(function ($) {
  'use strict';
  var $body = $('html,body'),
    content  = $('#main').smoothState({
        // onStart runs as soon as link has been activated
        onStart : {
          
          // Set the duration of our animation
          duration: 500,
          
          // Alterations to the page
          render: function (url,$container) {
            console.log("render");
            // Quickly toggles a class and restarts css animations
            content.toggleAnimationClass('is-exiting');
            $body.animate({'scrollTop':0});
          }
        }
      }).data('smoothState'); // makes public methods available
})(jQuery);