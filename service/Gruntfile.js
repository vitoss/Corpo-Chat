'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
      express: {
        files:  [ '**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },
    express: {
      options: {
        // Override defaults here
        error: function(err, result, code) {
          console.log(err);
          console.log(result);
          console.log(code);
        }
      },
      dev: {
        options: {
          script: 'lib/hub.js'
        }
      },
      prod: {
        options: {
          script: 'lib/hub.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'lib/serverHub.js'
        }
      }
    },
    vows: {
        all: {
          src: ["test/**/*.vows.js"]
        },
        rest: {
          src: ["test/rest/*.vows.js"]
        },
        socket: {
          src: ["test/socket/*.vows.js"]
        }
    },
  });

  grunt.registerTask('default', 'jshint test');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine_node']);
  grunt.registerTask('server', [ 'node:../lib/hub.js:8080', 'watch' ]);
  
  //tests and mongo
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks("grunt-vows");
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('test', ['node:../lib/hub.js:8881', 'vows:rest', 'vows:socket'])
  grunt.registerTask('check', 'jshint test');

  var mongoStartCommand = 'mongo:start:localhost:27018:test:/tmp/mongodbtest';
  var mongoCleanCommand = 'mongo:clean:localhost:27018:test:/tmp/mongodbtest';
  var mongoStopCommand  = 'mongo:stop:localhost:27018:test:/tmp/mongodbtest';
  grunt.registerTask('mongo_recycle', ['mongo_start', 'mongo_clean', 'mongo_stop']);
  grunt.registerTask('mongo_start', mongoStartCommand);
  grunt.registerTask('mongo_clean', mongoCleanCommand);
  grunt.registerTask('mongo_stop', mongoStopCommand);
};
