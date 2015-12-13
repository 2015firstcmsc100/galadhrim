//#136 Add test case suite for UPDATE /api/ocm/cancel/:id.
var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');
	
describe('cancel', function(){
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var slotId = 0;
	
	describe('update()', function(){
		it('should update status of the specific slot from ENLISTED to FREE', function(done) {
			var slot = {
				'status': 'FREE'
			};
			request(url)
				.put('/api/ocm/cancel/:' + slotId)
				.send(slot)
				.end(function(err, res) {
					if(err) throw err;
					
					res.should.have.status(200);
					res.body.should.have.property('status', 'FREE');
					slotId = res.body._id;
					done();
				});
		});
		
		it('should return error trying to cancel a FREE slot', function(done) {
			request(url)
				.put('/api/ocm/cancel/:0')
				.end(function(err, res) {
					if(err) done();
					
					else {
						throw new Error({'message': 'The slot you are trying to cancel is FREE'});
					}
				});
		});
	});
	
});
