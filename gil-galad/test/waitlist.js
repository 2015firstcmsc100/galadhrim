var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Waitlist', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var insertedId = 0;


	describe('rertieve()', function () {
		it('should retrieve all waitlist records', function (done) {
			var records = {
				'page' : '2',
				'size' : '3',
				'data' : [
							{
								'_id': 1,
								'sectionId': 1,
								'studentId': '2013-12345',
								'_created', '2015-12-01',
								'_recStatus' : 'ACTIVE', 
								'_updated': '2015-12-02'
							}
						]
			};
			request(url)
				.get('/api/ocm/waitlists')
				.send(records)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['page', 'size', 'data']);
					res.body.data.should.not.be.empty;
					insertedId = res.body.id;
					done();
				});
		});

		it('should return error trying to retrieve waitlist records with no data', function (done) {
			var records = {
				'page' : 2,
				'size' : 3
			};
			request(url)
				.get('/api/ocm/waitlists')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to retrieve waitlists without data'});
					}
				});
		});

		it('should return error trying to retrieve waitlist records no page', function (done) {
			var records = {
				'size' : 3,
				'data' : [
							{
								'_id': 1,
								'sectionId': 1,
								'studentId': '2013-12345',
								'_created', '2015-12-01',
								'_recStatus' : 'ACTIVE', 
								'_updated': '2015-12-02'
							}
						]
			};
			request(url)
				.get('/api/ocm/waitlists')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to retrieve waitlists without page'});
					}
				});
		});

		it('should return error trying to retrieve waitlist records no size', function (done) {
			var records = {
				'page' : 2,
				'data' : [
							{
								'_id': 1,
								'sectionId': 1,
								'studentId': '2013-12345',
								'_created', '2015-12-01',
								'_recStatus' : 'ACTIVE', 
								'_updated': '2015-12-02'
							}
						]
			};
			request(url)
				.get('/api/ocm/waitlists')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to retrieve waitlists without size'});
					}
				});
		});

		it('should return error trying to retrieve waitlist records with empty data', function (done) {
			var records = {
				'page' : 2,
				'size' : 3,
				'data' : []
			};
			request(url)
				.get('/api/ocm/waitlists')
				.send(curriculum)
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to retrieve waitlists with empty data'});
					}
				});
		});

	});

	describe("insert()", function(){
		it('should insert sample data', function(done){
			request(url)
			.post('api/ocm/waitlist')
			.send({'studentId':'2010-12345', 'sectionId':1})
			.end(function(err, res){
				if (err) throw err;
				res.should.have.status(200);
				res.body.should.be.an.instanceOf(Object);
				done();
			});
		});
	});
});