var path = require('path'),
	config = {
		development: {
			env: 'development',
			port: 5000,
			db: {
				host	: 'localhost',
				port	: 3306,
				name	: 'galadhrim',
				user	: 'galadhrim',
				pass	: 'lothlori3n'
			}
		},
		staging: {
			env: 'staging',
			port: 5000,
			db: {
				host	: 'galadhrim.cl0h6qpughas.ap-southeast-1.rds.amazonaws.com',
				port	: 3306,
				name	: 'galadhrim',
				user	: 'galadhrim',
				pass	: 'lothlori3n'
			}
		},
		production: {
			env: 'production',
			port: 5000,
			db: {
				host	: 'galadhrim.cl0h6qpughas.ap-southeast-1.rds.amazonaws.com',
				port	: 3306,
				name	: 'galadhrim',
				user	: 'galadhrim',
				pass	: 'lothlori3n'
			}
		},

		email_sender: {
	        user: 'galadhrim.app@gmail.com',
	    	pass: 'galadhrim123'
    	}
	};


// set development as default environment
!process.env['NODE_ENV'] && (process.env['NODE_ENV'] = 'staging');
config = config[process.env['NODE_ENV']];

module.exports = config;
