// Write a program that will receive an URL 
// as the first command line argument.

// To this URL, for each of the values in the 
// following array, send a GET request using 
// http.get with a query parameter named number 
// set at the proper value:
//     ['one', 'two', 'three']

// Each time, convert the response body to Number 
// and add it to the previous value. console.log the 
// final reduced value.

// ## Hints
// Use async.reduce:
//   [https://github.com/caolan/async#reduce](https://github.com/caolan/async#reduce)

var async = require('async');
var http = require('http');

async.reduce(['one', 'two', 'three'], 0, 
	function(memo, item, callback) {
		var body = '';
		http.get(process.argv[2] + '?number=' + item, function(response) {
			response.on('data', function(chunk) {
				body += chunk.toString();
			});
			response.on('end', function() {
				callback(null, memo + Number(body));
			});
		}).on('error', function (error) {
			callback(error);
		});
	},
	function(error, result) {
		if (error) {
			console.log(error);
		};
		console.log(result);
	}
);
