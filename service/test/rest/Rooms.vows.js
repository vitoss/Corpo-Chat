/* API contract test. Remember we cannot test data correctness, but contract only */

var APIeasy = require('api-easy'),
    assert = require('assert');

var suite = APIeasy.describe('Rooms API');

suite.discuss('When using Room API')
    .discuss('and list entry')
    .use('localhost', 8881)
    .get('/rooms')
      .expect(200) //respond to simple ping
    .get('/rooms')
      .expect(200)
      .expect('should respond with JSON proper JSON', function(err, res, body) {
        var result = JSON.parse(body);
        assert.isTrue(typeof(result) !== "undefined");
      })
      .expect('should respond with list of rooms', function(err, res, body) {
        var result = JSON.parse(body);
        assert.ok(result.length > 0);
      })
      .expect('should respond with list rooms having all required fields', function(err, res, body) {
        var rooms = JSON.parse(body),
            room = rooms[0];
        assert.notEqual(typeof(room._id), 'undefined');
        assert.notEqual(typeof(room.name), 'undefined');
        assert.notEqual(typeof(room.status), 'undefined');
        assert.notEqual(typeof(room.owner), 'undefined');
        assert.notEqual(typeof(room.created_at), 'undefined');
      })
    .get('rooms?limit=10')
      .expect(200)
      .expect('should return only 10 result entries', function(err, res, body) {
        var result = JSON.parse(body);
        assert.equal(result.length, 10);
      })
    .get('rooms?offset=5&limit=5&sort=name')
      .expect(200)
      .expect('should return 5 entries from offset 5', function(err, res, body) {
        var result = JSON.parse(body);
        assert.equal(result.length, 5);
        assert.equal(result[0].name, 'Room 102');
      })
    .discuss('and sorting results')
    .get('rooms?offset=0&limit=30&sort=name,desc')
      .expect(200)
      .expect('should properly sort result by name descending', function(err, res, body) {
        var result = JSON.parse(body),
            i, l = result.length;
        for(i=0; i<l-1; i++) {
          assert.ok(result[i].name >= result[i+1].name);
        }
      })
    .get('rooms?offset=0&limit=30&sort=name,asc')
      .expect(200)
      .expect('should properly sort result by name ascending', function(err, res, body) {
        var result = JSON.parse(body),
            i, l = result.length;
        for(i=0; i<l-1; i++) {
          assert.ok(result[i].name <= result[i+1].name);
        }
      })
    .get('rooms?offset=0&limit=5&sort=name,desc')
      .expect(200)
      .expect('should properly sort result by name descending', function(err, res, body) {
        var result = JSON.parse(body),
            i, l = result.length;
        for(i=0; i<l-1; i++) {
          assert.ok(result[i].name >= result[i+1].name);
        }
      })
    .discuss('and searching for rooms which doesnt exists')
    .get('rooms?q=not_existing_keyword')
      .expect(200)
      .expect('should return empty array', function(err, res, body) {
        var result = JSON.parse(body);
        assert.equal(result.length, 0);
      })
    .discuss('and searching for many rooms')
    .get('rooms?q=Room')
      .expect(200)
      .expect('should return non empty array', function(err, res, body) {
        var result = JSON.parse(body),
            room = null,
            i = 0, l;

        //check search condition
        for(i=0, l=result.length; i<l; i++) {
          assert.include(result[i].name, 'Room');
        }

        assert.ok(result.length > 0);
      })
    .discuss('and adding new room')
      .setHeader('Content-Type', 'application/json')
      .post('rooms', { name: 'Room 666', owner: '52bf3f4d1c28bea0ee723f63', status: 1})
      .expect(201) //Created
      .expect('should be successful and return whole object with id', function(err, res, body) {
        var newRoom = JSON.parse(body);
        
        assert.isTrue(typeof(newRoom._id) !== 'undefined');
        assert.equal('Room 666', newRoom.name);
      })
    .discuss('and adding new room with empty name field')
      .post('rooms', {name: '', status: 1, owner: '52bf3f4d1c28bea0ee723f63'})
      .expect(500) //Error
      .expect('should be unsuccessful and return proper error message', function(err, res, body) {
        assert.ok(body.indexOf('Error') > -1 && body.indexOf('required') > -1);
      })
    .discuss('and adding new room with empty owner field')
      .post('rooms', {name: 'Room 777', status: 1, owner: ''})
      .expect(500) //Error
      .expect('should be unsuccessful and return proper error message', function(err, res, body) {
        assert.ok(body.indexOf('Error') > -1);
      })
    .discuss('and getting single room details')
      .setHeader('Content-Type', 'text/plain') //reset application/json set in 'create patient' test
      .get('rooms/63bffacbefb24c6bd59b3983')
      .expect(200)
      .expect('should respond with proper JSON', function(err, res, body) {
        var result = JSON.parse(body);
        assert.isTrue(typeof(result) !== "undefined");
      })
      .expect('should respond with single room data', function(err, res, body) {
        var room = JSON.parse(body);
        assert.notEqual(typeof(room._id), 'undefined');
        assert.notEqual(typeof(room.name), 'undefined');
        assert.notEqual(typeof(room.owner), 'undefined');
        assert.notEqual(typeof(room.status), 'undefined');
      })
    .discuss('and searching for rooms which exists')
    .get('rooms?q=Special') //id
      .expect(200)
      .expect('should return proper entry', function(err, res, body) {
        var result = JSON.parse(body);
        assert.ok(result.length, 1);
        assert.equal(result[0].name, 'Special Room');
      })
    .get('rooms?q=Special Room') //name
      .expect(200)
      .expect('should return proper entry', function(err, res, body) {
        var result = JSON.parse(body);
        assert.ok(result.length, 1);
        assert.equal(result[0].name, 'Special Room');
      })
    .next() //first add then remove
    .discuss('and removing single patient')
      .setHeader('Content-Type', 'application/json')
      .put('rooms/63bffacbefb24c6bd59b3984', { name: 'Room 667', owner: '52bf3f4d1c28bea0ee723f63', status: 1})
      .expect('should be successful and return whole object with id', function(err, res, body) {
        var newRoom = JSON.parse(body);
       
        assert.isTrue(res.statusCode === 200 || res.statusCode === 201);
        assert.isTrue(typeof(newRoom._id) !== 'undefined');
        assert.equal('63bffacbefb24c6bd59b3984', newRoom._id);
        assert.equal('Room 667', newRoom.name);
      })
    .next()
      .del('rooms/63bffacbefb24c6bd59b3984')
      .expect(200)
      .expect('should be successful and room should have proper status', function(err, res, body) {
        var result = JSON.parse(body);
        assert.ok(result.deleted);
      })
    .next() //first remove, then check if exists
      .get('rooms/63bffacbefb24c6bd59b3984')
      .expect(404)
      .expect('should not be present on old address', function(err, res, body) {

        var http = require('http'),
            options = {
              host: 'localhost',
              port: '8080',
              path: '/patients/2012.9999',
              method: 'GET'
            };

        http.request(options, function(res) {
          res.on('end', function() {
            assert.equal(404, res.status);
          });
        });
      })
  .exportTo(module);