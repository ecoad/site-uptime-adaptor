module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    devFiles: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
    jshint: {
      src: ['<%= devFiles %>'],
      options: {
        laxcomma: true,
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= devFiles %>'],
      tasks: ['jshint', 'mochacli']
    },
    mochacli: {
        options: {
            require: ['should'],
            files: 'test/*-test.js'
        },
        spec: {
            options: {
                reporter: 'spec',
                timeout: '5000',
                bail: true
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('default', ['jshint', 'mochacli']);
};