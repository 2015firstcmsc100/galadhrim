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
