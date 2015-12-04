var config  = require(__dirname + '/../../../../config/config'),
    util    = require(__dirname + '/../../../../lib/utils'),
    db  	= require(__dirname + '/../../../lib/mysql'),
    mailer  = require('nodemailer');


exports.reset = function(req, res, next){

    db.query("SELECT emailAddress FROM user WHERE id=?", [req.params.id], function(err, rows) {
        if (err) return next(err);
        if (rows.length === 0) {
            res.send(404, {message: 'Unable to reset password. User not found.'});
        } else {
            var data = rows[0];

            var transporter = mailer.createTransport({
                service: 'Gmail',
                auth: config.email_sender
            });

            var mail_options = {
                from: 'Galadhrim <galadhrim.app@gmail.com>',
                to: data.email,
                subject: 'Password Reset',
                html: 'Click this link to reset your password <a href="http://galadhrim.loc:8000/validate_reset_code?code=aX3tv0f">Reset Password</a>'
                //hyphotetical code
            }

            transporter.sendMail(mail_options, function(error, info){
                if(error){
                     return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

            res.send(data.email);
        }
    });
}
