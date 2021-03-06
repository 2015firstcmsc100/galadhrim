var config = require(__dirname + '/../config/config'),
	utils = require(__dirname + '/../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');
	
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var randomizedCode = utils.getRandomString();
	var insertedId = 0;
	
describe('Update a degree program', function () {
		
		it('should update a specific degree program record: code field only', function (done) {
			var update = {
				'code': randomizedCode + '(edited)',
			};
			request(url)
				.put('/api/degree-programs/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code', randomizedCode + ' (edited)');
						res.body.should.have.property('name', 'BS Computer Science');
						done();
					}
				});
		});


		it('should update a specific degree program record: name field only', function (done) {
			var update = {
				'name': 'BS Computer Science(edited)'
			};
			request(url)
				.put('/api/degree-programs/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code', randomizedCode + ' (edited)');
						res.body.should.have.property('name', 'BS Computer Science (edited)');
						done();
					}
				});
		});


		it('should update a specific degree program record', function (done) {
			var update = {
				'code': randomizedCode,
				'name': 'BS Computer Science'
			};
			request(url)
				.put('/api/degree-programs/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.property('code', randomizedCode);
					res.body.should.have.property('name', 'BS Computer Science');
					done();
				});
		});


		it('should return error trying to update a degree program record that does not exist', function (done) {
			var update = {
				'code': randomizedCode + ' (edited)',
				'name': 'BS Computer Science (edited)'
			};
			request(url)
				.put('/api/degree-programs/0')
				.send(update)
				.end(function(err, res) {
					if (err) {
					   done();
					}
					else {
					   throw new Error({'message': 'Can retrieve a non-existent degree program'});
					}
				});
		});
	});
