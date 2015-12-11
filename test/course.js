//Add a test case suite for PUT /api/courses/:id.
var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');
	

describe('Course',function(){	

   /*code varchar(16) NOT NULL,
   *name varchar(256) NOT NULL,
   *units tinyint(2),
   *semesterOffered varchar(3),
   *unitId int(11),*/

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
						res.body.should.have.property('unitId': 'randomCode');
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
						res.body.should.have.property('unitId': 'randomCode');
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
						res.body.should.have.property('unitId': 'randomCode');
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
						res.body.should.have.property('unitId': 'randomCode');
						done();
					}
				});
		});
		
		it('should update a specific course: unitId field only', function (done) {
			var update = {
				'unitId': 'randomCode';
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
						res.body.should.have.property('unitId': 'randomCode');
						done();
					}
				});
		});
	});
		
});
