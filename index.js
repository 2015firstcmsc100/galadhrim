var express = require('express'),
	config = require(__dirname + '/config/config'),
	logger = require(__dirname + '/lib/logger'),
	app = express();

app.set('port', (process.env.PORT || config.port));

app.use(require(__dirname + '/lib/cors')('*'));
app.use(require('body-parser')());
app.use(require('morgan')('dev', {immediate : true}));
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(require(__dirname + '/config/router')(express.Router(), logger));

logger.log('info', 'Server listening on port : ', config.port);

app.listen(app.get('port'), function() {
	logger.log('info', 'Initializing Galadhrim REST API. ENV = ', process.env['NODE_ENV']);
});
