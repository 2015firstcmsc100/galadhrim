var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');
    
exports.findOne = function(req,res,next){
	db.query("SELECT * FROM __log WHERE _id = ?", [req.params.id], function(err, rows){
		if(err) return next(err);
		if(rows.length === 0){
			res.status(404).send('Log not found!');
		}else{
			res.send(200, rows[0]);
		}
	});
};

exports.createLog = function(req,res,next){
	db.query("INSERT INTO __log(userId, action, result) VALUES (?,?,?);", [
			req.body.userId,
			req.body.action,
			req.body.result
		], function(err,rows){
			findOne(req,res,next);
		});
};