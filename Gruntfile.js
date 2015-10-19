module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    // LESS
    less: {
      // Global options for LESS
      options: {
        strictMath: false
      },
      // Dev task - run at `grunt`
      build: {
        expand: true,
        cwd: 'src/less/',
        src: [
          'all.less'
        ],
        dest: 'build/css/',
        ext: '.css',
        extDot: 'last'
      },
    },

    // Watch files
    watch: {
      options: {
        spawn: false 
      },
      less: {
        files: ['src/**/*.less'],
        tasks: ['less']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html']
      },
      tests: {
        files: ['src/**/__tests__/*.@(js|jsx)'],
        tasks: ['mochaTest']
      },
      lint: {
        files: ['src/**/*.@(js|jsx)'],
        tasks: ['eslint']
      }
    },

    copy: {
      html: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/*.html'],
          dest: 'build/'
        }]
      },
      samples: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'src/samples/',
          src: ['**/*'],
          dest: 'build/samples/'
        }]
      }
    },

    clean: {
      build: ['build/**/*']
    },

    browserify: {
      main: {
        options: {
          watch: true,
          watchifyOptions: {
            
          },
          browserifyOptions: {
            extension: ".jsx",
            transform: [
                ["babelify", {
                  loose: "all"
                }]
            ]
          }
        },
        files: {
          'build/js/main.js': ['src/js/main.jsx'],
          'build/js/styleguide.js': ['src/js/styleguide.jsx'],
        }
      }
    },

    eslint: {
      target: ['src/js/']
    },
    
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true,
          require: [
            'src/js/library/test-helpers/babel.include.js',
            'src/js/library/test-helpers/mock.browser.js'
          ]
        },
        src: ['src/**/__tests__/*.@(js|jsx)']
      }
    }
  });
  
  //only test the path that's been saved
  var defaultTestSrc = grunt.config('mochaTest.test.src');
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('mochaTest.test.src', defaultTestSrc);
    if (grunt.file.isMatch('src/**/__tests__/*.@(js|jsx)', filepath)) {
      grunt.config('mochaTest.test.src', filepath);
    }
  });
  
  //only lint the path that's been saved
  var defaultLintSrc = grunt.config('eslint.target');
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('eslint.target', defaultLintSrc);
    if (grunt.file.isMatch('src/js/**/*.@(js|jsx)', filepath)) {
      grunt.config('eslint.target', filepath);
    }
  });

  // Load required tasks
  require('load-grunt-tasks')(grunt);
  
  grunt.registerTask('server', 'Start a custom web server', function() {
    var done = this.async();
    grunt.log.writeln('Starting server...');
    require('./node/server.js');
  });

  //tasks
  grunt.registerTask('test', ['mochaTest', 'eslint']);
  grunt.registerTask('build', ['clean', 'less', 'copy', 'browserify']);
  grunt.registerTask('default', ['build', 'server']);

};