// Create a program that will receive two URLs 
// as the first and second command-line arguments.

// Then using http.get, create two GET requests 
// to these URLs and console.log any errors.

var async = require('async');
var http = require('http');

async.each([process.argv[2], process.argv[3]], 
	function(item, callback) {
		http.get(item, function (response) {
			response.on('end', function() {
				callback();
			});
		}).on('error', function (error) {
			callback(error);
		});
	},
	function (error) {
		if (error) console.log(error);
	}
);
