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

exports.getFileExtension = function(fileName) {
	if(!fileName || !/.*\.\w+$/.test(fileName)) {
		return '';
	}

	return fileName.split('.').pop();
}
