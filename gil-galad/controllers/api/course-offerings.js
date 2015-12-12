var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.find = function(req,res,next){

  if (!req.body.code) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: code'});
	}

  db.query('SELECT code, name FROM degree_program where code like ?', ['%'+req.body.code+'%'],
    function(err,rows){
      if(err) return next(err);
      if(rows.length === 0) {
        res.send(404,{message:'No course found'});
      }
      else res.send(rows);
    }
  );

};



//DELETE COURSE-OFFERINGS: Marks all sections within a specific year and sem as deleted.
exports.removeSections = function(req, res, next) {
	db.query("UPDATE section SET _recStatus ='DELETED',_updated = now() WHERE year=? and semester=?", [req.params.year,req.params.sem], 
		function(err, rows) {
			if (err) return next(err);
			
			if (rows.length === 0) {
			
				res.status(400).send( {message: 'Course-offerings in year '+req.params.year+': '+req.params.sem+' semester WAS NOT REMOVED.'});
				//res.send(400, {message: 'Course-offerings in year '+req.params.year+': '+req.params.sem+' semester WAS NOT REMOVED.'});
			} else {
				res.status(200).send(rows);
				//res.send(200, rows);
			}
		});
}







