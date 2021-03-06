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
	
	describe('remove()', function () {
		it('should delete a specific grade record', function (done) {
			request(url)
				.delete('/api/grades/:' + insertedId)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.status(200);
					done();
				});
		});


		it('should return error trying to remove a grade record that does not exist', function (done) {
			request(url)
				.delete('/api/grades/:0')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'grade does not exist'});
					}
				});
		});
	});
	
	describe('update()', function(){
		it('should create a new student grade', function (done) {
			var studentGrade = {
				'studentId':'123435',
				'sectionId':'CMSC100 EF-4L',
				'grade':'2.00'
			};
			request(url)
				.put('/api/grades/:' + insertedId)
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
		it('should return error trying to remove a grade record that does not exist', function (done) {
			request(url)
				.put('/api/grades/:0')
				.end(function(err, res) {
					if (err) {
						done();
					}
					else {
						throw new Error({'message': 'grade does not exist'});
					}
				});
		});
	});
	
	describe("find()",function(){
			
			it("should return 404 retrieving a grade from a non-existent student", function(done){
			request(url)
			.get("/api/students/"+insertedId+"/grades")
			.end(function(err,res){
				//should.not.exist(insertedId);
				if(err){	//if error occurs from non-existent studentID
					throw err;
					
				}
				else{		//else, return 200
					res.should.have.status(200);
				}
				done();
			
				});
			});

			it("should not return any error", function(done){
			request(url)	//return 200 if it exists.
			.get("/api/students/"+insertedId+"/grades")
			.end(function(err,res){
			//	should.exist(insertedId);
			if(err){
				res.should.have.status(200);
			}
			else{
				throw err;
			}
			done();
				});
			}); 
		
	});
	
});
