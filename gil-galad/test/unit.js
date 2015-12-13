var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('unit', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var randomizedCode = utils.getRandomString();
	var insertedId = 0;


	describe('insert()', function () {
		it('should create a new unit record', function (done) {
			var unit = {
				'code': randomizedCode,
				'name': 'Unit123'
			};
			request(url)
				.post('/api/unit')
				.send(unit)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['code', 'name']);
					insertedId = res.body._id;
					
					res.body.should.have.property('code', randomizedCode);
					res.body.should.have.property('name', 'Unit123');
						
					done();
				});
		});

		it('should return error trying to create a unit record with duplicate code', function (done) {
			var unit = {
				'code': randomizedCode,
				'name': 'Unit456'
			};
			request(url)
				.post('/api/unit')
				.send(unit)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error({'message': 'Able to create new unit despite duplicate code'});
					}
				});
		});

		it('should return error trying to create a unit record without code', function (done) {
			var unit = {
				'name': 'Unit789'
			};
			request(url)
				.post('/api/unit')
				.send(unit)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create unit record without code');
					}
				});
		});

		it('should return error trying to create a unit record without name', function (done) {
			var unit = {
				'code': utils.getRandomString(),
			};
			request(url)
				.post('/api/unit')
				.send(unit)
				.end(function(err, res) {
					if (err) {
						done();
					} else {
						throw new Error('Able to create unit record without name');
					}
				});
		});
	});
	
	describe('find()', function() {
		it('should retrieve all unit records', function (done) {
			request(url)
				.get('api/unit')
				.end(function(err, res){
					if(err){
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});
	});

	describe('selectOne()' function(){
		it('should retrieve a specific unit record', function (done){
			request(url)
				.get('api/unit' + insertedId)
				.end(function(err, res){
					if(err){
						throw error;
					}
					res.should.have.status(200);
					done();
				});
		});

		it('should return error trying to retrieve a unit that does not exist', function (done){
			request(url)
				.get('/api/unit/0')
				.end(function(err, res){
					if(err){
						done();
					}else{
						throw new Error({'message': 'Able to retrieve a non-existent unit'});
					}
				});
		});
	});

	describe('Update a degree program', function () {
		
		it('should update a specific unit record: code field only', function (done) { //if the user wants to update the code only
			var update = {
				'code': randomizedCode + '(edited)',
			};
			request(url)
				.put('/api/units/:' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code', randomizedCode + ' (edited)');
						res.body.should.have.property('name', 'Name (edited)');
						done();
					}
				});
		});


		it('should update a specific unit record: name field only', function (done) {	//if the user wants to update the name 
			var update = {
				'name': 'Name (edited)'
			};
			request(url)
				.put('/api/units/:' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					else {
						res.should.have.status(200);
						res.body.should.have.property('code', randomizedCode + ' (edited)');
						res.body.should.have.property('name', 'Name (edited)');
						done();
					}
				});
		});


		it('should update a specific unit record', function (done) {		//must be specific
			var update = {
				'code': randomizedCode,
				'name': 'Name'
			};
			request(url)
				.put('/api/units/:' + insertedId)
				.send(update)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.property('code', randomizedCode);
					res.body.should.have.property('name', 'BS Computer Science');
					done();
				});
		});

		it('should return error trying to update a unit record that does not exist', function (done) {	//record that does not exist
			var update = {
				'code': randomizedCode + ' (edited)',
				'name': 'BS Computer Science (edited)'
			};
			request(url)
				.put('/api/units/:0')
				.send(update)
				.end(function(err, res) {
					if (err) {
					   done();
					}
					else {
					   throw new Error({'message': 'Can retrieve a non-existent degree program'});
					}
				});
		});
	});

});

	describe('remove()', function(){ 
		it('should delete units', function(done){ 
			request(url) 
				.delete('/api/units/' + insertedId) 
				.end(function(err,res){ 
					if(err){ 
						throw err; 
					} 
					res.should.have.status(200); 
					done(); 
					}); 
		});
		it('should return error trying to remove units that does not exist', function(done){ 
			request(url) 
				.delete('/api/units/0') 
				.end(function(err,res){ 
					if(err){ 
						done(); 
					}else{ 
						throw new Error({ 'message' : 'Able to delete a non-existent unit' }); 
					} 
				});                   
		});             
	});
