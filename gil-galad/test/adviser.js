/*
Test: Update registration adviser
Add test case suite for PUT /api/student-record/:id/adviser
*/

var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');


describe('Registration adviser',function(){
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var insertedId = 0;

	describe("update()", function(){

		it('should update a specific registration adviser: name field only', function (done) {
			var update = {
				'registrationAdviser': 'Rommel Bulalacao'
			};
			request(url)
				.put('/api/student-record/' + insertedId + '/adviser')
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('registrationAdviser', 'Rommel Bulalacao');
						done();
					}
				});
		});

		it('should return error if trying to update a registration adviser that does not exist', function (done) {
			var update = {
				'registrationAdviser': 'Rommel Bulalacao'
			};
			request(url)
				.put('/api/student-record/0/adviser')
				.send(update)
				.end(function(err, res) {
					if (err) {
					   done();
					}
					else {
					   throw new Error({'message': 'Failed to update registration adviser.'});
					}
				});
		});
	});
});
