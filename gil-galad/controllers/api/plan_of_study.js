var logger = require(__dirname + '/../../lib/logger'),
    db = require(__dirname + '/../lib/mysql');

exports.update = function(req, res, next) {
	db.query("UPDATE plan_of_study SET isApproved = 'PENDING', previousCourseId = ? WHERE _id = ?",
		[req.params.id, req.params.id],
		function(err, rows) {
			if (err) res.send(400, {message: 'Bad Request.'});
			res.send(rows);
		}
	);
};
