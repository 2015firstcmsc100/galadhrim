var	logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

 exports.findCourses = function(req, res, next){
 	db.query("SELECT * FROM curriculum_course JOIN course ON curriculum_course.courseId = course._id WHERE curriculumId=?", [req.params.id], function(err, rows) {
 		if (err) res.send(404, {message: 'Not Found'});
 		else{
 			res.send(200, rows);
 		}
 	});	
 };
 
 exports.remove = function(req, res, next) {
  db.query("UPDATE curriculum_course SET _recStatus ='Deleted' WHERE _id=?", [req.params.id], function(err, row) {
    if (err) return next(err);
    if (row.length === 0) {
      res.send(404, {message: 'Course in curriculum ('+req.params.id+') was not removed.'})
    }
    else {
      res.send(200, row[0]);
	}
  });
};

exports.insert = function(req, res, next) {
	if (!req.body.courseId) {
		return res.send(403, {'error': true, 'message': 'Missing parameter: courseId'});
	}
	if (!req.body.curriculumId ) {
		return res.send(403, {'error': true, 'message': 'Missing parameter: curriculumId'});
	}
	if (!req.body.year) {
		return res.send(403, {'error': true, 'message': 'Missing parameter: year'});
	}
	if (!req.body.semester) {
		return res.send(403, {'error': true, 'message': 'Missing parameter: semester'});
	}
	
	//checks if the course to be added to the curriculum exists
	db.query("SELECT * FROM course WHERE _id=? LIMIT 1", [req.body.courseId], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			return res.send(403, {'error': true, 'message': 'Course does not exist!'});
		} 
	});
	
	//checks if the curriculum exists
	db.query("SELECT * FROM curriculum WHERE _id=? LIMIT 1", [req.body.curriculumId], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			return res.send(403, {'error': true, 'message': 'Curriculum does not exist!'});
		} 
	});
	

	//inserts the course to curriculum 
	db.query("INSERT INTO curriculum_course(courseId, curriculumId, year, semester, prerequisites) VALUES(?, ?, ?, ?, ?)",
	[req.body.courseId,
	req.body.curriculumId,
	req.body.year,
	req.body.semester,
	req.body.prerequisites],

		function(err, row) {
			if (err) return next(err);
			check(row.insertId, function(newRow) {
				if (!newRow) {
					res.send(400, {message: 'Failed to add course to curriculum'});
				} else {
					res.send(newRow);
				}
			});
	});
	};

var check = function(id, callback) {
	db.query("SELECT * FROM curriculum_course WHERE _id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}
