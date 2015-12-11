var should = require('should-http');
var config = require('../config/config');
var server = 'http://localhost:' + config.port;
var url = '/api/course-offerings';
var request = require('supertest');

describe('course offering test case', function()
{	
	describe("find()", function(){
	 it('should retrieve a specific degree program', function(done){
	  request(server)
	   .get(url)
	   .end(function(err,res){
	    if(err) throw err;
	    res.should.have.status(200);
	    
	    res.body.should.be.an.instanceOf(Object);
	    res.body.should.have.property('page');
  	    res.body.should.have.property('size');
  	    res.body.should.have.property('data');
  	    res.body.data.should.be.an.instanceOf(Array);
	    done();	    
	   });
	 });
	});	
})

