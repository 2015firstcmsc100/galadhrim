var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.remove = function(req, res, next) {
	db.query("UPDATE grade SET _recStatus='Deleted', _updated = now() WHERE _id=?", [req.params.id], 
	
	function(err, row) {
		if (err) return next(err);
		
		if (row.affectedRows === 0) {
			res.send(400, {message: 'Student Grade ('+req.params.id+') was not removed.'});
		} else{
			selectOne(req.params.id, function(updatedRow){
				res.status(202).send(updatedRow);
			});
		}
		
	});
};

exports.insert = function(req, res, next) {		//functio for posting grade
	if (!req.body.studentId){					//studentId is a required parameter
		return res.send(451, {'error': true, 'message': 'Missing parameter: studentId'});
	}
	if (!req.body.sectionId){					//sectionId is a required parameter
		return res.send(451, {'error': true, 'message': 'Missing parameter: sectionId'});
	}
	if (!req.body.grade) {						//grade is a required parameter
		return res.send(451, {'error': true, 'message': 'Missing parameter: grade'});
	}

	db.query("INSERT INTO grade(studentId, sectionId, grade, remarks) VALUES(?, ?, ?, ?)", [req.body.studentId, req.body.sectionId, req.body.grade, req.body.remarks], function(err, row) {	//INSERT TO GRADE QUERY
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {	// check if grade is in the table of grades
			if (!newRow) {		
				res.send(400, {message: 'Grade ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM grade WHERE _id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}
