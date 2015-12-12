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
		it('should update a specific employee: first name field only', function (done) {
			var update = {
				'firstName': 'Marie Betel (edited)'
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
						res.body.should.have.property('unitId', 12345);

						done();
					}
				});
		});


		it('should update a specific employee: last name field only', function (done) {
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
						res.body.should.have.property('unitId', 12345);

						done();
					}
				});
		});

		it('should update a specific employee: unit id field only', function (done) {
			var update = {
				'unitId': 12345
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
						res.body.should.have.property('unitId', 12345);

						done();
					}
				});
		});


		it('should update a specific employee', function (done) {
			var update = {
				'firstName': 'Marie Betel',
				'lastName': 'de Robles',
				'unitId': 12345
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
					res.body.should.have.property('unitId', 12345);

					done();
				});
		});


		it('should return error trying to update a employee that does not exist', function (done) {
			var update = {
				'firstName': 'Marie Betel (edited)',
				'lastName': 'de Robles (edited)',
				'unitId': 12345
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

	describe('insert()',function(){
		it('should create a new employee', function (done) {
			var employee = {
				'firstName': 'Marie Betel',
				'lastName': 'de Robles',
				'unitId':100
			};
			request(url)
				.post('api/employees')
				.send(employee)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['firstName','lastName','unitId']);
					insertedId = res.body._id;
					done();
				});
		});

		it('should return error trying to create an employee with duplicate code', function (done) {
			var employee = {
				'firstName': 'Marie Betel',
				'lastName': 'de Robles',
				'unitId':100
			};
			request(url)
				.post('api/employees')
				.send(employee)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to create an employee despite duplicate code'});
					}
				});
		});

		it('should return error trying to create an employee without last name', function (done) {
			var employee = {
				'firstName': 'Marie Betel',
				'unitId':100
			};
			request(url)
				.post('api/employees')
				.send(employee)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create an employee without last name');
					}
				});
		});

		it('should return error trying to create an employee without first name', function (done) {
			var employee = {
				'lastName': 'de Robles',
				'unitId':100
			};
			request(url)
				.post('api/employees')
				.send(employee)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create section without first name');
					}
				});
		});
	});

	describe('findEmployees()', function() {
	  it('should retrieve all employees', function (done) {
	    request(url)
	      .get('api/employees')
	      .end(function(err, res) {
	        if(err) {
	          throw err;
	        }
	        res.should.have.status(200);
					res.body.should.be.an.instanceOf(Object);
					res.body.should.have.property('size');
					res.body.should.have.property('data');
					res.body.should.have.property('page');
					res.body.data.should.be.an.instanceOf(Array);

	        done();
	      });
	  });
	});


});
