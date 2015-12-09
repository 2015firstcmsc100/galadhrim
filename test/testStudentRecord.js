/*
Add test case suite for GET /api/students.

		Add a Web service endpoint for retrieving multiple student records

		GET
		/api/students
		@query (optional) page - the position of the records in relation to how data are sorted
		@query (optional) size - the number of records in a page

		OK, 200
		Returns an object containing the following:

		page
		size
		data - array of student records
		Client error, 4xx
		Returns an error record containing the error message
*/


var should = require ('should-http'),
	request = require ('supertest'),
	config = require('../config/config');

/*var obj ={ //since there's no back end yet, this is for verification purposes
	page: 2,
	size: 2,
	data: []
}*/
	
describe("student", function(){
	var url = "localhost:"+config.port;

	describe("find()", function(){
		it("should retrieve all student records", function(done){
			request(url)
				.get('/api/students')
				.end(function(err,res){
					if (err) throw err;
					res.should.have.status(200);
					res.body.should.have.property('page');
					res.body.should.have.property('size');
					res.body.should.have.property('data');
					res.body.data.should.be.an.instanceOf(Array);
					//obj.should.have.property('page');
					//obj.should.have.property('size');
					//obj.should.have.property('data');
					//obj.data.should.be.an.instanceOf(Array);
					done();
				});
		});	
	});
});
