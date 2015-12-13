var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Logout', function() {
	it('should update _recStatus to DELETED', function(done){	
		var update = {
		  '_recStatus': 'DELETED'
		};
		request(url)
		.put('/api/logout/' + insertedId)
		.send(update)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			else {
				res.should.have.status(200);
				done();
			}
	});
});
