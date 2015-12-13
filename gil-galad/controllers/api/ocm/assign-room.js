var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');

exports.update = function(req, res, next) {
	var column;
	var value;

	if(req.body.roomLaboratory!==undefined){
		column = 'roomLaboratory';
		value = req.body.roomLaboratory;
	}else if(req.body.roomInstructor!==undefined){
		column = 'roomInstructor';
		value = req.body.roomInstructor;
	}else if(req.body.roomRecitation!==undefined){
		column = 'roomRecitation';
		value = req.body.roomRecitation;
	}else{

		res.send(404, {message: 'Request is not valid'});
	}

	db.query("UPDATE section SET " + column + " = " + value + ", _updated = now() WHERE _id = ?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		db.query("SELECT * from section WHERE _id =" + req.params.id, function(err, rows) {
			
			if (err) res.send(404, {message: 'Assigned Room Of Section('+req.params.id+') did not update.'});
			res.send(rows[0]);
			
		});
	});
};

