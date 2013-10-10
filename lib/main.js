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
        var status = queryData.status;

	if (status == 1) {
		gpio.open(22, "output", function(err) {
			gpio.write(22, 1, function() {
				setTimeout(function () {turnOff();}, 1000);
			});
		});
	}

        res.writeHead(200);
        res.end(data);
    });
});

function turnOff() {
	gpio.write(22, 0, function() {
		gpio.close(22);
	});
}

server.listen(8084);