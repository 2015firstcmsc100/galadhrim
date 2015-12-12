var logger = require(__dirname + '/../../../../lib/logger'),
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
	}else{

		res.send(404, {message: 'Request is not valid'});
	}

	db.query("UPDATE section SET "+column+" = "+value+", _updated = now() WHERE _id = ?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		db.query("SELECT * from section WHERE _id="+req.params.id, function(err, rows) {
			if (err) res.send(404, {message: 'Assigned Faculty of Section('+req.params.id+') was not updated.'});
			res.send(rows[0]);
		});
	});
};

