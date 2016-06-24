/* =========
 * common.js
 * ========= */

(function(App, Handlebars) {
  'use strict';
  (function($, window, undifined) {

    var pluginName = 'handlebars',
        dataAjax = '[data-ajax]',
        loadingElement = $('[data-loading]'),
        loadingClass = 'loading',
        data = $(dataAjax).data('ajax'),
        win = $(window),
        countBlock = 0,
        isAddPlugins = false;

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

    function hideLoading() {
      $(dataAjax).removeClass(loadingClass);
      setTimeout(function() {
        loadingElement.addClass('hidden');
      }, 1000);
    }

    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
    }

    Plugin.prototype = {
      init: function() {
        var that = this,
            element = this.element,
            options = this.options,
            allBlock = $(options.dataTemplate);
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
              var template = loadTemplateComplete(templateData[0], block);
              loadDataComplete(jsonData[0], block, template);
              countBlock++;
              if (countBlock === allBlock.length) {
                hideLoading();
                $('[data-' + options.menuPluginName + ']')[options.menuPluginName]();
                $('[data-' + options.scrollTopPluginName + ']')[options.scrollTopPluginName]();
              }
            })
            .fail(function() {
              block.fadeOut();
            });
        });
      },
      destroy: function() {
        $.removeData(this.element[0], pluginName);
      }
    };

    $.fn[pluginName] = function(options, params) {
      return this.each(function() {
        var instance = $.data(this, pluginName);
        if (!instance) {
          $.data(this, pluginName, new Plugin(this, options));
        } else if (instance[options]) {
          instance[options](params);
        } else {
          window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      });
    };

    $.fn[pluginName].defaults = {
      dataTemplate: '[data-template]',
      scrollTopPluginName: 'scroll-top',
      menuPluginName: 'menu'
    };

    $(function() {
      $('[data-' + pluginName + ']')[pluginName]();
    });

  }(jQuery, window));

}(window.App, window.Handlebars));
