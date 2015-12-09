var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');


exports.findOne = function (req, res, next) {
	db.query("SELECT roomLaboratory, roomLecture, roomRecitation, roomLaboratory2, roomLecture2, roomRecitation2 FROM section WHERE _id=? LIMIT 1", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404);
			res.send({message: 'Room not found.'});
		} else {
			res.status(200);
			res.send(rows[0]);
		}
	});
}

exports.find = function (req, res, next) {
	db.query("SELECT roomLaboratory, roomLecture, roomRecitation, roomLaboratory2, roomLecture2, roomRecitation2 FROM section",  function(err, rows) {
		if (err) return next(err);
		else {
			res.status(200);
			res.send(rows);
		}
	});
}
