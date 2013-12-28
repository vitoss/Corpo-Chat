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
   .exportTo(module);