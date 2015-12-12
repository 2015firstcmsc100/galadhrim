/*
	Add a Web service endpoint for adding a new TCG request record

	POST
	/api/tcg

	OK, 200
	Returns the newly created TCG request record

	Client error, 4xx
	Returns an error record containing the error message
	
*/

var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');
    
exports.request = function(req, res, next) {
	if (!req.body.studentId) {
		return res.status(400).send({'error': true, 'message': 'Missing parameter: studentId'});
	}
	
	if (!req.body.startYear) {
		return res.status(400).send({'error': true, 'message': 'Missing parameter: startYear'});
	}
	
	if (!req.body.startSemester) {
		return res.status(400).send({'error': true, 'message': 'Missing parameter: startSemester'});
	}
	
	if (!req.body.endYear) {
		return res.status(400).send({'error': true, 'message': 'Missing parameter: endYear'});
	}
	
	if (!req.body.endSemester) {
		return res.status(400).send({'error': true, 'message': 'Missing parameter: endSemester'});
	}

	db.query("INSERT INTO tcg(studentId, startYear, startSemester, endYear, endSemester) VALUES(?, ?, ?, ?, ?)", 
		[
			req.body.studentId, 
			req.body.startYear, 
			req.body.startSemester, 
			req.body.endYear, 
			req.body.endSemester
		], function(err, row) {
				if (err) return next(err);
		
			returnThis(row.insertId, function(newRow) {
				if (null) res.send(400, {'error': true, 'message': 'Request TCG ('+row.insertId+') was not created.'});
				else res.status(200).send(newRow);
			});
		
	});
	
};

var returnThis = function(id, callback) {
	db.query("SELECT * FROM tcg WHERE _id=?", [id], function(err, rows) {
		if (err) return next(err);
		
		if(rows.length === 0) callback(null);
		
		else callback(rows[0]);
	});
}
