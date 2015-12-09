//test case suite for GET /api/curricula/:id.
var config = require('../config/config');
var should = require('should-http');
var supertest = require('supertest');
var server = supertest.agent('http://localhost:' + config.port);
var url = '/api/curricula';
describe('Retrieve curricula',function(){
  
  it('should return an array' function(done){
    server.get(url)
      .expect(200)
      .end(function(err,res){
        should.not.exist(err);
        res.body.should.be.an('array');
      });
  });

  it('should return a course code and a course name' function(done){
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
