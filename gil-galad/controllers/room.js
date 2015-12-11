var	logger = require(__dirname + '/../../lib/logger'),
    db = require(__dirname + '/../lib/mysql');


exports.find = function(req, res, next) {
	db.query("SELECT * FROM room", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};

exports.remove = function(req, res, next) {
	db.query("DELETE FROM room WHERE id=?", [req.params.id], function(err, row) {
		if (err) return next(err);
		if (row.affectedRows === 0) {
			//returns an error message when no row was matched to the given id of the row to be deleted
			res.send(404, {message: 'Selected room ('+req.params.id+') was not deleted.'});
		} else {
			//returns the row/details of the deleted room record
			res.send(202, row);
		}
		
	});
};
