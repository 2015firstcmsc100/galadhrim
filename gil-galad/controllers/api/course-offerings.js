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

}
