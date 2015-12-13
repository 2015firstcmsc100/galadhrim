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

		it('should return a section object of the specific id', function(done){
				request(url)
				.get('/api/sections/' + id)
				.end(function(err,res){
						if(err) throw err;
						res.should.have.status(200);
						res.body.should.have.property('_id');
						res.body.should.have.property('courseId');
						res.body.should.have.property('name');
						res.body.should.have.property('numberOfStudents');
						res.body.should.have.property('daysLaboratory');
						res.body.should.have.property('daysLecture');
						res.body.should.have.property('daysRecitation');
						res.body.should.have.property('timeLaboratory');
						res.body.should.have.property('timeLecture');
						res.body.should.have.property('timeRecitation');
						res.body.should.have.property('timeLaboratoryBin');
						res.body.should.have.property('timeLectureBin');
						res.body.should.have.property('timeRecitationBin');
						res.body.should.have.property('roomLaboratory');
						res.body.should.have.property('roomLecture');
						res.body.should.have.property('roomRecitation');
						res.body.should.have.property('laboratoryInstructor');
						res.body.should.have.property('lectureInstructor');
						res.body.should.have.property('recitationInstructor');
						res.body.should.have.property('daysLaboratory2');
						res.body.should.have.property('daysLecture2');
						res.body.should.have.property('daysRecitation2');
						res.body.should.have.property('timeLaboratory2');
						res.body.should.have.property('timeLecture2');
						res.body.should.have.property('timeRecitation2');
						res.body.should.have.property('timeLaboratoryBin2');
						res.body.should.have.property('timeLectureBin2');
						res.body.should.have.property('timeRecitationBin2');
						res.body.should.have.property('roomLaboratory2');
						res.body.should.have.property('roomLecture2');
						res.body.should.have.property('roomRecitation2');
						res.body.should.have.property('status');
						res.body.should.have.property('showInstructor');
						res.body.should.have.property('unitId');
						res.body.should.have.property('year');
						res.body.should.have.property('semester');
						res.body.should.have.property('_created');
						res.body.should.have.property('_recStatus');
						res.body.should.have.property('_updated');
						done();
				});
		});

		it('should return error from retrieving a section with an invalid id', function(done){
			request(url)
			.get('/api/sections/' + 'A')
			.end(function(err,res){
					if(err) throw err;
						res.status.should.be.greater(399);
					done();
			});
		});

	});
});
