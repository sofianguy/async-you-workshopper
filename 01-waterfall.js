// In this problem you will need to write a program 
// that first reads the contents of a file.

// The path will be provided as the first command-line 
// argument to your program (i.e. process.argv[2]).

// The file will contain a single URL. Using http.get, 
// create a GET request to this URL and console.log 
// the response body.

var fs    = require('fs');
var http  = require('http');
var async = require('async');

async.waterfall([
  firstFunction, 
  secondFunction
], function (error, result) {
  if (error) return console.error(error);
  console.log(result);
});

function firstFunction(callback) {
  fs.readFile(process.argv[2], function (err, data) {
    if (err) throw err;
    // console.log(data);
    callback(null, data);
  });
};

// // callback1 is a callback function being defined 
// // and called inside the firstFunction definition (on line 12)
// firstFunction(function callback1 (error, data) {
//   if (error) {
//     throw error;
//   };
//   console.log(data.toString());
// });

function secondFunction(data, callback) {
  var body = '';
  http.get(data.toString(), function (response) {
    response.on('data', function(chunk) {
      body += chunk.toString();
    });
    response.on('end', function() {
      callback(null, body);
    });
  }).on('error', function (error) {
    callback(error);
    console.log(`Got error: ${error.message}`);
  });
};
