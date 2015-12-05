var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');

exports.update = function(req, res, next) {
	var column;
	var value;

	if(req.body.laboratoryInstructor!==undefined){
		column = 'laboratoryInstructor';
		value = req.body.laboratoryInstructor;
	}else if(req.body.lectureInstructor!==undefined){
		column = 'lectureInstructor';
		value = req.body.lectureInstructor;
	}else if(req.body.recitationInstructor!==undefined){
		column = 'recitationInstructor';
		value = req.body.recitationInstructor;
	}

	db.query("UPDATE section SET "+column+" = "+value+", _updated = now() WHERE _id = ?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(updatedRow) {
			if (!updatedRow) {
				res.send(404, {message: 'Assigned Faculty of Section('+req.params.id+') was not updated.'});
			} else {
				res.send(200, updatedRow);
			}
		});
	});
};


var selectOne = function(id, callback) {
	db.query("SELECT * FROM section WHERE id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}
