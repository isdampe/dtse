"use strict";

var request = require("request");

var syncTimers = {
	ping: null,
	pull: null,
	push: null
};

exports.init = function(dtseConfig, dtseKnownServers) {

	var sync = this;
	
	//Begin set interval timers.
	syncTimers.ping = setInterval(function(){
		sync.ping();
	}, dtseConfig.timers.ping);

	syncTimers.pull = setInterval(function(){
		sync.pull();
	}, dtseConfig.timers.pull);

	syncTimers.push = setInterval(function(){
		sync.push();
	}, dtseConfig.timers.push);

};

exports.ping = function() {
	console.log("Ping");
};

exports.pull = function() {
	console.log("Pull");
};

exports.push = function() {
	console.log("Push");
};