var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');


exports.findEmployees = function(req, res, next) {
	db.query("SELECT * FROM employee", function(err, rows) {
		if (err) res.send(400, {message: 'Bad Request.'});
		else {
			res.send(200, rows);
		}
	});
};
