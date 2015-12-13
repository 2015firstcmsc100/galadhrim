var config = require(__dirname + '/../../../config/config'),
	utils = require(__dirname + '/../../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Log', function(){
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var insertedId = 0;

	describe('insert()', function(){
		it('should create a new log', function (done) {
			var log = {
				'userId': 5,
				'action':'some action here',
				'result':'some results here',
			};
			request(url)
				.post('api/monitoring/logs')
				.send(logn)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['userId','action','result']);
					insertedId = res.body._id;
					done();
				});
		});

		it('should return error trying to create a log with duplicate code', function (done) {
			var log = {
				'userId': 5,
				'action':'some action here',
				'result':'some results here',
			};
			request(url)
				.post('api/monitoring/logs')
				.send(log)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to create log in spite of duplicate code'});
					}
				});
		});

		it('should return error trying to create a log without code', function (done) {
			var log = {
				'action': 'some action here'
			};
			request(url)
				.post('api/monitoring/logs')
				.send(log)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create log without code');
					}
				});
		});

		it('should return error trying to create a log without actor', function (done) {
			var log = {
				'userId':5
			};
			request(url)
				.post('api/monitoring/logs')
				.send(log)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create log without actor');
					}
				});
		});


	});

	describe('findOne()', function () {
		it('should retrieve a specific log record', function (done) {
			request(url)
				.get('/api/monitoring/logs/' + insertedId)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});


		it('should return error trying to retrieve a log record that does not exist', function (done) {
			request(url)
				.get('/api/monitoring/logs/0')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to retrieve a non-existent log record'});
					}
				});
		});
	});


});