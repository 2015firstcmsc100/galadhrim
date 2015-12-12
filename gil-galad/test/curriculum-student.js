var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Curriculum', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var randomizedCode = utils.getRandomString();
	var insertedId = 0;

//degreeProgramId

	describe('update()', function () {
		it('should update a current curriculum record', function (done) {
			var curriculum = {
				'code': randomizedCode,
				'name': 'BS Computer Science',
				'degreeProgramId': 'BSCS'
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

		it('should return error trying to update a curriculum record with duplicate code', function (done) {
			var curriculum = {
				'code': randomizedCode,
				'name': 'BS Computer Science',
				'degreeProgramId': 'BSCS'
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to update existing curriculum despite duplicate code'});
					}
				});
		});
		it('should return error trying to update a curriculum record with duplicate name', function (done) {
			var curriculum = {
				'code': randomizedCode,
				'name': randomizedCode,
				'degreeProgramId': 'BSCS'
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to update existing curriculum despite duplicate name'});
					}
				});
		});
		it('should return error trying to update a curriculum record with duplicate degreeProgramId', function (done) {
			var curriculum = {
				'code': randomizedCode,
				'name': 'BS Computer Science',
				'degreeProgramId': randomizedCode
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to update existing curriculum despite duplicate degreeProgramId'});
					}
				});
		});

		it('should return error trying to update a curriculum record without code and degreeProgramId', function (done) {
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
						throw new Error('Able to update curriculum record without code and degreeProgramId');
					}
				});
		});

		it('should return error trying to update a curriculum record without name and degreeProgramId', function (done) {
			var curriculum = {
				'code': randomizedCode
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to update curriculum record without name and degreeProgramId');
					}
				});
		});
		it('should return error trying to update a curriculum record without name and code', function (done) {
			var curriculum = {
				'degreeProgramId': randomizedCode
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to update curriculum record without name and  code');
					}
				});
		});
		it('should return error trying to update a curriculum record without degreeProgramId', function (done) {
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
						throw new Error('Able to update curriculum record without degreeProgramId');
					}
				});
		});
		it('should return error trying to update a curriculum record without name', function (done) {
			var curriculum = {
				'code': randomizedCode,
				'degreeProgramId': randomizedCode
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to update curriculum record without name');
					}
				});
		});
		it('should return error trying to update a curriculum record without code', function (done) {
			var curriculum = {
				'name': 'BS Computer Science',
				'degreeProgramId': randomizedCode
			};
			request(url)
				.post('/curriculum')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to update curriculum record without code');
					}
				});
		});


});
