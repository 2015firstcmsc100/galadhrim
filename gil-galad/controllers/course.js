var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM course", function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'No course found.'});
		} else {
			res.send(rows);
		}
	});
};

  exports.remove = function(req, res, next) {
    db.query("DELETE FROM course WHERE _id=?", [req.params.id], function(err, row) {
      if (err) return next(err);
      if (rows.length ===0) {
        res.send(404, {message: 'Course ('+req.params.id+') was not removed.'})
      } else {
        res.send(200, row);
      }
    });
  };
