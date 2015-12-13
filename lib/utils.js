exports.getRandomString = function(length) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var stringLength = length ? length : 4;
	var randomString = '';
	for (var i=0; i<stringLength; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomString += chars.substring(rnum,rnum+1);
	}
	return randomString;
}

exports.computeGWA = function(data){ //computes GWA of all active students
	var gwalist = []; //array
	var studItem = { 
		'studId' : 'n/a',
		'gwa' : '0'
	}; //student-gwa object
	var grades = 0; //grade of each of a student's courses
	var units = 0; //number of units of a student's course
	for(var i =1;i<=data.length;i++){
		if(data[i-1].student_id == data[i].student_id){
			grades = grades + (data[i-1].grade * data[i-1].units); //summation of (grade * unit)
			units = units + data[i-1].units; //summation of units
		}else{
			// assign the respective values when reaches to another student
			studItem.studId = data[i-1].student_id;
			studItem.gwa = (grades/units);
			
			//reset values for the next student
			grades = 0;
			units = 0;
			
			gwalist.push(studItem);
		}
	}
	return gwalist;
}
