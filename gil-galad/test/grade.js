var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');
	
describe('StudentGrade', function(){
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var insertedId = 0;

	describe('insert()', function(){
		it('should create a new student grade', function (done) {
			var studentGrade = {
				'studentId':'123435',
				'sectionId':'CMSC100 EF-4L',
				'grade':'2.00'
			};
			request(url)
				.post('api/grades')
				.send(sectionn)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['studentId','sectionId','grade']);
					insertedId = res.body._id;
					done();
				});
		});

	});
});
