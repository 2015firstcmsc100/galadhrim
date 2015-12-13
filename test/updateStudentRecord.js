/**
 *  Test case suite for UPDATE /api/student-record/:id.
 *
 *
 */

var supertest = require('supertest');
var should = require('should-http');
var config = require('../config/config');

var server = supertest.agent('http://localhost:' + config.port);
var url = '/api/student-record/';
var id = '1'; /*This ID would work if student record is not empty*/

descrivbe('Updating a student record', function(){
    it('should update a student record with complete valid info', function(done){
        var testStudent = {
            'firstName' : 'Test First Name',
            'middleName' : 'Test Middle Name',
            'lastName' : 'Test Last Name',
            'curriculumId': '01234567890',
            'sex' : 'M'
        };
        server
            .put(url+id)
            .send(testStudent)
            .end(function(err, res){
                if (err) {
                    throw err;
                }
                res.should.have.status(200);
                res.body.should.have.property('firstName','Test First Name');
                res.body.should.have.property('middleName','Test Middle Name');
                res.body.should.have.property('lastName','Test Last Name');
                res.body.should.have.property('curriculumId','01234567890');
                res.body.should.have.property('sex','M');
                done();
            });
    });
    
    it('should update a student record with no optional info', function(done){
        var testStudent = {
            'firstName' : null,
            'middleName' : null,
            'lastName' : null,
            'curriculumId': null,
            'sex' : null
        };
        server
            .put(url+id)
            .send(testStudent)
            .end(function(err, res){
                if (err) {
                    throw err;
                }
                res.should.have.status(200);
                done();
            });
    });
    
    it('should update a student record with no optional info', function(done){
        var testStudent = {
            'firstName' : 'Test First Name',
            'middleName' : 'Test Middle Name',
            'lastName' : 'Test Last Name',
            'curriculumId': '01234567890',
            'sex' : 'M'
        };
        server
            .put(url+'0')
            .send(testStudent)
            .end(function(err, res){
                if (err) {
                    done();
                }
                else{
                    throw new Error({'message': 'Can retrieve a non-existent student record'});
                }
            });
    });
});