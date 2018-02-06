/*
HW2
Connected Devices Spring 2018
by RSofiaC

using example code from https://github.com/peter-murray/node-hue-api
*/


var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = "192.168.2.129",
    username = "08a902b95915cdd9b75547cb50892dc4",
    api = new HueApi(host, username),
    state;

// Set light state to 'on' with warm white value of 500 and brightness set to 100%
state = lightState.create().on().white(500, 100);

// --------------------------
// Using a callback
api.setLightState(5, state, function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});
