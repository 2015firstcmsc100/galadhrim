//Add a test case suite for PUT /api/courses/:id.
var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');
	

describe('Course',function(){	

	describe("update()", function(){
	
		it('should update a specific course: code field only', function (done) {
			var update = {
				'code': 'CMSC100';
			};
			request(url)
				.put('/api/courses/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code', 'CMSC100');
						res.body.should.have.property('name': 'Introduction to Web Programming');
						res.body.should.have.property('units': '3');
						res.body.should.have.property('semesterOffered': '1st');
						res.body.should.have.property('unitId': courseCode);
						done();
					}
				});
		});
		
		it('should update a specific course: name field only', function (done) {
			var update = {
				'name': 'Introduction to Web Programming';
			};
			request(url)
				.put('/api/courses/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code', 'CMSC100');
						res.body.should.have.property('name': 'Introduction to Web Programming');
						res.body.should.have.property('units': '3');
						res.body.should.have.property('semesterOffered': '1st');
						res.body.should.have.property('unitId': courseCode);
						done();
					}
				});
		});
		
		it('should update a specific course: units field only', function (done) {
			var update = {
				'units': '3';
			};
			request(url)
				.put('/api/courses/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code', 'CMSC100');
						res.body.should.have.property('name': 'Introduction to Web Programming');
						res.body.should.have.property('units': '3');
						res.body.should.have.property('semesterOffered': '1st');
						res.body.should.have.property('unitId': courseCode);
						done();
					}
				});
		});
		
		it('should update a specific course: semesterOffered field only', function (done) {
			var update = {
				'semesterOffered': '1st';
			};
			request(url)
				.put('/api/courses/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code', 'CMSC100');
						res.body.should.have.property('name': 'Introduction to Web Programming');
						res.body.should.have.property('units': '3');
						res.body.should.have.property('semesterOffered': '1st');
						res.body.should.have.property('unitId': courseCode);
						done();
					}
				});
		});
		
		it('should update a specific course: unitId field only', function (done) {
			var update = {
				'unitId': courseCode;
			};
			request(url)
				.put('/api/courses/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code', 'CMSC100');
						res.body.should.have.property('name': 'Introduction to Web Programming');
						res.body.should.have.property('units': '3');
						res.body.should.have.property('semesterOffered': '1st');
						res.body.should.have.property('unitId': courseCode);
						done();
					}
				});
		});
	});
		
});
