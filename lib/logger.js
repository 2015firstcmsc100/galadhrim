var winston = require('winston'),
	logger;

switch (process.env['NODE_ENV']) {
	case 'testing' :
		logger = new (winston.Logger)();
		break;
	case 'development' :
		logger = new (winston.Logger)({
			transports: [
				new (winston.transports.Console)({
					level : 'silly',
					colorize : true
				})
			]
		});
		break;
	case 'staging' :
		logger = new (winston.Logger)({
			transports: [
				new (winston.transports.Console)({
					level : 'warn',
					colorize : true
				})
			]
		});
		break;
	case 'production' :
		logger = new (winston.Logger)({
			transports: [
				new (winston.transports.Console)({
					level : 'error',
					colorize : true
				})
			]
		});
	default :
		logger = new (winston.Logger)({
			transports: [
				new (winston.transports.Console)({
					level : 'warn',
					colorize : true
				})
			]
		});
}

module.exports = logger;