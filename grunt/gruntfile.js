module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          fontsDir: 'fonts',
          outputStyle: 'expanded'
          //require: 'zurb-foundation'
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! Kamils <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    qunit: {
      files: ['test/**/*.html']
    },

    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    
    regarde: {
      pub: {
        files: ['public/**/*', 'dist/**/*', 'assets/**/*'],
        tasks: ['livereload']
      },
      sass: {
        files: 'sass/**/*.scss',
        tasks: 'compass'
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.registerTask('default', ['compass', 'jshint', 'qunit', 'concat', 'uglify', 'regarde', 'watch']);
  grunt.registerTask('test', ['jshint', 'qunit']);

};