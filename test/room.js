var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('room', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var roomId = 0;

// START
	describe('Post request to room', function() {
		it('should create a new room', function (done) {
			var newRoom = {
				room: "Test room";
			};
			request(url)
				.post('/api/rooms')
				.send(newRoom)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.be.an.instanceOf(Object).and.have.property('room', 'Test Room');
						done();
					}
				});
		});
	});
// END

	describe('update()', function () {
		
		it('should update a specific room: name field only', function (done) {
			var update = {
				'name': 'ICS Mega Hall';
			};
			request(url)
				.put('/api/rooms/' + roomId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('name', 'ICS Mega Hall');
						done();
					}
				});
		});


		it('should update a specific room: capacity field only', function (done) {
			var update = {
				'capacity': 150
			};
			request(url)
				.put('/api/rooms/' + roomId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('capacity', 150);
						done();
					}
				});
		});


		it('should update a specific room', function (done) {
			var update = {
				'_id': roomId,
				'name': 'ICS Mega Hall',
				'capacity': 150
			};
			request(url)
				.put('/api/rooms/' + roomId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.property('_id', roomId);
					res.body.should.have.property('name', 'ICS Mega Hall');
					res.body.should.have.property('capacity', 150);
					done();
				});
		});


		it('should return error trying to update a room that does not exist', function (done) {
			var update = {
				'name': 'ICS Mega Hall (edited)'
			};
			request(url)
				.put('/api/rooms/0')
				.send(update)
				.end(function(err, res) {
					if (err) {
					   done();
					}
					else {
					   throw new Error({'message': 'Can retrieve a non-existent room'});
					}
				});
		});
	});

        
        describe('remove()', function () {
		it('should remove a specific room record', function (done) {
			request(url)
				.delete('/api/rooms/' + roomId)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});


		it('should return error trying to remove a room record that does not exist', function (done) {
			request(url)
				.delete('/api/rooms/0')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'Able to delete a non-existent room'});
					}
				});
		});
	});

});
