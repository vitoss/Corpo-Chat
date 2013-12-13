module.exports = function(grunt, undefined) {
    grunt.registerTask('node', 'Start a node web server.', function(serverDefinitionPath, port, persist) {
      if(serverDefinitionPath === undefined || port === undefined) {
        throw "usage: grunt node:server_file.js:port";
      }

      var done = null;
      if(persist === '1') {
        done = this.async();
      }
      grunt.log.writeln('Starting web server defined in file '+serverDefinitionPath+' on port '+port+'.');
      var app = require(serverDefinitionPath).listen(port);
      if(done !== null) {
        app.on('close', done);
      }
    });
};
