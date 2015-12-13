var	logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');				//connecting to database


exports.showAllStudentRecords = function(req, res, next){
	db.query("SELECT * FROM student WHERE _recStatus='ACTIVE'" , function(err, rows){		//retrieving a student data
		if(err) return next(err);		//skipping all the route handlers and send errors to client
		if(rows.length===0){
			res.status(404).send('No Student Records Found!');
		}else{
			res.send(200, rows);		//send retrieved row
		}
	});
};

exports.findAStudentRecord = function(req, res, next){
	db.query("SELECT * FROM student WHERE _id=? AND _recStatus='ACTIVE' LIMIT 1", [req.params.id], function(err, rows){		//retrieving a student data
		if(err) return next(err);		//skipping all the route handlers and send errors to client
		if(rows.length===0){
			res.status(404).send('Student record not found!');
		}else{
			res.send(200, rows[0]);		//send retrieved row
		}
	});
};

exports.createStudentRecord = function(req, res, next){

	function start () {
		if (!req.body.studentId) {
			return res.send(400, {message: 'Missing parameter: studentId'});
		}
		if (!req.body.firstName) {
			return res.send(400, {message: 'Missing parameter: firstName'});
		}
		if (!req.body.lastName) {
			return res.send(400, {message: 'Missing parameter: lastName'});
		}
		if (!req.body.curriculumId) {
			return res.send(400, {message: 'Missing parameter: curriculumId'});
		}
		if (!req.body.sex) {
			return res.send(400, {message: 'Missing parameter: sex'});
		}
		//return res.send(200, {message: 'Plutia'});

		db.query("SELECT * FROM student where _id = ?", [req.body.studentId], function(err, rows) {
			if (err) return next(err);
			if (rows.length !== 0) {
				return res.status(400).send({message: 'Duplicate entry for student: ' + req.body.studentId});
			}
			else {
				insertRecord();
			}
		});
	}

	function insertRecord () {
		db.query ("INSERT INTO student (_id, firstName, middleName, lastName, curriculumId, sex) VALUES (?, ?, ?, ?, ?, ?)",
			[
				req.body.studentId,
				req.body.firstName,
				req.body.middleName,
				req.body.lastName,
				req.body.curriculumId,
				req.body.sex
			],

		function(err, row) {
			if (err) return next(err);
			else returnResource();
		});
	}

	function returnResource() {
		db.query("SELECT * FROM student where _id = ?", [req.body.studentId],

		function(err, row) {
			if (err) return next(err);

			return res.status(200).send(row[0]);
		});
	}

	start();
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
	db.query("UPDATE student SET ? WHERE id=? AND _recStatus= 'ACTIVE' ", [req.body, req.params.id], function(err, rows) {
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


exports.assign_RegAdviser = function(req,res,next){
	db.query("INSERT INTO student_adviser(studentId, registrationAdvier) VALUES (?,?)",[req.body.studentId, req.body.registrationAdviser], function(err,rows){
		if(err) return next(err);
		selectOne(req.params.id, function(newRow){
			if(!newRow){
				res.send(400, {message: 'Registration Adviser ('+row.insertId+') was not created.'});
			}else{
				res.send(newRow);
			}
		});
	});
}

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

//ws FOR marking an existing student record as deleted
exports.update_isDeletedRecord = function(req, res, next) {
	db.query("UPDATE student SET _recStatus = 'DELETED' WHERE id=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(deleted) {

			if (deleted === null || !deleted) {
				res.send(404, {message: 'Id does not exist.'});
			}

			else {
				selectOne(req.params.id, function(deletedRow){
					res.status(200).send(deleted);
				});
			}
		});
	});
};
