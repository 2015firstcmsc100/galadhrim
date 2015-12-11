// Add a Web service endpoint for deleting students from the waitlist record.
// DELETE
// /api/ocm/waitlist/:id
// Ok, 200
// Returns the deleted waitlist record
// Client Error, 4xx
// Returns the error record containing the error message

var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');


exports.deleteWaitlist = function(req, res, next) {
  db.query("DELETE FROM waitlist WHERE _id = ?", [req.params.id], function(err, rows) {
  	if (err) return next(err);
  	selectOne(req.params.id, function(updatedRow) {
    	if (!updatedRow) {
    	res.send(200, updatedRow);
    	} else {
    		  res.send(404, {message: 'Waitlist id ('+req.params.id+') was not deleted.'});
    		}
    	});
  });
}

exports.find = function(req, res, next) {
	db.query("SELECT * FROM waitlist", function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'No waitlist found.'});
		} else {
			res.send(rows);   //if 200 -- ok
		}
	});
};

exports.findOne = function(req, res, next){
	db.query("SELECT studentId FROM waitlist WHERE _id=? AND sectionId=? ",[req.params.id, req.params.id], function(err, rows){
		if (err) return next(err);
		if (rows.length === 0){
			res.send(404, {message: 'No waitlist found in this section.'});
		}
		else{
			res.send(200, rows[0]);
		}
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM waitlist WHERE _id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
  			callback(null);
		} else {
			   callback(rows[0]);
    }
  });
}
