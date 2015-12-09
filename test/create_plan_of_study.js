/*
Add a test case suite for POST /api/plan-of-study
*/
var supertest = require('supertest'),
    should = require('should-http'),
    config = require('../config/config'),
    url = '/api/plan-of-study';

describe('Creating a plan of study', function(){
	
	
	it('should not have a blank courseId', function(done){
		supertest('localhost:5000')
			.post(url)
			.send({'courseId': '','curriculumId':'BSCS-2013', 'studentId':'2013-14234'})
			.expect(451)
			.end(function(err, res){
				if(err) throw err;
				res.should.have.status(451);
				done();
			});
	});

	it('should not have a blank curriculumId', function(done){
		supertest('localhost:5000')
			.post(url)
			.send({'courseId':'32', 'curriculumId':'', 'studentId':'2013-14234'})
			.expect(451)
			.end(function(err, res){
				if(err) throw err;
				res.should.have.status(451);
				done();
			});
	});
	
	it('should not have a blank studentId', function(done){
		supertest('localhost:5000')
			.post(url)
			.send({'courseId':'32', 'curriculumId':'BSCS-2020', 'studentId':''})
			.expect(451)
			.end(function(err, res){
				if(err) throw err;
				res.should.have.status(451);
				done();
			});
	});
	
	it('should have a courseId, curriculumId, and a studentId together with its corresponding values', function(done){
		supertest('localhost:5000')
			.post(url)
			.send({'courseId':'4', 'curriculumId':'BSCS-2013', 'studentId':'2013-14234'})
			.end(function(err, res){
				if(err) throw err;
				res.should.have.status(200);
				done();
			});
			this.timeout(15000);
	});
	
	it('should return the newly inserted course plan of study', function(done){
		supertest('localhost:5000')
			.post(url)
			.send({'courseId':'12', 'curriculumId':'BSCS-2020', 'studentId':'2013-09876'})
			.end(function(err, res){
				if(err) throw err;
				res.should.have.status(200);
				res.body.should.be.an.instanceOf(Object);
				res.body.should.have.property('courseId');
				res.body.should.have.property('curriculumId');
				res.body.should.have.property('studentId');
				done();
			});
			this.timeout(15000);
	});
	
});
