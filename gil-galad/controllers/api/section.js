var	logger = require(__dirname + '/../../lib/logger'),
	db = require(__dirname + '/../lib/mysql');


exports.insert = function(req,res,next){ 
	if (!req.body.courseId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: courseId'});
	}
	if (!req.body.name) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: name'});
	}
	if (!req.body.numberOfStudents) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: numberOfStudents'});
	}
	if (!req.body.unitId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: unitId'});
	}
	if (!req.body.year) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: year'});
	}
	if (!req.body.semester) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: semester'});
	}

	 db.query("INSERT INTO section(courseId, name, numberOfStudents, daysLaboratory, daysLecture, daysRecitation, timeLaboratory, timeLecture, timeRecitation, roomLaboratory, roomLecture, roomRecitation, laboratoryInstructor, lectureInstructor, recitationInstructor, daysLaboratory2, daysLecture2, daysRecitation2, timeLaboratory2, timeLecture2, timeRecitation2, roomLaboratory2, roomLecture2, roomRecitation2, unitId, year, semester ) VALUES ( ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?)", 

		[req.body.courseId, req.body.name, req.body.numberOfStudents, 
 		req.body.daysLaboratory, req.body.daysLecture, req.body.daysRecitation, 
 		req.body.timeLaboratory, req.body.timeLecture, req.body.timeRecitation, 
 		req.body.roomLaboratory, req.body.roomLecture, req.body.roomRecitation, 
	 	req.body.laboratoryInstructor, req.body.lectureInstructor, req.body.recitationInstructor, 
	 	req.body.daysLaboratory2, req.body.daysLecture2, req.body.daysRecitation2, 
	 	req.body.timeLaboratory2, req.body.timeLecture2, req.body.timeRecitation2, 
	 	req.body.roomLaboratory2, req.body.roomLecture2, req.body.roomRecitation2, 
	 	req.body.unitId, req.body.year, req.body.semester], 

 	function(err, row){
	 	if(err) return next(err);
	 	selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.send(552, {message: 'Section ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	 });
};


exports.find = function(req, res, next) {
	db.query("SELECT * FROM section", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM section WHERE _id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}
