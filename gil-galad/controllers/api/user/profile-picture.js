var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');

exports.update = function(req, res, next) {
	db.query("UPDATE user SET profilePicture = ?, _updated = now() WHERE _id = ?", [req.body.url , req.params.id], function(err, rows) {
		
		if (rows.affectedRows === 0){
			return res.send(404, {'error': true, 'message': 'User not found.'});
		}

		if(!req.body.url){
			return res.send(451, {'error': true, 'message': 'Missing parameter: url'});
		}

		if (err){
			return next(err);	
		} 
		res.send(rows);
	});
};
