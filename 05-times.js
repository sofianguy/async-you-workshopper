// Write a program that will receive two command line 
// arguments containing the hostname and port. Using 
// http.request send a POST request to
//     url + '/users/create'
// with the body containing a JSON.stringify'ed object:
//     {"user_id": 1}

// Do this five times with each time the user_id 
// property being incremented, starting at 1.

// Once these requests are done, send a GET request to:
//     url + '/users'
// and console.log the response body for the GET request.

// ## Hints
// In this problem, you will need to co-ordinate a 
// few async operations.

// Use async.series for this and pass in an Object. 
// One of the task functions will need to use 
// async.times to send POST requests using http.request. 
// The other will then do the GET request.

var async = require('async');
var http = require('http');

function createUser (user_id, callback) {
	var options = {
		hostname: process.argv[2],
	  port: process.argv[3],
	  path: '/users/create',
	  method: 'POST'
	};

	var body = '';
	var req = http.request(options, function (response) {
		response.on('data', function (chunk) {
			body += chunk.toString();
		});
		response.on('end', function() {
			callback(null, body);
		});
	});
	var req_body = JSON.stringify({user_id: user_id});
	req.write(req_body);
	req.end();
};

async.series({
	postRequest: function (callback) {
		async.times(5, function (user_id, callback) {
			createUser(user_id+1, function (error, user) {
				callback(null, user);
			});
		},
			function (error, users) {
				if (error) throw error;
				callback(null, users);
		});
	},
	getRequest: function (callback) {
		var body = '';
		var url = 'http://' + process.argv[2] + ':' + process.argv[3] + '/users';
		http.get(url, function (response) {
			response.on('data', function (chunk) {
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
		console.log(result.getRequest);
	}
);

