var config = require(__dirname + '/../config/config'),
	utils = require(__dirname + '/../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Add Recommended Courses', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var studentId= utils.getRandomString(10);
  var courseId= utils.getRandomStringInt(11);


	describe('insert()', function () {

		it('should create a new recommended course', function (done) {
			var recommended_course = {
				'studentId': studentId,
				'courseId': courseId
			};
			request(url)
				.post('/api/ocm/recommended-courses')
				.send(recommended_course)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['studentId', 'courseId']);
					done();
				});
		});

		it('should return error trying to create an already existing recommended course', function (done) {
      var recommended_course = {
				'studentId': studentId,
				'courseId': courseId
			};
			request(url)
				.post('/api/ocm/recommended-courses')
				.send(recommended_course)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to create new recommended course despite duplicate combination of student id and course id'});
					}
				});
		});

		it('should return error trying to create a recommended course record without course id', function (done) {
      var recommended_course = {
				'studentId': studentId
			};
			request(url)
				.post('/api/ocm/recommended-courses')
				.send(recommended_course)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create a new recommended course without course id');
					}
				});
		});

		it('should return error trying to create a recommended course without student id', function (done) {
      var recommended_course = {
				'courseId': courseId
			};
			request(url)
				.post('/api/ocm/recommended-courses')
				.send(recommended_course)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create a new recommended course without student id');
					}
				});
		});
	});

});
