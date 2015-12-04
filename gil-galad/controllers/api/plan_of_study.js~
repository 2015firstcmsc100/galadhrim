var logger = require(__dirname + '/../../../lib/logger'),
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

exports.insert = function(req, res, next) {
	if (!req.body.courseId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: courseId'});
	}
	if (!req.body.curriculumId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: curriculumId'});
	}
	if (!req.body.studentId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: studentId'});
	}
	
	db.query("INSERT INTO plan_of_study(courseId, curriculumId, studentId) VALUES(?, ?, ?)", [req.params.courseId, req.params.curriculumId, req.params.studentId], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.send(400, {message: 'Plan of study ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM plan_of_study WHERE id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}
