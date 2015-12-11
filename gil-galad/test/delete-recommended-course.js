/*
	Test: Delete Recommended Course #159
	Add a test case suite for DELETE /api/ocm/recommended-courses
*/

var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Delete Recommended Course', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var insertedId = 0;


	describe('remove()', function () {
		it('should remove a recommended course record', function (done) {
			request(url)
				.delete('/api/ocm/recommended-courses/' + insertedId)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});


		it('should return error trying to remove a recommended course record that does not exist', function (done) {
			request(url)
				.delete('/api/ocm/recommended-courses/0')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Removed a non-existent recommended course'});
					}
				});
		});
	});

});