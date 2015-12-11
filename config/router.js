var degreeProgram = require(__dirname + '/../gil-galad/controllers/degree-program');
var curriculum = require(__dirname + '/../gil-galad/controllers/curriculum');
var curriculum_course = require(__dirname + '/../gil-galad/controllers/api/curriculum_course');
var curricula = require(__dirname + '/../gil-galad/controllers/api/curricula');
var finalize = require(__dirname + '/../gil-galad/controllers/api/ocm/finalize');
var course = require(__dirname + '/../gil-galad/controllers/api/courses');
var login = require(__dirname + '/../gil-galad/controllers/api/login/login');
var password = require(__dirname + '/../gil-galad/controllers/api/password/reset_password');
var planOfStudy = require(__dirname + '/../gil-galad/controllers/api/plan_of_study');
var grades = require(__dirname + '/../gil-galad/controllers/grades');
var employees = require(__dirname + '/../gil-galad/controllers/api/employees');
var studentRecord = require(__dirname + '/../gil-galad/controllers/api/student-record');
var assignFaculty = require(__dirname + '/../gil-galad/controllers/api/ocm/assign_faculty');
var waitlist = require(__dirname + '/../gil-galad/controllers/api/ocm/waitlist');
var section = require(__dirname + '/../gil-galad/controllers/api/section');
var announcement = require(__dirname + '/../gil-galad/controllers/api/announcement');
var courseOfferings = require(__dirname + '/../gil-galad/controllers/api/course-offerings');
var unit = require(__dirname + '/../gil-galad/controllers/api/unit');
var profilePicture = require(__dirname + '/../gil-galad/controllers/api/user/profile-picture');
var section_grades = require(__dirname + '/../gil-galad/controllers/api/section_grade');
var monitoring = require(__dirname + '/../gil-galad/controllers/api/monitoring/log');
//var recommended_courses =  require(__dirname + '/../gil-galad/controllers/api/recommended-courses');
var student_grades = require(__dirname + '/../gil-galad/controllers/api/grade');
var department = require(__dirname + '/../gil-galad/controllers/api/departments');
var room = require(__dirname + '/../gil-galad/controllers/api/room');
var change_password = require(__dirname + '/../gil-galad/controllers/api/password/change_password');
var tcg = require(__dirname + '/../gil-galad/controllers/api/tcg');
var cancel = require(__dirname + '/../gil-galad/controllers/api/ocm/cancel');
var role = require(__dirname + '/../gil-galad/controllers/api/role');
var classlist = require(__dirname + '/../gil-galad/controllers/api/ocm/classlist');

module.exports = function(router, logger) {
 	router.all('*', function (req, res, next) {
 		logger.log('verbose', req.method);
 		logger.log('verbose', req.params);
 		logger.log('verbose', req.query);
 		logger.log('verbose', req.body);
 		next();
 	});

	router.route('/api/grades/:id')
 		.delete(student_grades.remove);

	router.route('/api/sections/:id/grades')
 		.get(section_grades.find);

	router.route('/api/ocm/classlist/:id')
		.get(classlist.find);

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

 	router.route('/api/curriculum-course/:id')
 		.get(curriculum_course.findCourses)
 		.delete(curriculum_course.remove);

 	router.route('/api/curriculum_course')
 	   .post(curriculum_course.insert);

 	router.route('/api/curricula')
 		.get(curricula.find);

	router.route('/api/units/:id')
		.get(unit.findOne)
        .delete(unit.remove)
        .put(unit.update);

    router.route('/api/department')
       	.get(department.find)

	router.route('/api/sections')
 		.get(section.findSections)
 		.post(section.insert);

 	router.route('/api/sections/:id')
 		.put(section.update);

	router.route('/api/ocm/finalize/:id')
		.put(finalize.update);

	router.route('/api/ocm/cancel/:id')
		.put(cancel.update);

 	router.route('/api/login')
    		.post(login.login);

    	// router.route('/api/logout/:id')
    	// 	.put(logout.logout);

	router.route('/api/user/profile-picture/:id')
		.put(profilePicture.update);

	router.route('/api/password/reset/:id')
		.get(password.reset);
	router.route('/api/password/change/:id')
		.get(change_password.change);

	router.route('/api/courses')
		.get(course.find)
		.post(course.insert);

	router.route('/api/courses/:id')
  		.delete(course.remove)
  		.put(course.update);

	router.route('/api/plan-of-study/:id')
		.get(planOfStudy.findOne)
		.put(planOfStudy.update);

	router.route('/api/course-offerings')
		.get(courseOfferings.find);

	router.route('/api/course-offerings/:year/:sem')
		.delete(courseOfferings.removeSections);

	router.route('/api/plan-of-study')
		.post(planOfStudy.insert);

	router.route('/api/students/:id/grades')
		.get(grades.findstudentGrade);

	router.route('/api/students/:id')
		.put(studentRecord.update_isDeletedRecord);

	router.route('/api/employees')
		.get(employees.findEmployees)
		.post(employees.insert);

	router.route('/api/employees/:id')
		.get(employees.findOne)
		.delete(employees.remove);

	router.route('/api/student-record/:id')
		.get(studentRecord.findAStudentRecord);
		
	router.route('/api/student-record/')
		.get(studentRecord.showAllStudentRecords);

	router.route('/api/student')
		.post(studentRecord.createStudentRecord);

	router.route('/api/student-record/:id/adviser')
		.put(studentRecord.update_RegAdviser);

	router.route('/api/ocm/assign-faculty/:id')
		.put(assignFaculty.update);

	router.route('/api/ocm/waitlist/:id')
		.delete(waitlist.deleteWaitlist);

	router.route('/api/ocm/waitlist')
		.get(waitlist.find);

	router.route('/api/ocm/wailist/:id')
		.get(waitlist.findOne);

  	router.route('/api/announcements')
  		.get(announcement.find)
		.post(announcement.insert);

	router.route('/api/announcements/:id')
		.get(announcement.findOne)
		.delete(announcement.remove);

	router.route('/api/monitoring/logs/:id')
		.get(monitoring.findOne);

	router.route('/api/departments')
		.get(department.find);

	router.route('/api/rooms/')
		.get(room.find);

	router.route('/api/rooms/:id')
		.get(room.findOne);

	router.route('/api/tcg')
		.post(tcg.request);

	// router.route('/api/:userId/roles/:id')
	// 	.put(role.userId, role.id);

	router.all('*', function (req, res, next) {
		res.send(404, {message : 'Nothing to do here.'});
	});

	router.use(function (err, req, res, next) {
		logger.log('error', err.message || err);
		return next(err);
	});

	return router;
};
