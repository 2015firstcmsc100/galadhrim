var supertest = require('supertest');
var should = require('should-http');
var config = require('../config/config');

var server = supertest.agent('http://localhost:' + config.port);
var url = '/api/courses';

describe('Retrieve courses',function(){
  
	it('Should return an array' function(done){
    		server.get(url)
      		.expect(200)
      		.end(function(err,res){
        		should.not.exist(err);
        		res.body.should.be.an('array');
      		});
  	});

  	it('Should return a course code and a course name' function(done){
    		server.get(url)
      		.expect(200)
      		.end(function(err,res){
        		should.not.exist(err);
        		res.body.should.be.an('array');
      		  	for(var i;i<res.body.length;i++){
      		    		res.body[i].should.have.property('code');
          			res.body[i].should.have.property('name');
        		}
      		});
  	});

});
