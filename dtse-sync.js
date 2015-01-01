"use strict";

var request = require("request");
var log = require("./log.js");

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
	log.print("Pull");
};

exports.push = function(dtseConfig, dtseKnownServers) {
	log.print("Push");
};

exports.sendPingRequest = function(server, dtseConfig) {

	var pingCode = Math.floor(Math.random() * (1000000 - 1000) + 1000);
	var requestUri = server.uri + ":" + server.port + "/ping";
	var requestData = JSON.stringify({
		p: pingCode,
		u: dtseConfig.serverUri
	});

	log.print("Ping " + pingCode + " to " + requestUri);

	request.post(requestUri, { form: { j: requestData } }, function(err, httpResponse, body) {
  	if (err) {
  		log.print("Ping error on " + requestUri + ": " + err);
  		return;
  	} else {

  		//Check if request made it.
  		log.print("STAT " + httpResponse.statusCode);

  		//Success, check the ping code reply...
  		var data = JSON.parse(body);
  		
  		if ( typeof data.p === "undefined" || typeof data.u === "undefined" ) {
  			log.print("Invalid pong packet, corrupt data?");
  			return;
  		}

  		if ( pingCode === data.p && dtseConfig.serverUri === data.u ) {
  			log.print("Pong " + data.p + " from " + requestUri);
  			return;
  		} else {
  			log.print("WARN: Invalid pong packet, mismatches. Possible MITM attack?");
  		}

  	}
	});

};