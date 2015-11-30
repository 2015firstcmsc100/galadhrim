var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Curriculum', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var randomizedCode = utils.getRandomString();
	var insertedId = 0;


	describe('insert()', function () {
		it('should create a new curriculum record', function (done) {
			var curriculum = {
				'code': randomizedCode,
				'name': 'BS Computer Science'
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['id', 'code', 'name']);
					insertedId = res.body.id;
					done();
				});
		});

		it('should return error trying to create a curriculum record with duplicate code', function (done) {
			var curriculum = {
				'code': randomizedCode,
				'name': 'BS Computer Science'
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to create new curriculum despite duplicate code'});
					}
				});
		});

		it('should return error trying to create a curriculum record without code', function (done) {
			var curriculum = {
				'name': 'BS Computer Science'
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create curriculum record without code');
					}
				});
		});

		it('should return error trying to create a curriculum record without name', function (done) {
			var curriculum = {
				'code': utils.getRandomString(),
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create curriculum record without name');
					}
				});
		});

	});
