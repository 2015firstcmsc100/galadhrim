var	logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');				//connecting to database


exports.findAStudentRecord = function(req, res, next){
	db.query("SELECT * FROM student WHERE id=?", [req.params.id], function(err, rows){		//retrieving a student data
		if(err) return next(err);		//skipping all the route handlers and send errors to client
		if(rows.length===0){
			res.status(404).send('Student record not found!');
		}else{
			res.send(200, rows[0]);		//send retrieved row
		}
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM student WHERE _id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
};

exports.update = function(req, res, next) {
	db.query("UPDATE student SET ? WHERE id=?", [req.body, req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(updated) {
		
			if (updated === null) {
				res.send(404, {message: 'Student record does not exist.'});
			}
			
			if (!updated) {
				res.send(400, {message: 'Failed to update student record.'});
			}
			
			else {
				res.send(updated);
			}
		});
	});
};

exports.update_RegAdviser = function(req, res, next) {
	db.query("UPDATE student_adviser SET ? WHERE id=? AND studentId=?", [req.body, req.params.id, req.params.id], function(err, rows) {
		if (err) return next(err);			//skipping route handlers and send errors to client
		selectOne(req.params.id, function(updated) {
		
			if (updated === null || !updated) {
				res.send(404, {message: 'Id does not exist.'});
			}
			
			else {
				selectOne(req.params.id, function(updatedRow){
					res.status(200).send(updated);
				});
			}
		});
	});
};	
