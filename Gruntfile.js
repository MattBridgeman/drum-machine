module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    settings: grunt.file.readJSON('settings.json'),
    
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
        cwd: 'less/',
        src: [
          'main.less'
          ],
        dest: 'css/',
        ext: '.css',
        extDot: 'last'
      },
    },

    // Convert SVG to PNG
    // svg2png: {
    //   build: {
    //     files: [
    //       {
    //         cwd: '<%= settings.config.graphicsPath %>',
    //         src: ['**/*.svg'],
    //         dest: '<%= settings.config.graphicsPath %>',
    //       }
    //     ]
    //   }
    // },

    // Optimise images
    // imagemin: {
    //   build: {
    //     files: [{
    //       expand: true,
    //       src: ['<%= settings.config.graphicsPath %>*.{png,svg}'],
    //       dest: ''
    //     }]
    //   }
    // },

    // Build favicons
    // favicons: {
    //   options: {
    //     trueColor: true,
    //     precomposed: true,
    //     appleTouchBackgroundColor: "none",
    //     coast: false,
    //     windowsTile: true,
    //     tileBlackWhite: false,
    //     tileColor: "#ffffff"
    //   },
    //   icons: {
    //     src: '<%= settings.config.graphicsPath %>favicons/favicon-source.png',
    //     dest: '<%= settings.config.graphicsPath %>favicons'
    //   }
    // },

    // Watch files
    watch: {
      less: {
        files: ['less/*.less'],
        tasks: ['less']
      },
      // css: {
      //   options: {
      //     livereload: true
      //   },
      //   files: ['<%= settings.config.cssPath %>/**/*.css']
      // },
      // svg: {
      //   files: '<%= settings.config.graphicsPath %>**/*.svg',
      //   tasks: ['svg2png:build', 'imagemin:build']
      // }
    }

  });

  // Load required tasks
  require('load-grunt-tasks')(grunt);

  // Development task(s)
  grunt.registerTask('default', ['less', 'watch']);

  // Production task(s)
  // grunt.registerTask('production', ['less:production', 'svg2png:build', 'favicons', 'imagemin:build']);

};