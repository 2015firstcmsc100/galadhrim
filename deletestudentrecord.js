var config = require(__dirname + '/../config/config'),
	utils = require(__dirname + '/../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');
	url = "http://localhost:5000";

     describe("delete()", function(){
            it("student does not exist", function(done){  
                   request(url)
                   .del("/api/students/:0")
                   .end(function(err, res){
                     res.should.have.status(404);
                     done();
                   });
               });
               
               it("student exists", function(done){  
                   request(url)
                   .del("/api/students/:1")
                   .end(function(err, res){
                     res.should.have.status(202);
                     done();
                   });
               
              });
       });
            
               
             
