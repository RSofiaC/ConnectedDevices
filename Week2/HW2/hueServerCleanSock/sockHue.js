/*
HW2
Connected Devices Spring 2018
by RSofiaC and Grau Puche

using example code from https://github.com/peter-murray/node-hue-api
*/

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 7002;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = "172.22.151.148",
    username = "VVGWvv7Ny8pB4m3Q20yHbOXtkqOXRkfZQgfoPygS",
    api = new HueApi(host, username),
    state;
    state1 = lightState.create().on().white(200, 100);
    state2 = lightState.create().on().white(500, 100);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	socket.on('1', function (uno) {
		console.log('numero uno');

    api.setLightState(30, state1, function(err, lights) {
        if (err) throw err;
        displayResult(lights);
        console.log('light uno');
    });
	});
  socket.on('2', function (dos) {
		console.log('numero dos');
    api.setLightState(30, state2, function(err, lights) {
        if (err) throw err;
        displayResult(lights);
        console.log('light dos')
    });
	});
});
//
// // Set light state to 'on' with warm white value of 500 and brightness set to 100%
//
//
// // --------------------------
// // Using a callback
//
//
// api.setLightState(30, state2, function(err, lights) {
//     if (err) throw err;
//     displayResult(lights);
// });
