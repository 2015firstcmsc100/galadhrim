var	logger = require(__dirname + '/../../lib/logger'),
    db = require(__dirname + '/../lib/mysql');				//connecting to database


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