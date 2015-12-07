/*
TEST: Retrieve plan of study
Checks for 200 status
Returns 4xx errors if ever
*/
var supertest = require('supertest');
var should = require('should-http');
var config = require('../config/config');
var server = supertest.agent('http://localhost:' + config.port);
var url = '/api/plan-of-study/';

describe('Retrieving a plan of study', function(){
	it('should retrieve a plan of study for a specific id', function(done){
		server
			.get(url + '1')
			.end(function(err, res){
				if(err){
					throw err;
				}
				res.should.have.status(200);
				res.body.should.have.property('page');
				res.body.should.have.property('size');
				res.body.should.have.property('array');
				done();
			});
	});
	
	it('should not retrieve a POS from an invalid id', function(done){
		server
			.get(url + 'A')
			.end(function(err, res){
				if(err){
					throw(err);
				}
				res.status.should.be.greater(399);
				done();
			});
	});
})
