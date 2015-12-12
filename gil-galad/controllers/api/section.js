var	logger = require(__dirname + '/../../../lib/logger'),
	db = require(__dirname + '/../../lib/mysql');


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

exports.update = function(req, res, next) {
	var column;
	var value;

	if(req.body.courseId !== undefined){
		column = 'courseId';
		value = req.body.courseId;
	}else if(req.body.name !== undefined){
		column = 'name';
		value = req.body.name;
	}else if(req.body.numberOfStudents !== undefined){
		column = 'numberOfStudents';
		value = req.body.numberOfStudents;
	}else if(req.body.daysLaboratory !== undefined){
		column = 'daysLaboratory';
		value = req.body.daysLaboratory;
	}else if(req.body.daysLecture !== undefined){
		column = 'daysLecture';
		value = req.body.daysLecture;
	}else if(req.body.daysRecitation !== undefined){
		column = 'daysRecitation';
		value = req.body.daysRecitation;
	}else if(req.body.timeLaboratory !== undefined){
		column = 'timeLaboratory';
		value = req.body.timeLaboratory;
	}else if(req.body.timeLecture !== undefined){
		column = 'timeLecture';
		value = req.body.timeLecture;
	}else if(req.body.timeRecitation !== undefined){
		column = 'timeRecitation';
		value = req.body.timeRecitation;
	}else if(req.body.roomLaboratory !== undefined){
		column = 'roomLaboratory';
		value = req.body.roomLaboratory;
	}else if(req.body.roomLecture !== undefined){
		column = 'roomLecture';
		value = req.body.roomLecture;
	}else if(req.body.roomRecitation !== undefined){
		column = 'roomRecitation';
		value = req.body.roomRecitation;
	}else if(req.body.laboratoryInstructor !== undefined){
		column = 'laboratoryInstructor';
		value = req.body.laboratoryInstructor;
	}else if(req.body.lectureInstructor !== undefined){
		column = 'lectureInstructor';
		value = req.body.lectureInstructor;
	}else if(req.body.recitationInstructor !== undefined){
		column = 'recitationInstructor';
		value = req.body.recitationInstructor;
	}else if(req.body.daysLaboratory2 !== undefined){
		column = 'daysLaboratory2';
		value = req.body.daysLaboratory2;
	}else if(req.body.daysLecture2 !== undefined){
		column = 'daysLecture2';
		value = req.body.daysLecture2;
	}else if(req.body.daysRecitation2 !== undefined){
		column = 'daysRecitation2';
		value = req.body.daysRecitation2;
	}else if(req.body.timeLaboratory2 !== undefined){
		column = 'timeLaboratory2';
		value = req.body.timeLaboratory2;
	}else if(req.body.timeLecture2 !== undefined){
		column = 'timeLecture2';
		value = req.body.timeLecture2;
	}else if(req.body.timeRecitation2 !== undefined){
		column = 'timeRecitation2';
		value = req.body.timeRecitation2;
	}else if(req.body.roomLaboratory2 !== undefined){
		column = 'roomLaboratory2';
		value = req.body.roomLaboratory2;
	}else if(req.body.roomLecture2 !== undefined){
		column = 'roomLecture2';
		value = req.body.roomLecture2;
	}else if(req.body.roomRecitation2 !== undefined){
		column = 'roomRecitation2';
		value = req.body.roomRecitation2;
	}else if(req.body.unitId !== undefined){
		column = 'unitId';
		value = req.body.unitId;
	}else if(req.body.year !== undefined){
		column = 'year';
		value = req.body.year;
	}else if(req.body.semester !== undefined){
		column = 'semester';
		value = req.body.semester;
	}

	db.query("UPDATE section SET "+column+" = "+value+", _updated = now() WHERE _id = ?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		db.query("SELECT * from section WHERE _id="+req.params.id, function(err, rows) {
			if (err) res.send(404, {message: 'Section('+req.params.id+') not updated.'});
			res.send(rows[0]);
		});
	});
};

exports.findSections = function(req, res, next) {
	db.query("SELECT * FROM section", function(err, rows) {
		if (err) {
			res.send(400, {message: 'No records found.'});
		}else {
			res.send(200, rows);
		}
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
