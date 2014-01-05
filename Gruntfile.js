module.exports = function(grunt) {
  
  /*
        Grunt installation:
        -------------------
            npm install -g grunt-cli
            npm install -g grunt-init
            npm init (creates a `package.json` file)

        Project Dependencies:
        ---------------------
            npm install grunt --save-dev
            npm install grunt-contrib-watch --save-dev
            npm install grunt-contrib-jshint --save-dev
            npm install grunt-contrib-uglify --save-dev
            npm install grunt-contrib-requirejs --save-dev
            npm install grunt-contrib-sass --save-dev
            npm install grunt-contrib-imagemin --save-dev
            npm install grunt-contrib-htmlmin --save-dev
            npm install grunt-contrib-jade --save-dev
            npm install grunt-contrib-connect --save-dev
            npm install grunt-contrib-jasmine --save-dev
            npm install grunt-template-jasmine-requirejs --save-dev
            npm install grunt-template-jasmine-istanbul --save-dev
            npm install load-grunt-tasks --save-dev
            npm install time-grunt --save-dev

        Simple Dependency Install:
        --------------------------
            npm install (from the same root directory as the `package.json` file)

        Gem Dependencies:
        -----------------
            gem install image_optim
  */

  // Displays the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);

  // Load NPM Tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Defining variables & locations
  var globalConfig = {
	images: 'public/images',
    js: 'public/javascripts',
    css: ['public/stylesheets', 'public/dist/']
  };

  // Project configuration
  grunt.initConfig({

    // Store your Package file so you can reference its specific data whenever necessary
    pkg: grunt.file.readJSON('package.json'),

    // Defining global variables to local variables
    globalConfig: globalConfig,

    // Used to connect to a locally running web server (so Jasmine can test against a DOM)
    connect: {
      	server: {
      		options: {
      			port: 5000,
      			base: './',
      			keepalive: true,
      		}
      	}
    },

    // Minify images
    // `optimizationLevel` is only applied to PNG files (not JPG)
    imagemin: {
    	png: {
    		options: {
    			optimizationLevel: 0
    		},
    		files: [{
    			expand: true,
    			src: ['<%= globalConfig.images %>/**/*.png'],
    			dest: 'public/dist/',
          ext: '.png'
    		}]
    	},
      jpg: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          src: ['<%= globalConfig.images %>/**/*.jpg'],
          dest: 'public/dist/',
          ext: '.jpg'
        }]
      }
    },
    
    /*

    // Minify HTML
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeEmptyAttributes: true,
          removeCommentsFromCDATA: true,
          removeRedundantAttributes: true,
          collapseBooleanAttributes: true
        }
        files: {
          // Destination : Source
          './index-min.html' : './index.html'
        }
      }
    }

    */
    
  });

  // Default Task
  grunt.registerTask('default', ['jshint', 'connect', 'jasmine', 'sass:dev']);

  // Unit Testing Task
  grunt.registerTask('test', ['connect', 'jasmine:run']);

  // Release Task
  grunt.registerTask('release', ['jshint', 'test', 'requirejs', 'sass:dist', 'imagemin', 'htmlmin']);

};