var config = require(__dirname + '/../config/config'),
	utils = require(__dirname + '/../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');
	url = "http://localhost:5000";

describe("Delete a course from curriculum", function(){
	describe("remove()", function(){ 
		it("curriculum course id exists", function(done){
		request(url)
			.del("/api/curriculum-course/1")
			.end(function(err, res){
				res.should.have.status(202);
				done();
			});
		});
	});

});	


