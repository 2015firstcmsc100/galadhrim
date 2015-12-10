var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('unit', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var randomizedCode = utils.getRandomString();
	var insertedId = 0;


	describe('insert()', function () {
		it('should create a new unit record', function (done) {
			var unit = {
				'code': randomizedCode,
				'name': 'Unit123'
			};
			request(url)
				.post('/api/unit')
				.send(unit)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['code', 'name']);
					insertedId = res.body._id;
					
					res.body.should.have.property('code', randomizedCode);
					res.body.should.have.property('name', 'Unit123');
						
					done();
				});
		});

		it('should return error trying to create a unit record with duplicate code', function (done) {
			var unit = {
				'code': randomizedCode,
				'name': 'Unit456'
			};
			request(url)
				.post('/api/unit')
				.send(unit)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to create new unit despite duplicate code'});
					}
				});
		});

		it('should return error trying to create a unit record without code', function (done) {
			var unit = {
				'name': 'Unit789'
			};
			request(url)
				.post('/api/unit')
				.send(unit)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create unit record without code');
					}
				});
		});

		it('should return error trying to create a unit record without name', function (done) {
			var unit = {
				'code': utils.getRandomString(),
			};
			request(url)
				.post('/api/unit')
				.send(unit)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create unit record without name');
					}
				});
		});
	});
	
});
