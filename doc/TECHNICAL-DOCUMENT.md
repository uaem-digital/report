Frontend Technical Document
===========================

## Project overview
  - Project summary

## Source control
  - GIT repository @ [http://url](http://url)

## Technical used
  - HTML5
  - CSS3
  - JavaScript
  - Build tools
    + NodeJS
    + Grunt
    + Gulp
    + CoffeeScript
    + Jade
    + Less
  - Frameworks
    + Bootstrap
    + jQuery
    + AngularJS
    + BackboneJS
    + EmberJS
  - Plugins
    + Form validation @ [http://jqueryvalidation.org](http://jqueryvalidation.org)
    + Slider @ [http://bxslider.com](http://bxslider.com)
    + Lightbox @ [http://fancybox.net](http://fancybox.net)
    + Custom scroll @ [http://jscrollpane.kelvinluck.com](http://jscrollpane.kelvinluck.com)
    + Uploader @ [http://blueimp.github.io/jQuery-File-Upload](http://blueimp.github.io/jQuery-File-Upload)

## Web service
  - RESTFUL
  - URL @ [http://url](http://url)

## Social network integration
  - Facebook
  - Twitter
  - Youtube
  - Vimeo

## Third parties integration
  - AddThis
  - ShareThis
  - Video.js

## Web Analytics
  - Google Analytics
  - Adobe Analytics

## Browsers & Platforms supported
  - Windows 7, 8.1
    + Microsoft Internet Explorer 10, 11
    + Firefox latest
    + Chrome latest
  - Mac OSX
    + Firefox latest
    + Chrome latest
    + Safari latest

## Devices supported
  - Tablet:
    + iOS 8+ (iPad 4, iPad Air)
    + Android 4.3+ (Samsung Galaxy Tab 4 10.1)
  - Mobile:
    + iOS 8+ (iPhone 5S/6/6+)
    + Android 4.4+ (Samsung Galaxy S4/S5)

## Responsive approach
  - Breakpoints
    + Large screen: 1200 and above
    + Medium screen: 1024 to 1199
    + Small screen: 768 to 1023
    + Extra small screen: below 768

## Code standards
  - Follow Frontend code conventions
    + HTML/CSS/JS Checklist
    + On-page SEO Checklist
  - Follow W3C standards
    + HTML Validator [http://validator.w3.org](http://validator.w3.org)
    + CSS Validator [http://jigsaw.w3.org/css-validator](http://jigsaw.w3.org/css-validator)
    + Link Checker [http://validator.w3.org/checklink](http://validator.w3.org/checklink)
    + Web Accessibility [http://a11yproject.com](http://a11yproject.com)
  - Code quality tool
    + JSHint [http://jshint.com](http://jshint.com)
    + CSSLint [http://csslint.net](http://csslint.net)

## Security
  - Cross-Site Scripting (XSS)
  - Cross-Site Request Forgery (CSRF)

## Web performance
  - YSlow [http://developer.yahoo.com/yslow](http://developer.yahoo.com/yslow)
  - PageSpeed [https://developers.google.com/speed/pagespeed](https://developers.google.com/speed/pagespeed)

## Folder structure
```
frontend-template
    .gitignore
    .jadelintrc                  <!-- Validate jade files with jadelint -->
    .htmlhintrc                  <!-- Validate html files with htmlhint -->
    .csslintrc                   <!-- Validate css files with csslint -->
    .jshintrc                    <!-- Validate js files with JSHint -->
    .travis.yml
    package.json
    Gruntfile.js
    README.md
    /app                         <!-- Source code folder -->
        server.js                <!-- Node server configuration -->
        /assets
            /fonts               <!-- Contains font files -->
                fontawesome-webfont.ttf
                fontawesome-webfont.woff
                fontawesome-webfont.woff2
                FontAwesome.otf
            /icons               <!-- Contains favicon files -->
                favicon.ico
                apple-touch-icon-precomposed.png
            /images              <!-- Contains static image files -->
                transparent.png
                /upload          <!-- Contains dynamic image files -->
            /media               <!-- Contains audio/video files -->
        /scripts                 <!-- Contains js files -->
            l10n.js              <!-- Localization -->
            site.js              <!-- Main JavaScript file -->
            /plugins
                plugin.js        <!-- Contains all JavaScript plugins -->
            /libs
                detectizr.js
                handlebars-v4.0.5.js
                jquery-2.1.4.js
                modernizr.2.8.3.js
                /plugins         <!-- Contains all JavaScript authorized plugins -->
        /styles                  <!-- Contains all less files -->
            common.less
            editor.less
            fontface.less
            form.less
            mixin.less
            page.less
            plugin.less
            print.less
            responsive.less
            sprite.less
            structure.less
            style.less
            variable.less
            /libs                <!-- Contains library files -->
              grid.less
              libs.less
              reset.less
              util.less
            /blocks              <!-- Contains blocks/modules -->
              footer.less
              header.less
              block-1.less
        /views                   <!-- Contains jade files -->
            index.jade
            sitemap.jade
            template-layer.jade
            template-sprite.jade
            template-style-guide.jade
            /blocks              <!-- Contains blocks/modules -->
                header.jade
                footer.jade
                script.jade
            /layouts             <!-- Contains layout -->
                layout.jade
                template.jade
            /mixins              <!-- Contains mixins -->
                all.jade
                img.jade
                link.jade
                nav.jade
            /data                <!-- Data will be used by Ajax -->
                data.jade
                data.json
                data.xml
    /static                      <!-- Static folder is generated by Grunt -->
        apple-touch-icon-precomposed.png
        favicon-16x16.png
        index.html
        sitemap.html
        template-layer.html
        template-sprite.html
        template-style-guide.html
        /css
            libs.css
            style.css
        /data
            data.html
            data.json
            data.xml
        /fonts
            fontawesome-webfont.ttf
            fontawesome-webfont.woff
            fontawesome-webfont.woff2
        /images
            transparent.png
            /upload
        /js
            l10n.js
            libs.js
            modernizr.js
            script.js
        /media
    /doc                         <!-- Contains all documents -->
        CODE-REVIEW.md
        CODE-STANDARDS.md
        TECHNICAL-DOCUMENT.md
    /test                        <!-- Write unit tests -->
        test.js
        test.html
        /qunit
            qunit-1.13.0.css
            qunit-1.13.0.js
    /tmp                         <!-- Contains temporary files -->
      l10n.js
      plugin.js
      site.js
    /node_modules                <!-- All modules listed as dependencies -->
```

