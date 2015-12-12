var assert = require('assert'),
	testing = require(__dirname + '/testing');

describe('add(num1, num2)', function() {
	var tests = [
		{args: [0, 0], 		expected: 0},
		{args: [5, 0], 		expected: 5},
		{args: [0, 7], 		expected: 7},
		{args: [5, 7], 		expected: 12},
		{args: [-19, 0], 	expected: -19},
		{args: [0, -11], 	expected: -11},
		{args: [-19, -11], 	expected: -30},
		{args: [5, -11], 	expected: -6},
		{args: [-19, 7], 	expected: -12},
	];

	tests.forEach(function(test) {
		assert.equal(testing.add(test.args[0], test.args[1]), test.expected);
	});
});