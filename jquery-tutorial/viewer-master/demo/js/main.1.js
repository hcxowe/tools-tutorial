$(function () {

  'use strict';

  var console = window.console || { log: function () {} };
  var $images = $('.docs-pictures');
  var options = {
        inline: true,
        url: 'data-original',
        navbar: false,
        title: false,
        fullscreen: false
      };

  function toggleButtons(mode) {
    if (/modal|inline|none/.test(mode)) {
      $buttons.
        find('button[data-enable]').
        prop('disabled', true).
          filter('[data-enable*="' + mode + '"]').
          prop('disabled', false);
    }
  }

  $images.viewer(options);


  toggleButtons(options.inline ? 'inline' : 'modal');

});
