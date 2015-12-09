var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');
var utils = require(__dirname + '/../../../../lib/utils');

exports.login = function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; ///Gets the current IP address.
  var currTime = new Date(); ///Gets the current date.
  currTime.setHours(currTime.getHours()+5); ///Adds 5 hrs for it.

  ///To avoid errors.
  if (!req.body.username) {
    return res.send(451, {'error': true, 'message': 'Missing parameter: username DUNN DUNN DUNNNNNN'});
  }
  if (!req.body.password) {
    return res.send(451, {'error': true, 'message': 'Missing parameter: password'});
  }

  ///Query to check if the username and password exists.
	db.query("SELECT * FROM user WHERE username=? and password=?", [req.body.username, req.body.password], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) { ///If the username with that password is not found.
			res.send(404, {message: 'Username not found.'});
		} else {
      ///Query to insert it into the __login record.
      db.query("INSERT INTO __login (userId, sessionToken, ipAddress, expiration) VALUES (?, ?, ?, ?)",
      [rows[0]._id, utils.getRandomString(), ip, currTime], function(err, row){
        if (err) return next(err);
        if(rows.length === 0){
          res.send(552, {message: 'Session ('+row.sessionToken+') was not created.'});
        } else{
          res.send(row);
        }
      });
		}
	});
};
