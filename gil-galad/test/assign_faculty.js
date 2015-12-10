var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Faculty of Course Offering', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var sectionId = 0;

	describe('update()', function () {
		
		it('should update a specific faculty: laboratory instructor only', function (done) {
			var update = {
				'_id' : sectionId,
				'laboratoryInstructor': 00000000000;
			};
			request(url)
				.put('/api/ocm/assign-faculty' + sectionId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('_id', sectionId);
						res.body.should.have.property('laboratoryInstructor', 00000000000);
						done();
					}
				});
		});


		it('should update a specific faculty: lecture instructor only', function (done) {
			var update = {
				'_id' : sectionId,
				'lectureInstructor': 11111111111;
			};
			request(url)
				.put('/api/ocm/assign-faculty' + sectionId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('_id', sectionId);
						res.body.should.have.property('lectureInstructor', 11111111111);
						done();
					}
				});
		});


		it('should update a specific faculty: recitation instructor only', function (done) {
			var update = {
				'_id' : sectionId,
				'recitationInstructor': 22222222222;
			};
			request(url)
				.put('/api/ocm/assign-faculty' + sectionId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('_id', sectionId);
						res.body.should.have.property('recitationInstructor', 22222222222);
						done();
			


		it('should return error trying to update a faculty that doesnt exist', function (done) {
			var update = {
				'_id' : sectionId,
				'lectureInstructor': 00000000000;
			};
			request(url)
				.put('/api/ocm/assign-faculty/0')
				.send(update)
				.end(function(err, res) {
					if (err) {
					   done();
					}
					else {
					   throw new Error({'message': 'Faculty does not exist'});
					}
				});
		});
	});

});
