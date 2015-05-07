module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    // LESS
    less: {
      // Global options for LESS
      options: {
        strictMath: false,
        dumpLineNumbers: 'all'
      },
      // Dev task - run at `grunt`
      build: {
        expand: true,
        cwd: 'src/less/',
        src: [
          'main.less'
          ],
        dest: 'build/css/',
        ext: '.css',
        extDot: 'last'
      },
    },

    // Watch files
    watch: {
      less: {
        files: ['src/less/*.less'],
        tasks: ['less']
      },
      html: {
        files: ['src/index.html'],
        tasks: ['copy:index']
      },
      fonts: {
        files: ['src/fonts/**/*'],
        tasks: ['copy:fonts']
      }
    },

    copy: {
      index: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/index.html'],
          dest: 'build/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'src/fonts/',
          src: ['**/*'],
          dest: 'build/fonts/'
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
        files: {
          'build/js/main.js': ['src/js/main.js'],
        }
      }
    }

  });

  // Load required tasks
  require('load-grunt-tasks')(grunt);
  
  grunt.registerTask('server', 'Start a custom web server', function() {
    require('./node/server.js');
  });

  // Development task(s)
  grunt.registerTask('default', ['clean', 'less', 'copy', 'server', 'watch']);

  // Production task(s)
  // grunt.registerTask('production', ['less:production', 'svg2png:build', 'favicons', 'imagemin:build']);

};