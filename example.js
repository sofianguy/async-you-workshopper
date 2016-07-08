var async = require('async');

var count = 0;
async.whilst(
    function() { return count < 5; },
    function(callback) {
        count++;
        setTimeout(function() {
            console.log(count)
            callback(null, count);
        }, 1000);
    },
    function (err, n) {
      console.log(n)
        // 5 seconds have passed, n = 5
    }
);