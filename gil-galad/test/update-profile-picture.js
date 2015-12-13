var config = require(__dirname + '/../../config/config'),
	utils = require(__dirname + '/../../lib/utils'),
	should = require('should-http'),
	assert = require('assert'),
	request = require('supertest');

describe('Degree Program', function() {
	var url = 'http://galadhrim.loc:' + (process.env.PORT || config.port);
	var randomizedCode = utils.getRandomString();
	var insertedId = 0;

	describe('update()', function() {
		it('should update the profile picture', function(done){
			var profilePicture = {
				'_id' : randomizedCode,
				'profilePicture' : www.asdf.com/89asdf.gif
			}
			request(url)
				.post('api/user/update-profile-picture')
				.send(profilePicture)
				.end(function(err,res){
					if(err){
						throw err;
					}
					res.should.have.status(200);
					res.body.should.have.keys(['_id','profilePicture']);
					insertedId = res.body._id;
					done()
				});
		});

		it('should return error trying to update profile picture without link', function(done){
			var profilePicture = {
				'_id' : randomizedCode
			}
			request(url)
				.post('api/user/update-profile-picture')
				.send(profilePicture)
				.end(function(err,res){
					if(err){
						done();
					} else {
						throw new Error({
							'message' : 'Cannot update profile picture without link'
						});
					}
				});
		});

		it('should return error because url given is not a picture', function(done){
			var profilePicture = {
				'_id' : randomizedCode,
				'profilePicture' : www.facebook.com
			}
			request(url)
				.post('api/user/update-profile-picture')
				.send(profilePicture)
				.end(function(err,res){
					if(err){
						done();
					} else {
						throw new Error({
							'message' : 'Image not found!'
						});
					}
				})
		});
	});

});
