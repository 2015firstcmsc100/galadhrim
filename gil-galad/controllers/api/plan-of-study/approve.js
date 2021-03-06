var logger = require(__dirname + '../../../../lib/logger'),
    db = require(__dirname + '../../../lib/mysql');
    
exports.update = function(req, res, next) {
	db.query("UPDATE plan_of_study SET isApproved = 'APPROVED', courseId = ? WHERE studentId = ?",
		[req.params.courseId, req.params.id],
		function(err, rows) {
			if (err) res.send(400, {message: 'Bad Request.'});
			res.send(rows);
		}
	);
};