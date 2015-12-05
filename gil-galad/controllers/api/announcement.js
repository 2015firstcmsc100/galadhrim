var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.insert = function(req, res, next) {
	if (!req.params.userId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: userId'});
	}
	if (!req.params.title) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: title'});
	}
	if (!req.params.description) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: description'});
	}
  if (!req.params.datePosted) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: datePosted'});
	}
  if (!req.params.expiryDate) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: expiryDate'});
	}

	db.query("INSERT INTO announcement(userId, title, description, datePosted, expiryDate) VALUES(?, ?, ?, ?, ?)", [req.params.userId, req.params.title, req.params.description, req.params.datePosted, req.params.expiryDate], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.send(400, {message: 'Announcement ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM announcement WHERE id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}
