var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Request TCG', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var insertedId = 0
	
    describe('insert()', function(){
		it('Should be able to insert TCG', function (done) {
			var tcg = {
				'studentId': '2013-12345',
				'startYear':'2014',
				'startSemester': '1st semester',
				'endYear': '2015',
				'endSemester':'2nd semester',
				'isApproved':'PENDING'
			};
			request(url)
				.post('/api/tcg/:id')
				.send(tcg)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['studentId','startYear','startSemester','endYear','endSemester','isApproved']);
					insertedId = res.body._id;
					done();
				});
		});
	});
});


