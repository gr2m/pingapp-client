'use strict';

// banner to be added to dist scripts & styles
var banner = '// <%= pkg.name %> <%= pkg.version%>\n';
banner += '// <%= grunt.template.today("yyyy-mm-dd") %>\n//\n';

// liveReload middleware will be inserted on the fly in your HTML
// and will connect back to the livereload server:
// https://github.com/gruntjs/grunt-contrib-livereload#the-middleware
var livereloadSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

// mounting folders for serving assets. Some might need
// to be precompiled (*.coffee, *.sass), so the folder
// with the precompiled assets needs to be mounted first
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    test: 'test',
    dist: 'www',
    tmp: '.tmp'
  };

  grunt.initConfig({

    // app settings / info loaded from package.json
    pkg: grunt.file.readJSON('package.json'),

    // directory mapping
    yeoman: yeomanConfig,

    watch: {
      // rebuild public/build/app.css on *.less change
      less: {
        files: ['<%= yeoman.app %>/styles/**/*.less'],
        tasks: ['less']
      },

      livereload: {
        files: [
          '<%= yeoman.app %>/*.html',
          '{.tmp,<%= yeoman.app %>}/styles/**/*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,webp}'
        ],
        tasks: ['livereload']
      }
    },

    // grunt server settings
    connect: {
      options: {
        port: 9000,

        // '0.0.0.0' allows for access from outside
        // 'localhost' prevents access from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              livereloadSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      }
    },

    // opens a webrowser at given path
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    // removes given folders
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>'],
      server: '.tmp'
    },

    uglify: {
      options: {
        banner: banner
      }
      // automatically set by usemin
      // dist: {}
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/index.html'],
      css: ['<%= yeoman.dist %>/styles/**/*.css'],
      options: {
        dirs: ['<%= yeoman.tmp %>','<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/images',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    // set by usemin task
    // cssmin: {},

    // minify HTML files
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
          // removeEmptyAttributes: true,
          // removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // copy static files for app to dist folder
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            '.appcache',
            'images/*.*'
          ]
        }]
      }
    },

    less: {
      options: {
        compile: true
      },
      app: {
        files: {
          '<%= yeoman.tmp %>/styles/app.css': '<%= yeoman.app %>/styles/app.less'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'less',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
