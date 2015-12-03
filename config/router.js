var degreeProgram = require(__dirname + '/../gil-galad/controllers/degree-program');
var curriculum = require(__dirname + '/../gil-galad/controllers/curriculum');
var finalize = require(__dirname + '/../gil-galad/controllers/api/ocm/finalize');
var course = require(__dirname + '/../gil-galad/controllers/course');
var password = require(__dirname + '/../gil-galad/controllers/api/password/reset_password');
var planOfStudy = require(__dirname + '/../gil-galad/controllers/api/plan-of-study');
var grades = require(__dirname + '/../gil-galad/controllers/api/students');
var employees = require(__dirname + '/../gil-galad/controllers/api/employees');
var studentRecord = require(__dirname + '/../gil-galad/controllers/api/student-record');
var assignFaculty = require(__dirname + '/../gil-galad/controllers/api/ocm/assign_faculty');

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
	
	router.route('/curriculum')
		.get(curriculum.find)
		.post(curriculum.insert);

	router.route('/curriculum/:id')
		.get(curriculum.findOne)
		.put(curriculum.update)
		.delete(curriculum.remove);
	
	router.route('/sections')
		.get(section.find)
		.post(section.insert);

	router.route('/api/ocm/finalize/:id')
		.put(finalize.update);
	
	router.route('/api/password/reset/:id')
		.get(password.reset);

	router.route('/courses')
		.get(course.find);
		
	router.route('/api/plan-of-study/:id')
		.put(plan_of_study.update);

	router.route('/api/plan-of-study')
		.post(planOfStudy.insert);

	router.route('/api/students/:id/grades')
		.get(grades.findstudentGrade);

	router.route('/api/employees')
		.get(employees.findEmployees);

	router.route('/api/student-record/:id')
		.get(studentRecord.findAStudentRecord);
		
	router.route('/api/ocm/assign-faculty/:id')
		.put(assignFaculty.update);
	
	router.all('*', function (req, res, next) {
		res.send(404, {message : 'Nothing to do here.'});
	});

	router.use(function (err, req, res, next) {
		logger.log('error', err.message || err);
		return next(err);
	});

	return router;	
};
