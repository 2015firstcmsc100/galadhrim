var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');
	

exports.find = function(req,res,next){
	console.log('Example app liste');
 db.query("SELECT * FROM section WHERE _id = ? AND _recStatus = 'ACTIVE' ", [req.params.id],function(err, rows)
 {
  if(err) return next (err);
  if(rows.length === 0)  {
   res.status(404).send('Section not found');
  }
  else  {
   res.status(200).send(rows[0]);
  }
 });
};
