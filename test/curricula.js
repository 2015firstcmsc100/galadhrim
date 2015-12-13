var supertest = require('supertest');
var should = require('should-http');
var config = require('/../config/config');

// This agent refers to PORT where program is running.
var server = supertest.agent('http://localhost:' + config.port);

describe ('Retrieving all Curricula', function() {

    it ('should retrieve all curricula', function(done) {
        server
            .get('/api/curricula');
            .end (function(err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.status(200);
                done();
            });
    });
});

//Add test case suite for UPDATE /api/curricula
describe('Update Curriculum',function(){	

	describe("update()", function(){
	
		it('should update a specific curriculum: code field only', function (done) {
			var update = {
				'code': 'BSCS-SP-2013-12-40';
			};
			request(url)
				.put('/api/curricula/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code': 'BSCS-SP-2013-12-40');
						res.body.should.have.property('name': 'Sample');
						res.body.should.have.property('degreeProgramId': '3');
						done();
					}
				});
		});
		
		it('should update a specific curriculum: name field only', function (done) {
			var update = {
				'name': 'Sample';
			};
			request(url)
				.put('/api/curricula/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code': 'BSCS-SP-2013-12-40');
						res.body.should.have.property('name': 'Sample');
						res.body.should.have.property('degreeProgramId': '3');
						done();
					}
				});
		});
		
		it('should update a specific curriculum: degree program id field only', function (done) {
			var update = {
				'degreeProgramId': '3';
			};
			request(url)
				.put('/api/curricula/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code': 'BSCS-SP-2013-12-40');
						res.body.should.have.property('name': 'Sample');
						res.body.should.have.property('degreeProgramId': '3');
						done();
					}
				});
		});
	});
});
