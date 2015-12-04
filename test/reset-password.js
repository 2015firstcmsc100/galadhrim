/*
/api/students
@param firstName - first name of student
@param middleName (optional) - middle name of student
@param lastName - last name of student
@param curriculumId - curriculum id of the student
@param sex - sex of the student

OK, 200
Returns the newly created student record
Client error, 4xx
Returns an error record containing the error message
*/

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
})
