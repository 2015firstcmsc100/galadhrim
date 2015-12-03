var config = require(__dirname + '/../../config/config'),
	request = require('supertest'),
	should = require('should-http');


describe('employee',function(){

	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);

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

});