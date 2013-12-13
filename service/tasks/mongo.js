module.exports = function(grunt, undefined) {
    grunt.registerTask('mongo', 'Mongo manager.', function(command, address, port, db, dbpath) {
      if(command === undefined || address === undefined || port === undefined || port === undefined) {
        throw "usage: grunt mongo:address:port:db[:dbpath]";
      }

      var execSync = require('exec-sync');//for sync execution

      if(command === 'clean') {
        var result = execSync('mongo '+address+':'+port+'/'+db+' --eval "db.dropDatabase();"');
        grunt.log.writeln('Database ' + db + ' residing on ' + address + ':' + port  + ' cleaned.');
      } else if(command === 'start') {

        if(dbpath === undefined) {
            throw 'DBPath is required.';
        }

        if(address === 'localhost' || address === '127.0.0.1') {
            var dexec = require( 'deferred-exec' );

            var mongo = dexec('mongod '+' --port '+port+' --dbpath '+dbpath)
              .done( function( stdout, stderr, command ) {
                grunt.log.writeln( command );
                grunt.log.writeln( stderr );
                grunt.log.writeln( stdout );
              })
              .fail( function( error ) {
                grunt.log.writeln( "Mongodb starting failed, got code:", error.code );
              });

              //special delay which can give mongo some time to bootstrap
              var done = this.async();
              setTimeout(function() { done(); }, 10000);
        } else {
            throw 'Only localhost support for now!';
        }

        grunt.log.writeln('Mongo daemon on ' + address + ':' + port + ' with dbpath: ' + dbpath + ' started.');
      } else if(command === 'stop') {
        //kiling
        var res = execSync('kill -9 `ps -A | grep mongo | grep '+port+' | grep '+dbpath+' | awk \'{print $1}\'`');
        grunt.log.writeln('Mongodb daemon residing on ' + address + ':' + port  + ' stopped.');
      }
    });
};