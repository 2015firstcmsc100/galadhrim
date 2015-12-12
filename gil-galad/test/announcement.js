var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('announcement', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var randomizedCode = utils.getRandomString();
	var insertedId = 0;


	describe('insert()', function () {
		it('should create a new announcement', function (done) {
			var announcement = {
				'_id': randomizedCode,
				'title': 'CMSC 100 project submission'
			};
			request(url)
				.post('api/announcements')
				.send(announcement)
				.end(function(err, res) {
					if (err) throw err;
					res.should.have.status(200);
					res.body.should.have.properties(['_id', 'title', 'description', 'datePosted', 'expiryDate']);
					insertedId = res.body.id;
					done();
				});
		});
		it('should create new announcement: no description', function (done) {
			var announcement = {
				'_id': randomizedCode,
				'title': 'CMSC 100 project submission',
				'datePosted':'2015/12/05',
				'expiryDate':'2015/12/05'
			};
			request(url)
				.post('api/announcements')
				.send(announcement)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.properties(['_id']);
					insertedId = res.body.id;
					done();
				});
		});
	});
	
	describe('findOne()', function () {
		it('should retrieve a specific announcement record', function (done) {
			request(url)
				.get('/announcements/' + insertedId)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});


		it('should return error trying to retrieve an announcement record that does not exist', function (done) {
			request(url)
				.get('/announcements/0')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to retrieve a non-existent announcement'});
					}
				});
		});
	});
	
	describe('find()', function () {
		it('should retrieve all recorded announcements', function (done) {
			request(url)
				.get('/announcements/')
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});

	});
	
});
