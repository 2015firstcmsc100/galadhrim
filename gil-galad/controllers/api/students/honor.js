var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql'),
    utils = require(__dirname + '/../../../../lib/utils');
    
    exports.getStudents = function(req,res,next){
    	db.query("SELECT student._id,grade,units FROM student,grade,course,section where student._id = grade.studentId and section._Id = grade.sectionId and section.courseId = course._id grade._recStatus = 'ACTIVE' order by student._id" , function(err, rows){		
		if(err) return next(err);		
		if(rows.length===0){
			res.status(404).send('No Students Found!');
		}else{
			var gwalist = utils.computeGWA(rows); //get list of students with their respective gwas
			var honorlist = []; //array for honor students
			for(var i = 0;i<gwalist.length;i++){
				if(gwalist[i].gwa >= 2.00){
					honorlist.push(gwalist[i]); // add to the list if one's computed GWA is 2.00 and above
				}
			}
			res.send(200, honorlist);		
		}
	});
    };
