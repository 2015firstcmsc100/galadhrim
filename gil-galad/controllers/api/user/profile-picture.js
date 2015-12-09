var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql'),
    multer = require('multer'),
    utils = require(__dirname + '/../../../../lib/utils');

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, __dirname + '/../../../uploads/profile-picture');
	},
	filename: function(req, file, cb) {
		var fileExtension = utils.getFileExtension(file.originalname);
		if(!fileExtension || !/^(jpe?g|png)$/.test(fileExtension.toLowerCase())) {
			cb(new Error("Unaccepted file extension"));
		}
		cb(null, req.params.id + '.' + fileExtension);
	}
});
var upload = multer({ storage: storage }).single('profile-picture');

exports.update = function(req, res, next) {
	upload(req, res, function(err) {
		if(err) {
			return next(err);
		}
		if(!req.file) {
			return res.send({ message: 'No file was found' });
		}
		db.query("UPDATE user SET profilePicture = ?, _updated = now() WHERE _id = ?", [req.file.path , req.params.id], function(err, rows) {
			if (rows.affectedRows === 0){
				return res.send(404, {'error': true, 'message': 'User not found.'});
			}

			if (err){
				return next(err);	
			} 
			res.send({ message: 'Your Profile picture was successfully updated' });
		});
	});

};
