var degreeProgram = require(__dirname + '/../gil-galad/controllers/degree-program');

module.exports = function(router, logger) {
	router.all('*', function (req, res, next) {
		logger.log('verbose', req.method);
		logger.log('verbose', req.params);
		logger.log('verbose', req.query);
		logger.log('verbose', req.body);
		next();
	});

	router.route('/degree-programs')
		.get(degreeProgram.find)
		.post(degreeProgram.insert);

	router.route('/degree-programs/:id')
		.get(degreeProgram.findOne)
		.put(degreeProgram.update)
		.delete(degreeProgram.remove);
	
	router.all('*', function (req, res, next) {
		res.send(404, {message : 'Nothing to do here.'});
	});

	router.use(function (err, req, res, next) {
		logger.log('error', err.message || err);
		return next(err);
	});

	return router;	
};