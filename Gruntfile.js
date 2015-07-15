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
      less: {
        files: ['src/**/*.less'],
        tasks: ['less']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html']
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
          transform: ["tsify"]
        },
        files: {
          // 'build/js/main.js': ['src/js/main.js'],
          // 'build/js/styleguide.js': ['src/js/styleguide.js'],
          'build/js/demo.js': 'src/js/demo.ts'
        }
      }
    },

    eslint: {
      target: ['src/js/']
    },

    jest: {
      options: {
        coverage: false
      }
    }
  });

  // Load required tasks
  require('load-grunt-tasks')(grunt);
  
  grunt.registerTask('server', 'Start a custom web server', function() {
    require('./node/server.js');
  });

  grunt.registerTask('jest', 'Run jest', function() {
    require('jest-cli').runCLI(this.options(), process.cwd(), this.async());
  });

  //tasks
  grunt.registerTask('build', ['clean', 'less', 'copy', 'browserify'])
  grunt.registerTask('default', ['build', 'server', 'watch']);
  grunt.registerTask('test', ['jest']);

};