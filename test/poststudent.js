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
var config = require('../config/config');

// This agent refers to PORT where program is running.
var server = supertest.agent('http://localhost:' + config.port);

describe('Posting a student', function(){
    it('should post a student with valid info', function(done){
        server
            .post('/api/students/Marie%20Betel/B/de%20Robles/99999999999/F');
            .end(function(err, res){
                if(err){
                    throw err;
                }
                res.should.have.status(200);
                res.body.should.have.property('firstName', 'Marie Betel');
                res.body.should.have.property('middleName', 'B');
                res.body.should.have.property('lastName', 'de Robles');
                res.body.should.have.property('curriculumId', '99999999999');
                res.body.should.have.property('sex', 'F');
                done();
            });
    });

    it('should not post a student with invalid', function(done){
        server
            .post('/api/students/invalid/invalid/invalid/invalid/invalid');
            .end(function(err, res){
                if(err){
                    throw err;
                }
                (res.status/100).should.equal(4); //expect 4xx error code
                done();
            });
    });
})
