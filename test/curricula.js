var supertest = require('supertest');
var should = require('should-http');
var config = require('/../config/config');

// This agent refers to PORT where program is running.
var server = supertest.agent('http://localhost:' + config.port);

describe ('Retrieving all Curricula', function() {

    it ('should retrieve all curricula', function(done) {
        server
            .get('/api/curricula');
            .end (function(err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.status(200);
                done();
            });
    });
});
