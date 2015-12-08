var	logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

 exports.findCourses = function(req, res, next){
 	db.query("SELECT * FROM curriculum_course JOIN course ON curriculum_course.courseId = course._id WHERE curriculumId=?", [req.params.id], function(err, rows) {
 		if (err) res.send(404, {message: 'Not Found'});
 		else{
 			res.send(200, rows);
 		}
 	});	
 };
 
 exports.remove = function(req, res, next) {
  db.query("UPDATE curriculum_course SET _recStatus ='Deleted' WHERE _id=?", [req.params.id], function(err, row) {
    if (err) return next(err);
    if (row.length === 0) {
      res.send(404, {message: 'Course in curriculum ('+req.params.id+') was not removed.'})
    }
    else {
      res.send(200, row[0]);
	}
  });
};
