var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Degree Program', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var randomizedCode = utils.getRandomString();
	var insertedId = 0;


	describe('insert()', function () {
		it('should create a new degree program record', function (done) {
			var degreeProgram = {
				'code': randomizedCode,
				'name': 'BS Computer Science'
			};
			request(url)
				.post('/degree-programs')
				.send(degreeProgram)
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

		it('should return error trying to create a degree program record with duplicate code', function (done) {
			var degreeProgram = {
				'code': randomizedCode,
				'name': 'BS Computer Science'
			};
			request(url)
				.post('/degree-programs')
				.send(degreeProgram)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to create degree program record despite duplicate code'});
					}
				});
		});

		it('should return error trying to create a degree program record without code', function (done) {
			var degreeProgram = {
				'name': 'BS Computer Science'
			};
			request(url)
				.post('/degree-programs')
				.send(degreeProgram)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create degree program record without code');
					}
				});
		});

		it('should return error trying to create a degree program record without name', function (done) {
			var degreeProgram = {
				'code': utils.getRandomString(),
			};
			request(url)
				.post('/degree-programs')
				.send(degreeProgram)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create degree program record without name');
					}
				});
		});

	});


	describe('find()', function () {
		it('should retrieve all degree program records', function (done) {
			request(url)
				.get('/degree-programs')
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});
	});


	describe('findOne()', function () {
		it('should retrieve a specific degree program record', function (done) {
			request(url)
				.get('/degree-programs/' + insertedId)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});


		it('should return error trying to retrieve a degree program record that does not exist', function (done) {
			request(url)
				.get('/degree-programs/0')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to retrieve a non-existent degree program'});
					}
				});
		});
	});


	describe('update()', function () {
		
		it('should update a specific degree program record: code field only', function (done) {
			var update = {
				'code': randomizedCode + '(edited)',
			};
			request(url)
				.put('/degree-programs/' + insertedId)
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
				.put('/degree-programs/' + insertedId)
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
				.put('/degree-programs/' + insertedId)
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
				.put('/degree-programs/0')
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


	describe('remove()', function () {
		it('should remove a specific degree program record', function (done) {
			request(url)
				.delete('/degree-programs/' + insertedId)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});


		it('should return error trying to remove a degree program record that does not exist', function (done) {
			request(url)
				.delete('/degree-programs/0')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to delete a non-existent degree program'});
					}
				});
		});
	});

});
