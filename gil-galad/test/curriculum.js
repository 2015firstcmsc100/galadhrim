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
	
	describe('findOne()', function () {
		it('should retrieve a specific curriculum', function (done) {
			request(url)
				.get('/api/curricula/1')
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['_id','code','name']);
					done();
				});
		});


		it('should return error trying to retrieve a specific curriculum that does not exist', function (done) {
			request(url)
				.get('/api/curricula/1')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to retrieve a non-existent curriculum'});
					}
				});
		});
	});
	
	describe("remove()", function() {
		it("should return the deleted curricula", function(done) {
		request(url)
			.delete("/api/curricula/0")
			.end(function(err, res) {
			if(err) {
				done();
			} else {
				res.should.have.status(200);
				res.body.should.be.an.instanceof(Object);
				res.should.have.properties(["_id", "code", "name", "degreeProgramId", "_created", "_recStatus"]);
			}
			});
		});
	
		it("should mark _recStatus of curricula as DELETED", function(done) {
		request(url)
			.delete("/api/curricula/0")
			.end(function(err, res) {
			if(err) {
				done();
			} else {
				res.should.have.status(200);
				res.should.have.property("_recStatus", "DELETED");
				done();
			}
			});
		});
	
		it("should return error trying to delete a curricula that does not exist", function(done) {
		request(url)
			.delete("/api/curricula/abcd")
			.end(function(err, res) {
			if(err) {
				done();
			} else {
				throw new Error({"message": "Cannot delete a curricula that does not exist."});
			}
			});
		});
	});
	
});
