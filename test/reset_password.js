var supertest = require('supertest');
var should = require('should-http');
var config = require('/../config/config');

// This agent refers to PORT where program is running.
var server = supertest.agent('http://localhost:' + config.port);

describe ('Resetting a password', function() {

    it ('should not send an email to an invalid id', function(done) {
        server
            .get('/api/password/reset/-1');
            .end (function(err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.status(404);
                done();
            });
    });

    it ('should send an email to a valid id', function(done) {
        server
            .get('/api/password/reset/1');
            .end (function(err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.status(200);
                done();
            });
    });
});
