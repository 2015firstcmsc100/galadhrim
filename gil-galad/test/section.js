var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Section', function(){
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var insertedId = 0;

	describe('insert()', function(){
		it('should create a new section', function (done) {
			var section = {
				'courseId': 10,
				'name':'Some course',
				'numberofStudents':100,
				'unitId':100,
				'year':'2015',
				'semester':'1st semester'
			};
			request(url)
				.post('api/sections')
				.send(sectionn)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['courseId','name','numberofStudents','unitId','year','semester']);
					insertedId = res.body._id;
					done();
				});
		});

		it('should return error trying to create a section with duplicate code', function (done) {
			var section = {
				'courseId': 10,
				'name':'Some course',
				'numberofStudents':100,
				'unitId':100,
				'year':'2015',
				'semester':'1st semester'
			};
			request(url)
				.post('api/sections')
				.send(section)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to create section despite duplicate code'});
					}
				});
		});

		it('should return error trying to create a section without code', function (done) {
			var section = {
				'name': 'Some course'
			};
			request(url)
				.post('api/sections')
				.send(section)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create section without code');
					}
				});
		});

		it('should return error trying to create a section without name', function (done) {
			var section = {
				'courseId':10
			};
			request(url)
				.post('api/sections')
				.send(section)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create section without name');
					}
				});
		});


	});
});