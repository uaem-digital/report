/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var Site = (function($, window, undefined) {
  'use strict';

  var privateVar = null;
  var privateMethod = function() {
    // to do
  };

  return {
    publicVar: privateVar,
    publicMethod: privateMethod
  };

})(jQuery, window);

jQuery(function() {
  Site.publicMethod();
});
