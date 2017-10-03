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
      },
      minify: {
        files: ['build/js/main.js'],
        tasks: ['uglify']
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
      },
      firebase: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'node_modules/firebase/',
          src: ['firebase.js'],
          dest: 'build/js/'
        }]
      },
      firebaseuicss: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'node_modules/firebaseui/dist/',
          src: ['firebaseui.css'],
          dest: 'build/css/'
        }]
      },
      firebaseuijs: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'node_modules/firebaseui/dist/',
          src: ['firebaseui.js'],
          dest: 'build/js/'
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
                ["babelify"]
            ]
          }
        },
        files: {
          'build/js/main.js': ['src/js/main.jsx']
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
    },

    uglify: {
      build: {
        files: {
          'build/js/main.min.js': 'build/js/main.js'
        }
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
    grunt.log.writeln('Starting server...');
    require('./node/server.js');
  });

  //tasks
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('build', ['clean', 'less', 'copy', 'browserify', 'uglify']);
  grunt.registerTask('default', ['build', 'server', 'watch']);

};