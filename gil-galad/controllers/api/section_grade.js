var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM grades WHERE sectionId = ?" , 
		[req.params.id], 

		function(err, rows) {
			if (err) return next(err);
			
			if (rows.length === 0) res.send(404, {message: 'Section not found.' + err});
			
			res.send(rows);
		});
};	
