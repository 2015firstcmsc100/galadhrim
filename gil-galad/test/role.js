var config = require(__dirname + '/../../config/config'),
    request = require('supertest'),
    should = require('should-http');

describe('Role', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);

	describe('remove()', function () {
		it('should delete a specific role record', function (done) {
			request(url)
				.delete('/api/12345678987/roles/12345678987')
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});


		it('should return error trying to remove a role record that does not exist', function (done) {
			request(url)
				.delete('/api/00000000000/roles/00000000000')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Role does not exist'});
					}
				});
		});
	});
});
