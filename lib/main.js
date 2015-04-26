var http = require('http');
var fs = require('fs');
var url = require('url');
var index = fs.readFileSync(__dirname+'/index.html');
var gpio = require("pi-gpio");

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        var queryData = url.parse(req.url, true).query;
        var pin = queryData.pin;
	var duration = queryData.duration;
console.log("gpio=" + pin + ", duration=" + duration);
	gpio.open(pin, "output", function(err) {
		gpio.write(pin, 0, function() {
console.log("writing 0 to " + pin);
			setTimeout(function () {turnOff(pin);}, duration);
		});
	});
        res.writeHead(200);
        res.end(data);
    });
});

function turnOff(pin) {
	gpio.write(pin, 1, function() {
console.log("writing 1 to " + pin);
		gpio.close(pin);
	});
}

server.listen(8084);
