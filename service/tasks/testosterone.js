module.exports = function(grunt) {

  // Create a new task.
  grunt.registerTask('testosterone', 'Testosterone runner!', function(a,b) {
    grunt.log.write('TESTING!');

    var path = require('path');
	
	grunt.config.requires('testosterone.files');
	var files = grunt.config('testosterone.files');

	var paths = files.map(function(filepath) {
        return path.resolve(filepath);
      });

	require('../test/Services.testosterone.js');
	grunt.log.write(paths);
    var done = this.async();
    // File paths.
    //var filepaths = grunt.file.expandFiles(this.file.src);
    // Clear all tests' cached require data, in case this task is run inside a
    // "watch" task loop.
    //grunt.file.clearRequireCache(filepaths);
    // Run test(s)... asynchronously!

  });

};