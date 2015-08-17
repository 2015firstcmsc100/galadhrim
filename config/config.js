var path = require('path'),
	config = {
		development: {
			env: 'development',
			port: 5000,
			db: {
				host	: 'galadhrim.cl0h6qpughas.ap-southeast-1.rds.amazonaws.com',
				port	: 3306,
				name	: 'galadhrim',
				user	: 'galadhrim',
				pass	: 'lothlori3n'
			}
		},
		staging: {
			env: 'development',
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
			env: 'development',
			port: 5000,
			db: {
				host	: 'galadhrim.cl0h6qpughas.ap-southeast-1.rds.amazonaws.com',
				port	: 3306,
				name	: 'galadhrim',
				user	: 'galadhrim',
				pass	: 'lothlori3n'
			}
		}
	};


// set development as default environment
!process.env['NODE_ENV'] && (process.env['NODE_ENV'] = 'development');
config = config[process.env['NODE_ENV']];

module.exports = config;