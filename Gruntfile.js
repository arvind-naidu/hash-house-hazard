module.exports = function(grunt) {

  require('time-grunt')(grunt)
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    

  });

  grunt.registerTask('default', ['uglify']);

};