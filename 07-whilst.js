// Write a program that will receive a single 
// command line argument to a URL.

// Using async.whilst and http.get, send GET 
// requests to this URL until the response body 
// contains the string "meerkat".

// console.log the amount of GET requests needed 
// to retrieve the "meerkat" string.

// ## Hints
// String.prototype.trim() is your friend.
// You can get documentation on async.whilst() here:
//   [https://github.com/caolan/async#whilst](https://github.com/caolan/async#whilst)

var async = require('async');
var http = require('http');

var count = 0;
var retrieveString = '';
async.whilst(
	function() {
		return retrieveString != 'meerkat'
	},
	function(callback) {
		var body = '';
		http.get(process.argv[2], function(response) {
			response.on('data', function(chunk) {
				body += chunk.toString();
			});
			response.on('end', function() {
				count++;
				retrieveString = body;
				callback(null, count);
			});
		}).on('error', function(error) {
			callback(error);
		});
	}, 
	function(error, number) {
		console.log(number);
	}
);
