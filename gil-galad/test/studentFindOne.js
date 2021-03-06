/*
  Testing for the resource 'Student'.
*/

var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Students',function(){
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var insertedId;

  // insert first a student before retrieving it
  before(function(done){
  	request('localhost:5000/')
      .post('api/student')
			.send({
        studentId: '9999-12345',
        firstName: 'First Name',
        middleName: 'Middle Name',
        lastName: 'Last Name',
        curriculumId: '1',
        sex: 'M'
      })
			.end(function(err, res) {
				if (err) {
					throw err;
				}
        insertedId = res.body._id;
        done();
		});
  });

  // delete the inserted student after retrieving it
  after(function(){
    request('localhost:5000/')
      .delete('api/student-record/' + insertedId);
  });

  describe("findOne()", function(){
		it('should get a single valid student record', function (done) {
      request('localhost:5000/')
				.get('api/student-record/' + insertedId)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
          res.should.be.json();
					res.body.should.have.keys(['_id', 'firstName', 'middleName', 'lastName', 'curriculumId', 'allowedUnits', 'sex', '_created', '_recStatus', '_updated']);

					done();
				});
		});

    it('should return a 404 on an invalid student record', function (done) {
      request('localhost:5000/')
				.get('api/student-record/000000')
				.end(function(err, res) {
					res.should.have.status(404);

					done();
				});
		});
	});

});
