var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM plan_of_study WHERE isApproved = 'PENDING' AND  previousCourseId is NOT NULL", function(err, rows){
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Not found.'});
		} else {
			res.status(200);
			res.send(rows);
		}
	});
};
