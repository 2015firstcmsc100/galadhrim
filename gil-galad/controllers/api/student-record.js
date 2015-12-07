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
			
			return res.status(200).send(row);
		});
	}

	start();
};
