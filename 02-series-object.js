// Write a program that will receive two URLs 
// as the first and second command-line arguments.

// Using http.get, create a GET request to these 
// URLs and pass the response body to the callback.

// Pass in an object of task functions, using the 
// property names requestOne and requestTwo, to async.series.

// console.log the results in the callback for 
// series when all the task functions have completed.

var async = require('async');
var http = require('http');

async.series({
	requestOne: function (callback) {
		var body = '';
		http.get(process.argv[2], function (response) {
			response.on('data', function(chunk) {
	      body += chunk.toString();
	    });
	    response.on('end', function() {
	      callback(null, body);
	    });
		});
	},
	requestTwo: function (callback) {
		var body = '';
		http.get(process.argv[3], function (response) {
			response.on('data', function(chunk) {
	      body += chunk.toString();
	    });
	    response.on('end', function() {
	      callback(null, body);
	    });
		});
	}
}, function (error, result) {
	if (error) {
		console.log(error);
	};
	console.log(result);
});