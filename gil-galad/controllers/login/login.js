var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.login = function(req, res, next) {
  if (!req.body.username) {
    return res.send(451, {'error': true, 'message': 'Missing parameter: username'});
  }
  if (!req.body.password) {
    return res.send(451, {'error': true, 'message': 'Missing parameter: password'});
  }

	db.query("SELECT * FROM user WHERE username=? and password=?", [req.params.username, req.params.password], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Username not found.'});
		} else {
			res.send(rows[0]);
		}
	});
};
  