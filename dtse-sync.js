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
		sync.ping(dtseConfig, dtseKnownServers);
	}, dtseConfig.timers.ping);

	syncTimers.pull = setInterval(function(){
		sync.pull(dtseConfig, dtseKnownServers);
	}, dtseConfig.timers.pull);

	syncTimers.push = setInterval(function(){
		sync.push(dtseConfig, dtseKnownServers);
	}, dtseConfig.timers.push);

};

/* Attempts to ping all known servers. */
exports.ping = function(dtseConfig, dtseKnownServers) {
	
	var sync = this;
	var max = dtseKnownServers.length;

	//Loop through each server and initiate a ping request.
	for ( var i=0; i<max; i++ ) {
		sync.sendPingRequest( dtseKnownServers[i], dtseConfig );
	}

};

exports.pull = function(dtseConfig, dtseKnownServers) {
	console.log("Pull");
};

exports.push = function(dtseConfig, dtseKnownServers) {
	console.log("Push");
};

exports.sendPingRequest = function(server, dtseConfig) {

	var pingCode = Math.floor(Math.random() * (1000000 - 1000) + 1000);
	var requestUri = server.uri + ":" + server.port + "/ping";
	var requestData = JSON.stringify({
		ping: pingCode,
		uri: dtseConfig.serverUri
	});

	console.log("Ping " + pingCode + " to " + requestUri);

	request.post(requestUri, form{ {json:requestData} }, function(err, httpResponse, body) {
  	if (err) {
  		console.log("Ping error on " + requestUri + ": " + err);
  		return;
  	} else {
  		//Success, check the ping code reply...
  		console.log("Packet sent.");
  	}
	});

};