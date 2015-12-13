var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');

exports.logout = function(req, res, next){
	db.query('UPDATE __login SET _recStatus = 'Deleted' WHERE userId=?', [req.params.id],
		function(err, row){
			if(err) return next(err);
			if(row.length === 0){ 
				res.send(404, {message: 'User ('+req.params.id+') is not found'});
			}
			else{
				res.send(row[0]);
			}
	});
};
