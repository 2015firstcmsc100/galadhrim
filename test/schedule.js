var config = require('/../config/config');
var should = require('should-http');
var server = 'http://localhost:' + config.port;
var request = require('supertest');
var url = '/api/ocm/schedule/:id';

describe('Retrieve schedule of a student', function(){	
	describe("find()", function(){
	 it('should retrieve a specific schedule of a student for a specific id', function(done){
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

