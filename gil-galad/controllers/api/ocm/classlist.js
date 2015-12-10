var	logger = require(__dirname + '/../../lib/logger'),
    db = require(__dirname + '/../lib/mysql');



exports.find = function(req, res, next) {
	db.query("select courseId,name,numberOfStudents,unitId,year,semester from section where unitId=1 and semester="First";", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Section not found.'});
		} else {
			res.send(rows[0]);
		}
	});
};
