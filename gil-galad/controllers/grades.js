var	logger = require(__dirname + '/../../lib/logger'),
    db = require(__dirname + '/../lib/mysql');

exports.findstudentGrade = function(req, res, next) {
	db.query("SELECT grade FROM grade WHERE studentId=? LIMIT 10" , [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Student not found.' + err});
		} else {
			var object = {
				data: rows[0],
				size: rows.length
			}
			res.send(object);
		}
	});
};	
