/* =========
 * common.js
 * ========= */

(function($, App, Handlebars) {

  'use strict';

  $(function() {

    function loadTemplateComplete(data, target) {
      return Handlebars.compile(data);
    }

    function loadDataComplete(data, target, template) {
      var dom = $(template(data)),
          initPlugin = dom.data('init-plugin');

      target.html(dom).fadeIn();
      if (initPlugin) {
        initPlugin = initPlugin.replace(/ +(?= )/g,'').split(' ');
        for (var i=0; i < initPlugin.length; i=i+1) {
          win.trigger(initPlugin[i], [data]);
        }
      }
    }

    function showLoading() {
      htmlBody.addClass('freeze');
      loadingEl.fadeIn();
    }

    function hideLoading() {
      setTimeout(function() {
        loadingEl.fadeOut(function() {
          htmlBody.removeClass('freeze');
        });
      }, delay);
    }

    var allBlock = $('[data-template]');
    var loadingEl = $('body > .loading');
    var delay = 500;
    var data = $('body > .container').data('ajax');
    var win = $(window),
        htmlBody = $('html, body');

    allBlock.each(function() {
      var block = $(this),
          template = block.data('template');
      $.when(
        $.ajax({
          url: data,
          dataType: 'json',
          cache: false
        }),
        $.ajax({
          url: template,
          dataType: 'text',
          cache: false
        }))
        .done(function(jsonData, templateData) {
          var template = loadTemplateComplete(templateData[0], block),
              slider;
          loadDataComplete(jsonData[0], block, template);
          hideLoading();
        })
        .fail(function() {
          block.fadeOut();
        });
    });
  });

}(window.jQuery, window.App, window.Handlebars));
