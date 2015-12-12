var	logger = require(__dirname + '/../../../lib/logger'),
	db = require(__dirname + '/../../lib/mysql');

exports.generateSlots = function(req,res,next){
		if(req.body.sectionId == undefined || req.body.numberOfSlots == undefined)
			return res.send(451, {'error': true, 'message': 'Missing parameter'});

		for(var i = req.body.numberOfSlots; i > 0; i--){
				db.query("INSERT INTO slot(sectionId) values(?)",[req.body.sectionId], function(err,next){
					if (err) return next(err);
					return res.send(201, {'success':true, 'message': 'Succesful slot generation'});
				});
		}
}
