var test = require('tape');
var request = require('supertest');

var app = require('../');
var id
test('Post Object!', function(t) {

    request(app)
        .post('/collections/test')
        .send({
            name: 'John',
            email: 'john@rpjs.co'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, result) {
            t.error(err, 'No error')
            console.log(JSON.stringify(result))
            t.same(result.body.length, 1, 'as expected')
            t.same(result.body[0]._id.length, 24, 'as expected')
            t.end();
            id = result.body[0]._id
            console.log(id)
                // process.exit(0);
        });

});

test('Get Object!', function(t) {

    request(app)
        .get('/collections/test/' + id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, result) {
            t.error(err, 'No error')
            console.log(JSON.stringify(result))
            t.same(result.body.email, 'john@rpjs.co', 'as expected')
            t.same(result.body.name, 'John', 'as expected')
            t.same(result.body._id, id, 'as expected')
            t.end();
            process.exit(0);
        });

});