var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Login', function() {

	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var randomizedUsername = utils.getRandomString();
	var randomizedPassword = utils.getRandomString();
	var randomizedEmailAdd = utils.getRandomString();
	var insertedId = 0;


	describe('insert()', function () {

		it('should create a new user', function (done) {
			var user = {
				'username': randomizedUsername,
				'password': randomizedPassword,
				'emailAddress': randomizedEmailAdd
			};
			request(url)
				.post('/login')
				.send(user)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['id', 'username', 'password','emailAddress']);
					insertedId = res.body.id;
					done();
				});
		});

		it('should return error trying to create a user with duplicate username', function (done) {
			var user = {
				'username': randomizedUsername,
				'password': randomizedPassword,
				'emailAddress': randomizedEmailAdd
			};
			request(url)
				.post('/login')
				.send(user)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to create new user despite duplicate username.'});
					}
				});
		});

		it('should return error trying to create a user without username', function (done) {
			var user = {
				'password': randomizedPassword,
				'emailAddress': randomizedEmailAdd
			};
			request(url)
				.post('/login')
				.send(user)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create a user without username');
					}
				});
		});

		it('should return error trying to create a user without password', function (done) {
			var user = {
				'username': randomizedUsername,
				'emailAddress': randomizedEmailAdd
			};
			request(url)
				.post('/login')
				.send(user)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create a user without password');
					}
				});
		});

		it('should return error trying to create a user without email address', function (done) {
			var user = {
				'username': randomizedUsername,
				'password': randomizedPassword
			};
			request(url)
				.post('/login')
				.send(user)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create a user without email address');
					}
				});
		});

		it('should return error trying to create a user without password and email address', function (done) {
			var user = {
				'username': randomizedUsername
			};
			request(url)
				.post('/login')
				.send(user)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create a user without password and email address');
					}
				});
		});

		it('should return error trying to create a user without username and email address', function (done) {
			var user = {
				'password': randomizedPassword
			};
			request(url)
				.post('/login')
				.send(user)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create a user without username and email address');
					}
				});
		});

		it('should return error trying to create a user without username and password', function (done) {
			var user = {
				'emailAddress': randomizedEmailAdd
			};
			request(url)
				.post('/login')
				.send(user)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create a user without username and password');
					}
				});
		});

	});

});
