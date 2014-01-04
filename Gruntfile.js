module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var globalConfig = {
	images: 'public/images',
    js: 'public/javascripts',
    css: ['public/stylesheets', 'public/dist/']
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    globalConfig: globalConfig,

    connect: {
      	server: {
      		options: {
      			port: 5000,
      			base: './',
      			keepalive: true,
      		}
      	}
    },

    imagemin: {
    	dynamic: {
    		options: {
    			optimizationLevel: 7
    		},
    		files: [{
    			expand: true,
    			src: ['<%= globalConfig.images %>/**/*.{jpg,png}'],
    			dest: 'public/dist/'
    		}]
    	}
    }
    

  });

  grunt.registerTask('default', ['imagemin']);
  grunt.registerTask('dev', ['connect']);

};