//Add a Web service endpoint for canceling a slot of an existing student.

/*UPDATE
/api/ocm/cancel/:id/
id - student number of student

@params sectionId - section id of the section

Update status of the specific slot from 'ENLISTED' to 'FREE'
*/
var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');
    
exports.update = function(req, res, next) {
	db.query("UPDATE slot SET status = 'FREE', _updated = now() WHERE studentId = ? AND sectionId = ?", [req.params.id, req.params.sectionId], function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};
