var countries = ['en', 'ar'];
var concatJson = {},
  jadeCompile = [{
    expand: true,
    cwd: '<%= meta.views %>',
    src: ['index.jade', 'partials/*.jade'],
    dest: '<%= meta.build %>',
    ext: '.html'
  }];

for(var i = 0; i < countries.length; i++) {
  concatJson['<%= meta.build %>' + countries[i] + '/data/country.json'] = ['<%= meta.views %>data/open.json', '<%= meta.views %>data/header.json', '<%= meta.views %>data/footer.json', '<%= meta.views %>data/' + countries[i] + '/content-*.json', '<%= meta.views %>data/close.json'];

  jadeCompile[i + 1] = {
    expand: true,
    cwd: '<%= meta.views %>',
    src: ['country.jade'],
    dest: '<%= meta.build %>' + countries[i] + '/',
    ext: '.html'
  };
};

module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      views: 'app/views/',
      styles: 'app/styles/',
      scripts: 'app/scripts/',
      assets: 'app/assets/',
      build: 'static/',
      doc: 'doc/'
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: jadeCompile
      }
    },
    less: {
      dev: {
        options: {
          compress: false
        },
        files: [{
          '<%= meta.build %>css/libs.css': '<%= meta.styles %>libs/libs.less',
          '<%= meta.build %>css/style.css': '<%= meta.styles %>style.less'
        }]
      },
      release: {
        options: {
          compress: false
        },
        files: [{
          '<%= meta.build %>css/style.css': ['<%= meta.styles %>libs/libs.less', '<%= meta.styles %>style.less']
        }]
      }
    },
    concat: {
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': ['<%= meta.scripts %>libs/modernizr.2.8.3.js','<%= meta.scripts %>libs/detectizr.js'],
          '<%= meta.build %>js/libs.js': ['<%= meta.scripts %>libs/jquery-2.1.4.js', '<%= meta.scripts %>libs/handlebars-v4.0.5.js', '<%= meta.scripts %>libs/plugins/*.js'],
          '<%= meta.build %>js/l10n.js': '<%= meta.scripts %>l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.scripts %>site.js', '<%= meta.scripts %>plugins/*.js']
        }]
      },
      json: {
        files: [concatJson, {
          '<%= meta.build %>data/home.json': ['<%= meta.views %>data/open.json', '<%= meta.views %>data/header.json', '<%= meta.views %>data/footer.json', '<%= meta.views %>data/content-*.json', '<%= meta.views %>data/close.json']
        }]
      }
    },
    copy: {
      data: {
        files: [{
          expand: true,
          cwd: '<%= meta.views %>data/',
          src: ['**', '!*.jade', '!**/*.json'],
          dest: '<%= meta.build %>data/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>fonts/',
          src: '**',
          dest: '<%= meta.build %>fonts/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>icons/',
          src: '**',
          dest: '<%= meta.build %>'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>images/',
          src: '**',
          dest: '<%= meta.build %>images/'
        }]
      },
      media: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>media/',
          src: '**',
          dest: '<%= meta.build %>media/'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['<%= meta.scripts %>plugins/*.js']
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      files: ['<%= meta.build %>css/style.css']
    },
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      files: ['<%= meta.build %>**/*.html']
    },
    jadelint: {
      options: {
        jadelintrc: '.jadelintrc'
      },
      files: ['<%= meta.views %>**/*.jade']
    },
    watch: {
      options: {
        spawn: false,
        interrupt: false,
        livereload: true
      },
      js: {
        files: ['<%= meta.scripts %>plugins/*.js', '<%= meta.scripts %>*.js'],
        tasks: ['jshint', 'concat']
      },
      jade: {
        files: ['<%= meta.views %>**/*.jade'],
        tasks: ['jade', 'htmlhint']
      },
      data: {
        files: ['<%= meta.views %>data/**'],
        tasks: ['copy:data', 'concat:json']
      },
      less: {
        files: ['<%= meta.styles %>**/*.less'],
        tasks: ['less', 'autoprefixer', 'csslint']
      },
      fonts: {
        files: ['<%= meta.assets %>fonts/**'],
        tasks: ['copy:fonts']
      },
      icons: {
        files: ['<%= meta.assets %>icons/**'],
        tasks: ['copy:icons']
      },
      images: {
        files: ['<%= meta.assets %>images/**'],
        tasks: ['copy:images']
      },
      media: {
        files: ['<%= meta.assets %>media/**'],
        tasks: ['copy:media']
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.build %>images/',
          src: '**/*.{png,jpg,gif}',
          dest: '<%= meta.build %>images/'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= meta.build %>/index.html': '<%= meta.build %>/index.html'
        }
      }
    },
    cssmin: {
      options: {
        advanced: false,
        keepBreaks: false,
        keepSpecialComments: 0
      },
      compress: {
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.build %>css/style.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        compress: true,
        beautify: false,
        preserveComments: false
      },
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': ['<%= meta.scripts %>libs/modernizr.2.8.3.js','<%= meta.scripts %>libs/detectizr.js'],
          '<%= meta.build %>js/script.js': ['<%= meta.scripts %>libs/jquery-2.1.4.js', '<%= meta.scripts %>libs/handlebars-v4.0.5.js', '<%= meta.scripts %>libs/plugins/*.js', '<%= meta.scripts %>l10n.js', '<%= meta.scripts %>site.js', '<%= meta.scripts %>plugins/*.js']
        }]
      }
    },
    usemin: {
      html: '<%= meta.build %>/**/*.html'
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        src: '<%= meta.build %>css/*.css'
      }
    },
    markdownpdf: {
      files: {
        src: ['<%= meta.doc %>/*.md'],
        dest: '<%= meta.doc %>'
      }
    },
    nodemon: {
      dev: {
        options: {
          ignore: ['node_modules/**', '<%= meta.scripts %>**'],
          ext: 'js',
          watch: ['server'],
          delay: 1
        },
        script: 'app/server.js'
      }
    },
    concurrent: {
      options: {
        limit: 2
      },
      dev: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['nodemon', 'watch']
      }
    },
    qunit: {
      all: ['test/**/*.html']
    },
    clean: {
      options: {
        force: true
      },
      build: ['static'],
      css: ['static/css/'],
      js: ['static/js/']
    },
    'gh-pages': {
      options: {
        base: '<%= meta.build %>'
      },
      src: ['**']
    }
  });
  grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
  require('time-grunt')(grunt);

  grunt.registerTask('build', ['clean:build', 'concat', 'less:dev', 'jade', 'copy', 'autoprefixer', 'htmlhint', 'jshint', 'csslint']);
  grunt.registerTask('buildRelease', ['clean:css', 'clean:js', 'less:release', 'imagemin', 'usemin', 'uglify', 'htmlmin', 'cssmin']);

  grunt.registerTask('default', ['build', 'concurrent']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('doc', ['markdownpdf']);

  grunt.registerTask('release', ['build', 'buildRelease']);
  grunt.registerTask('deploy', ['release', 'gh-pages']);
};
