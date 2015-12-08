var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');


describe('employee',function(){
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var insertedId = 0;

	describe('delete_employee',function(){
		it('should delete one existing employee record', function(done){
			request(url)
				.delete('/api/employees/123456789')
				.end(function(err,res){
					if(err) throw err;
					res.should.have.status(200);
					done();
				});
		});
	});

	describe('update()', function () {
		it('should update a specific employee: firstName field only', function (done) {
			var update = {
				'firstName': 'Marie Betel (edited)',
			}; 
			request(url)
				.put('api/employees/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('firstName', 'Marie Betel (edited)');
						res.body.should.have.property('lastName', 'de Robles');
						done();
					}
				});
		});


		it('should update a specific employee: name lastName only', function (done) {
			var update = {
				'lastName': 'de Robles (edited)'
			};
			request(url)
				.put('api/employees/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('firstName', 'Marie Betel (edited)');
						res.body.should.have.property('lastName', 'de Robles (edited)');
						done();
					}
				});
		});


		it('should update a specific employee', function (done) {
			var update = {
				'firstName': 'Marie Betel',
				'lastName': 'de Robles'
			};
			request(url)
				.put('api/employees/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.property('firstName', 'Marie Betel');
					res.body.should.have.property('lastName', 'de Robles');
					done();
				});
		});


		it('should return error trying to update a employee that does not exist', function (done) {
			var update = {
				'firstName': 'Marie Betel (edited)',
				'lastName': 'de Robles (edited)'
			};
			request(url)
				.put('api/employees/' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
					   done();
					}
					else {
					   throw new Error({'message': 'Can retrieve a non-existent employee'});
					}
				});
		});
	});
});