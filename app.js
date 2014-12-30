"use strict";

/* Our config and declarations. */
var dtseConfig = {
	serverIp: "127.0.0.1",
	serverPort: 3000,
	serverIpSSL: "127.0.0.1",
	serverPortSSL: 443,
	serverUri: "localhost",
	serverEmail: "isdampe[at]gmail",
	timers: {
		ping: 10000,
		pull: 30000,
		push: 30000
	}
};

var dtseKnownServers = [
	{
		uri: "http://remotehost",
		port: 3000
	}
];

/* Node-requirements. */
var dtse = require("./dtse.js");
var sync = require("./dtse-sync.js");
var express = require("express");
var https = require("https");
var http = require("http");
var app = express();

//Allow dtse middleware for answering requests.
app.use( dtse(dtseConfig) );

//Set up the servers.
http.createServer(app).listen(dtseConfig.serverPort);
//https.createServer(options, app).listen(dtseConfig.serverPortSSL);

//Start the requests process.
sync.init(dtseConfig, dtseKnownServers);