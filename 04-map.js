// Write a program that will receive two 
// command-line arguments to two URLs.

// Using http.get create two GET requests to these URLs.

// You will need to use async.map, 
// then console.log the results array.

var async = require('async');
var http = require('http');

async.map([process.argv[2], process.argv[3]],
	function iteratorFunction (item, callback) {
		var body = '';
		http.get(item, function (response) {
			response.on('data', function (chunk) {
				body += chunk.toString();
			});
			response.on('end', function () {
				callback(null, body);
			});
		}).on('error', function (error) {
			callback(error);
		});
	},
	function (error, results) {
		if (error) return console.log(error);
		console.log(results);
	}
);
