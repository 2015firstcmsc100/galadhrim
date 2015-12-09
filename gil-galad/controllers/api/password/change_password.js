var config  = require(__dirname + '/../../../../config/config'),
    util    = require(__dirname + '/../../../../lib/utils'),
    db  	= require(__dirname + '/../../../lib/mysql');


exports.change = function(req, res, next){
    db.query("SELECT emailAddress FROM user WHERE _id=?", [req.params.id], function(err, rows) { 	//checks the email of the user if available
        if (err) return next(err);
        if (rows.length === 0) {
            res.send(404, {message: 'Unable to change password. User not found.'});
        } else {
            db.query("UPDATE password SET ? WHERE id=?", [req.body, req.params.id], function(err, rows) {		//query for updating the password
				if (err) return next(err);
				selectOne(req.params.id, function(updated) {
					if (!updated) {
						res.send(400, {message: 'Change of password unsuccessful!'});
					} else {
						res.send(updatedRow);												//returns updated fields
					}
				});
			});
        }
    });
}
